import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Injector,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TodayMeteo } from '../today-meteo/today-meteo';
import { CommonModule } from '@angular/common';
import { KENDO_GRIDLAYOUT, KENDO_LAYOUT } from '@progress/kendo-angular-layout';
import { KENDO_BUTTONS } from '@progress/kendo-angular-buttons';
import { KENDO_DRAGANDDROP, KENDO_UTILS } from '@progress/kendo-angular-utils';
import { Coordinate } from '../../Services/cartellaFinta/coordinate';
import {
  CdkDrag,
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { KENDO_SORTABLE } from '@progress/kendo-angular-sortable';
import { KENDO_GRID } from '@progress/kendo-angular-grid';
import { KENDO_INDICATORS } from '@progress/kendo-angular-indicators';
import { FormsModule } from '@angular/forms';
import { WeatherApiService } from '../../Services/weather-api/weather-api';
import { debounceTime, lastValueFrom, Subject, Subscription } from 'rxjs';
import {
  createGlobalPositionStrategy,
  createOverlayRef,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { KENDO_DROPDOWNS } from '@progress/kendo-angular-dropdowns';
import { KENDO_LABEL } from '@progress/kendo-angular-label';
import {
  KENDO_DIALOGS,
  DialogAnimation,
  DialogAnimationType,
  AnimationDirection,
  WindowState,
} from '@progress/kendo-angular-dialog';
import { trigger, transition, style, animate } from '@angular/animations';
import { slideDownSearch } from '../../Services/cartellaFinta/animation';

@Component({
  selector: 'app-home',
  imports: [
    TodayMeteo,
    CommonModule,
    KENDO_BUTTONS,
    KENDO_UTILS,
    KENDO_LAYOUT,
    KENDO_DRAGANDDROP,
    KENDO_SORTABLE,
    KENDO_GRID,
    CdkDrag,
    FormsModule,
    DragDropModule,
    KENDO_INDICATORS,
    KENDO_DROPDOWNS,
    KENDO_LABEL,
    KENDO_DIALOGS,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [slideDownSearch],
})
export class HomeComponent implements OnInit {
  public coordinate: Coordinate[] = [
    { id: 1, location: 'Nubys', citta: 'Milano', lat: 45.4637, lon: 9.1881 },
    { id: 2, location: 'Nadir', citta: 'Milano', lat: 45.452, lon: 9.2224 },
    { id: 3, location: 'Jasson', citta: 'Bollate', lat: 45.5465, lon: 9.1205 },
    {
      id: 4,
      location: 'Francesca',
      citta: 'Giussago',
      lat: 45.28417,
      lon: 9.13996,
    },
    {
      id: 5,
      location: 'Mikhael',
      citta: 'Robecchetto con Induno',
      lat: 45.5285,
      lon: 8.7707,
    },
    { id: 6, location: 'Adele', citta: 'Roma', lat: 41.8803, lon: 12.566 },
  ];

  public loading = true;

  public thumbnailUrl = 'assets/indicators/skeleton/card-thumbnail.jpg';
  public avatarUrl = 'assets/indicators/skeleton/user-avatar.jpg';
  public description = 'Having so much fun in Prague! #NaZdravi';

  public showSearch = false;
  public searchCity = '';

  public leftContainer: Coordinate[] = []; // solo uno
  public rightContainer: Coordinate[] = []; // tutti gli altri

  public isSwapping = false;

  public citta: any[] = [];

  public under6Element: boolean = true;

  private searchInput$ = new Subject<string>();
  public opened = false;
  public isDraggable = true;
  public windowState: WindowState = 'default';

  private searchInputSubscription?: Subscription;

  /* responsivness */
  public isVerticalLayout = false;
  public isSmallGrid = false;

  constructor(private weatherService: WeatherApiService) {}

  //#region Responsivness

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent): void {
    const width = (event.target as Window).innerWidth;

    this.isVerticalLayout = width < 1200;
    this.isSmallGrid = width < 709;
  }

  //#region onInit

  ngOnInit(): void {
    // Nubys a sinistra, gli altri a destra
    const [nubys, ...others] = this.coordinate;
    this.leftContainer = [nubys];
    this.rightContainer = others;
    this.getLocalStorage();

    this.searchInputSubscription = this.searchInput$
      .pipe(debounceTime(500))
      .subscribe((value) => this.searchCityName(value));

    const width = window.innerWidth;
    this.isVerticalLayout = width < 1200;
    this.isSmallGrid = width < 709;
  }

  //#region LocalStorage

  public saveStateToLocalStorage() {
    const state = {
      lefty: this.leftContainer.map((c) => c.id),
      righty: this.rightContainer.map((c) => c.id),
      items: this.coordinate,
    };
    localStorage.setItem('Ordine_Array', JSON.stringify(state));
  }

  public getLocalStorage() {
    const saved = localStorage.getItem('Ordine_Array');
    if (saved) {
      const state = JSON.parse(saved);

      this.coordinate = state.items;

      const copiaCoordinate = [...this.coordinate];

      this.leftContainer = state.lefty
        .map((id: number) => copiaCoordinate.find((c) => c.id === id))
        .filter((c: Coordinate | undefined): c is Coordinate => !!c); //type guard approfondire meglio

      this.rightContainer = state.righty
        .map((id: number) => copiaCoordinate.find((c) => c.id === id))
        .filter((c: Coordinate | undefined): c is Coordinate => !!c); //type guard

      this.under6Element = this.rightContainer.length < 6;
    } else {
      // init di default
      const [nubys, ...others] = this.coordinate;
      this.leftContainer = [nubys];
      this.rightContainer = others;
      this.saveStateToLocalStorage();
    }
  }

  //delete
  public deleteFromLocalStorage(id: number) {
    const indexInLeft = this.leftContainer.findIndex((c) => c.id === id);
    const indexInRight = this.rightContainer.findIndex((c) => c.id === id);

    // Se è nel contenitore di destra
    if (indexInRight > -1) {
      this.rightContainer.splice(indexInRight, 1);
    }

    // Se è nel contenitore di sinistra
    if (indexInLeft > -1) {
      this.leftContainer.splice(indexInLeft, 1);

      // Reinserisci un nuovo elemento da destra a sinistra (se disponibile)
      if (this.rightContainer.length > 0) {
        const replacement = this.rightContainer.shift(); // rimuove il primo da destra e restituisce quindi lo uso anche
        // sul left container.
        if (replacement) {
          this.leftContainer.push(replacement);
        }
      }
    }

    this.under6Element = this.rightContainer.length < 6;
    this.saveStateToLocalStorage();
  }

  //#region SearchBar

  async searchCityName(value: string) {
    if (!this.searchCity || this.searchCity.trim() === '') {
      return;
    }
    try {
      const result = await lastValueFrom(
        this.weatherService.getByCity(this.searchCity)
      );
      this.citta = result;
      console.log('RISULTATO:', result);
    } catch (err) {
      console.error('Errore durante la ricerca:', err);
      this.citta = [];
    }
  }

  selectCity(city: any) {
    const nuovaCitta: Coordinate = {
      id: this.coordinate.length + 1,
      location: city.name,
      citta: city.name,
      lat: city.lat,
      lon: city.lon,
    };

    this.coordinate.push(nuovaCitta);
    this.rightContainer.push(nuovaCitta);
    this.searchCity = '';
    this.citta = []; // Nasconde la lista
    /*     this._overlayRef?.detach(); // Chiude il dialog */
    this.saveStateToLocalStorage();
    this.openClose(false);

    if (this.rightContainer.length >= 6) {
      this.under6Element = false;
    }
  }

  onSearchChange(value: string) {
    this.searchInput$.next(value);
    /*
     Perché usiamo Subject nella search bar?
     - Emettere eventi manualmente ogni volta che l’utente digita (.next(val))
     - Sottoscrivere questi eventi con un debounceTime() e fare la chiamata API
     In pratica:
     - Ogni ngModelChange → searchInput$.next(val)
     - Il Subject li riceve e "trasmette" agli operatori RxJS
     - Dopo 500ms di silenzio → esegue la chiamata
     */
  }

  @ViewChild('searchBox') searchBoxRef!: ElementRef;
  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent): void {
    if (!this.opened || !this.searchBoxRef) return;

    if (!this.searchBoxRef.nativeElement.contains(event.target)) {
      this.openClose(false);
    }
  }

  public openClose(isOpened: boolean): void {
    this.opened = isOpened;
    if (!isOpened) {
      this.showSearch = false;
      this.searchCity = '';
      this.citta = [];
    }
  }

  //#region onDrop

  onDrop(event: CdkDragDrop<Coordinate[]>) {
    if (event.previousContainer === event.container) {
      return; // drag interno non gestito qui
    }

    // Se stai trascinando da destra a sinistra
    if (event.container.id === 'left') {
      const incoming = event.previousContainer.data[event.previousIndex];
      const outgoing = this.leftContainer[0];

      this.isSwapping = true; // attiva animazione

      // 1. Dopo X ms fai il vero scambio dei dati
      setTimeout(() => {
        // 1. Rimuovi l'elemento da destra
        event.previousContainer.data.splice(event.previousIndex, 1);

        // 2. Inserisci l'attuale a destra nello stesso punto (swap)
        this.rightContainer.splice(event.previousIndex, 0, outgoing);

        // 3. Metti il nuovo elemento a sinistra
        this.leftContainer[0] = incoming;
        this.isSwapping = false;
      }, 300); // stesso tempo della transizione CSS
    }
    this.saveStateToLocalStorage();
  }

  //#region OnDestroy

  ngOnDestroy() {
    this.searchInputSubscription?.unsubscribe();
    /*    this._overlayRef?.dispose(); */
  }
}
