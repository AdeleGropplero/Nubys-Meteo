import { Component, OnInit } from '@angular/core';
import { TodayMeteo } from '../today-meteo/today-meteo';
import { CommonModule } from '@angular/common';
import { KENDO_GRIDLAYOUT, KENDO_LAYOUT } from '@progress/kendo-angular-layout';
import { KENDO_BUTTONS } from '@progress/kendo-angular-buttons';
import { KENDO_DRAGANDDROP, KENDO_UTILS } from '@progress/kendo-angular-utils';
import { Coordinate } from '../../Services/cartellaFinta/coordinate';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { KENDO_SORTABLE } from '@progress/kendo-angular-sortable';
import { KENDO_GRID } from '@progress/kendo-angular-grid';
import { KENDO_INDICATORS } from '@progress/kendo-angular-indicators';

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
    DragDropModule,
    KENDO_INDICATORS,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
  /* 
  public draggedLocation: string | null = null;
  public enteredBox: string | null = null; */

  /* ------------------------------------------------------------------ */

  public leftContainer: Coordinate[] = []; // solo uno
  public rightContainer: Coordinate[] = []; // tutti gli altri

  public isSwapping = false;

  ngOnInit(): void {
    // Nubys a sinistra, gli altri a destra
    const [nubys, ...others] = this.coordinate;
    this.leftContainer = [nubys];
    this.rightContainer = others;
  }

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
  }
}

// Se stai trascinando da sinistra a destra ---> non possibile sempre un elemento a sinistra!
/*     else if (event.container.id === 'right') {
      const outgoing = event.previousContainer.data[0];
      this.leftContainer = [];

      // Aggiungi a destra in posizione corretta
      this.rightContainer.splice(event.currentIndex, 0, outgoing);
    }
 */
/*     transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    ); */

/* ------------------------------------------------------------------ */

/*   public drop(event: CdkDragDrop<Coordinate[]>) {
    moveItemInArray(this.coordinate, event.previousIndex, event.currentIndex);
    console.log(event.previousIndex, event.currentIndex);
  }

  public onClick(event: MouseEvent) {
    console.log('Hai cliccato su:', event.target);
  } */
/* -------------------------------------------------------------------------------------------- */

/*   public currentBox = this.coordinate[0].location;
  public enteredBox2 = this.coordinate[0].location;

  public handleDragEnter(id: string): void {
    this.enteredBox = id;
  }

  public handleDragLeave(): void {
    this.enteredBox = '';
  }

  public handleDrop(id: string): void {
    this.currentBox = id;
  }*/
