import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HomeComponent } from './Components/home/home.component';
import { NavBar } from './nav-bar/nav-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, NavBar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'NubysMeteo';
  @Input() shrink = false; // viene settato da HomeComponent
}
