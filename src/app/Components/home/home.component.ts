import { Component, OnInit } from '@angular/core';
import { TodayMeteo } from '../today-meteo/today-meteo';

@Component({
  selector: 'app-home',
  imports: [TodayMeteo],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
