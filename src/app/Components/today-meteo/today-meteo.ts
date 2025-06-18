import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Input,
  input,
  OnInit,
} from '@angular/core';
import { KENDO_LAYOUT } from '@progress/kendo-angular-layout';
import { MediaMatcher } from '@angular/cdk/layout';
import { WeatherApiService } from '../../Services/weather-api/weather-api';
import { lastValueFrom } from 'rxjs';
import { KENDO_CHARTS } from '@progress/kendo-angular-charts';
import { KENDO_INDICATORS } from '@progress/kendo-angular-indicators';

@Component({
  selector: 'app-today-meteo',
  imports: [KENDO_LAYOUT, CommonModule, KENDO_CHARTS, KENDO_INDICATORS],
  templateUrl: './today-meteo.html',
  styleUrl: './today-meteo.scss',
})
export class TodayMeteo implements OnInit {
  @Input() lat!: number;
  @Input() lon!: number;
  @Input() chartVisible: boolean = true;

  public weather: any;
  public data: string = '';
  public sunriseT: string = '';
  public sunsetT: string = '';
  public windSpeed: string = '';
  public windDeg: number = 0;
  public windDirection: string = '';

  public forecast: any;

  public other: any;

  public orariGragico: string[] = [];
  public temperatureOrarie: number[] = [];

  isLoading = true;

  constructor(private weatherService: WeatherApiService) {}

  async ngOnInit() {
    /* API CALL (GET) weather */
    this.weather = await lastValueFrom(
      this.weatherService.getWeather(this.lat, this.lon)
    );

    console.log('🚀 ~ TodayMeteo ~ ngOnInit ~  this.weather:', this.weather);

    /* API CALL (GET) forecast */
    this.forecast = await lastValueFrom(
      this.weatherService.getForecast(this.lat, this.lon)
    );
    console.log('🚀 ~ TodayMeteo ~ ngOnInit ~  this.forecast:', this.forecast);

    /* API CALL (GET) pollution */
    this.other = await lastValueFrom(
      this.weatherService.getOther(this.lat, this.lon)
    );
    console.log('🚀 ~ TodayMeteo ~ ngOnInit ~  this.other:', this.other);

    https: this.sunriseT = new Date(
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

    this.orariGragico = this.getHours(this.other.hourly.time).map((el) => {
      const ore = el.split('T')[1].split(':')[0];
      return ore;
    });

    this.temperatureOrarie = this.getHourlyTemperatures(
      this.other.hourly.temperature_2m
    );

    this.isLoading = false;
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
  getHours(timeArray: string[]): string[] {
    const today = new Date().toISOString().split('T')[0];
    return timeArray.filter((time) => time.startsWith(today));
  }

  getHourlyTemperatures(tempArr: number[]): number[] {
    return tempArr.slice(0, 24);
  }

  /* usiamo una pipe!! 
  public formatDateToDayMonth(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
    });
  }
    
  etHourlyTemperatures(): number[] {
  return Array.from({ length: 24 }, (_, i) => i);
}
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
