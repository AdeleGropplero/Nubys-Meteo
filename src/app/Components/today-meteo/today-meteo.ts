import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  input,
  OnInit,
  Output,
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
  @Input() id!: number;
  @Output() deleteRequest = new EventEmitter<number>();

  public weather: any;
  public data: string = '';
  public sunriseT: string = '';
  public sunsetT: string = '';
  public windSpeed: string = '';
  public windDeg: number = 0;
  public windDirection: string = '';

  public other: any;

  public orariGragico: string[] = [];
  public temperatureOrarie: number[] = [];

  public isLoading = true;

  public iconaMeteo = '';
  public iconaMeteo2 = '';
  public isDay!: number;

  constructor(private weatherService: WeatherApiService) {}

  async ngOnInit() {
    /* API CALL (GET) weather */
    this.weather = await lastValueFrom(
      this.weatherService.getWeather(this.lat, this.lon)
    );

    console.log('🚀 ~ TodayMeteo ~ ngOnInit ~  this.weather:', this.weather);

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

    this.iconaMeteo = this.getIconMeteo(this.weather.weather[0].icon);
    this.isDay = this.other.current.is_day;
    this.iconaMeteo2 = this.getIconMeteo2(
      this.other.daily.weather_code[0],
      this.isDay
    );
    console.log('CODICE METEO WMO:', this.other.daily.weather_code[0]);
    console.log('TIPO:', typeof this.other.daily.weather_code[0]);
    console.log('isDay:', this.isDay, 'typeof:', typeof this.isDay);
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

  public onDeleteClick() {
    this.deleteRequest.emit(this.id); // emette l'id al padre
  }

  public getIconMeteo(preIcon: String): string {
    switch (true) {
      case preIcon === '01n':
        return 'bi-moon-stars';
      case preIcon === '01d':
        return 'bi-sun';
      case preIcon === '02n':
        return 'bi-cloud-moon';
      case preIcon === '02d':
        return 'bi-cloud-sun';
      case preIcon === '03n' || preIcon === '03d':
        return 'bi-clouds';
      case preIcon === '04n' || preIcon === '04d':
        return 'bi-clouds-fill';
      case preIcon === '50d' || preIcon === '50n':
        return 'bi-cloud-haze';
      case preIcon === '13d' || preIcon === '13n':
        return 'bi-snow';
      case preIcon === '10d' || preIcon === '10n':
        return 'bi-cloud-drizzle';
      case preIcon === '09d' || preIcon === '09n':
        return 'bi-cloud-rain-heavy';
      case preIcon === '11d' || preIcon === '11n':
        return 'bi-cloud-lightning';

      default:
        return 'bi-sun';
    }
  }

  public getIconMeteo2(cod: number, isDay: number): string {
    // Mappa codici meteo comuni indipendenti da isDay
    const iconMap: Record<number, string> = {
      45: 'bi-cloud-haze',
      48: 'bi-cloud-haze',
      51: 'bi-cloud-drizzle',
      53: 'bi-cloud-drizzle',
      55: 'bi-cloud-drizzle',
      56: 'bi-cloud-drizzle-fill', // Freezing drizzle
      57: 'bi-cloud-drizzle-fill',
      61: 'bi-cloud-rain',
      62: 'bi-cloud-rain',
      63: 'bi-cloud-rain',
      64: 'bi-cloud-rain',
      65: 'bi-cloud-rain',
      66: 'bi-cloud-sleet', // Freezing rain
      67: 'bi-cloud-sleet',
      71: 'bi-snow',
      72: 'bi-snow',
      73: 'bi-snow',
      74: 'bi-snow',
      75: 'bi-snow',
      77: 'bi-cloud-sleet-fill', // Snow grains
      80: 'bi-cloud-rain-heavy',
      81: 'bi-cloud-rain-heavy',
      82: 'bi-cloud-rain-heavy',
      85: 'bi-cloud-snow',
      86: 'bi-cloud-snow',
      95: 'bi-cloud-lightning',
      96: 'bi-cloud-lightning-rain', // Thunderstorm with hail
      99: 'bi-cloud-lightning-rain-fill',
    };

    // Gestione codici 0–3 con giorno/notte
    if (cod === 0) return isDay === 1 ? 'bi-sun' : 'bi-moon-stars';
    if (cod === 1) return isDay === 1 ? 'bi-cloud-sun' : 'bi-cloud-moon';
    if (cod === 2) return 'bi-clouds';
    if (cod === 3) return isDay === 1 ? 'bi-clouds-fill' : 'bi-cloud-fill';

    // Ritorna da mappa, altrimenti default
    return iconMap[cod] ?? 'bi-sun';
  }

  /* API CALL (GET) forecast */
  /*
    public forecast: any;
  
  this.forecast = await lastValueFrom(
      this.weatherService.getForecast(this.lat, this.lon)
    );
    console.log('🚀 ~ TodayMeteo ~ ngOnInit ~  this.forecast:', this.forecast); */

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
