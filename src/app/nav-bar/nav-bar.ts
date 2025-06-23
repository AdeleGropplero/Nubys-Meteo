import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  public oggi: string = '';
  public giornoSettimana: string = '';
  public oraAttuale: string = '';
  private oraInterval: any;

  ngOnInit(): void {
    const now = new Date();
    this.oggi = now.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    this.giornoSettimana = this.capitalizeFirstLetter(
      now.toLocaleDateString('it-IT', { weekday: 'long' })
    );

    this.aggiornaOra(); // inizializzazione immediata
    // aggiorna ogni 60 secondi (60000 ms)
    this.oraInterval = setInterval(() => {
      this.aggiornaOra();
    }, 1000);
  }
  capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  private aggiornaOra() {
    const now = new Date();
    this.oraAttuale = now.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
  ngOnDestroy() {
    clearInterval(this.oraInterval);
  }
}
