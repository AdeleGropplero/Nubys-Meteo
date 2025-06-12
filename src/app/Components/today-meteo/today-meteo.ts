import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { KENDO_LAYOUT } from '@progress/kendo-angular-layout';
import { MediaMatcher } from '@angular/cdk/layout';
import { WeatherApiService } from '../../Services/weather-api/weather-api';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-today-meteo',
  imports: [KENDO_LAYOUT, CommonModule],
  templateUrl: './today-meteo.html',
  styleUrl: './today-meteo.scss',
})
export class TodayMeteo implements OnInit {
  public weather: any;
  public data: string = '';
  public sunriseT: string = '';
  public sunsetT: string = '';
  public windSpeed: string = '';
  public windDeg: number = 0;
  public windDirection: string = '';

  constructor(private weatherService: WeatherApiService) {}

  async ngOnInit() {
    /* API CALL (GET) */
    this.weather = await lastValueFrom(
      this.weatherService.getWeather(45.4721, 9.2399)
    );

    console.log('🚀 ~ TodayMeteo ~ ngOnInit ~  this.weather:', this.weather);

    this.sunriseT = new Date(
      this.weather.sys.sunrise * 1000
    ).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    this.sunsetT = new Date(this.weather.sys.sunset * 1000).toLocaleTimeString(
      [],
      {
        hour: '2-digit',
        minute: '2-digit',
      }
    );

    this.data = new Date(this.weather.dt * 1000).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
    });

    this.windSpeed = `${(this.weather.wind.speed * 3.6).toFixed(1)} km/h`;
    this.windDeg = this.weather.wind.deg;
    this.windDirection = this.getWindDirectionIcon(this.windDeg);
  }

  /**
   * Returns the icon class for the wind direction based on the degree.
   * @param deg - The wind direction in degrees.
   * @returns The icon class as a string.
   */
  public getWindDirectionIcon(deg: number): string {
    switch (true) {
      case deg >= 0 && deg < 22.5:
        return 'bi-arrow-up';
      case deg >= 22.5 && deg < 67.5:
        return 'bi-arrow-up-right';
      case deg >= 67.5 && deg < 112.5:
        return 'bi-arrow-right';
      case deg >= 112.5 && deg < 157.5:
        return 'bi-arrow-down-right';
      case deg >= 157.5 && deg < 202.5:
        return 'bi-arrow-down';
      case deg >= 202.5 && deg < 247.5:
        return 'bi-arrow-down-left';
      case deg >= 247.5 && deg < 292.5:
        return 'bi-arrow-left';
      case deg >= 292.5 && deg < 337.5:
        return 'bi-arrow-up-left';
      default:
        return 'bi-arrow-up';
    }
  }

  /* 






 */
}

/*   public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 992px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery?.removeEventListener('change', this._mobileQueryListener);
  } */
