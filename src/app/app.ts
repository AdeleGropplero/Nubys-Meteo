import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './Components/nav-bar/nav-bar';

import { HomeComponent } from './Components/home/home.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, HomeComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'NubysMeteo';
}
