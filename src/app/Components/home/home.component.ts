import { Component, OnInit } from '@angular/core';
import { TodayMeteo } from '../today-meteo/today-meteo';
import { CommonModule } from '@angular/common';
import { KENDO_LAYOUT } from '@progress/kendo-angular-layout';
import { KENDO_BUTTONS } from '@progress/kendo-angular-buttons';
import { KENDO_DRAGANDDROP, KENDO_UTILS } from '@progress/kendo-angular-utils';
import { Coordinate } from '../../Services/cartellaFinta/coordinate';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  imports: [
    TodayMeteo,
    CommonModule,
    KENDO_BUTTONS,
    KENDO_UTILS,
    KENDO_LAYOUT,
    KENDO_DRAGANDDROP,
    DragDropModule,
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

  public draggedLocation: string | null = null;
  public enteredBox: string | null = null;
  ngOnInit(): void {}

  public drop(event: CdkDragDrop<Coordinate[]>) {
    moveItemInArray(this.coordinate, event.previousIndex, event.currentIndex);
  }
}

/*  ngOnInit(): void {
    this.sortCoordinateById(); // Ordina inizialmente per ID
  }

  // Trascinamento: inizio
  public handleDragStart(location: string): void {
    this.draggedLocation = location;
  }

  // Trascinamento: entra in altro box
  public handleDragEnter(location: string): void {
    this.enteredBox = location;
  }

  // Trascinamento: lascia il box
  public handleDragLeave(): void {
    this.enteredBox = '';
  }

  // Rilascio: swap
  public handleDrop(targetLocation: string): void {
    if (!this.draggedLocation || this.draggedLocation === targetLocation)
      return;

    const fromIndex = this.coordinate.findIndex(
      (c) => c.location === this.draggedLocation
    );
    const toIndex = this.coordinate.findIndex(
      (c) => c.location === targetLocation
    );

    if (fromIndex !== -1 && toIndex !== -1) {
      const temp = this.coordinate[fromIndex];
      this.coordinate[fromIndex] = this.coordinate[toIndex];
      this.coordinate[toIndex] = temp;
    }

    this.draggedLocation = null;
    this.enteredBox = '';
  }

  private sortCoordinateById(): void {
    this.coordinate.sort((a, b) => a.id - b.id);
  } */
