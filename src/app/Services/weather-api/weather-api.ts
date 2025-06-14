import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  private apiKey = '07e3f74535df6914e9e000a659e01ea4';
  private baseUrl = 'https://api.openweathermap.org/data/2.5/';

  constructor(private http: HttpClient) {}

  /**
   * Recupera meteo attuale + previsioni giornaliere (fino a 8 giorni)
   */
  getOneCallForecast(lat: number, lon: number): Observable<any> {
    const url = `${this.baseUrl}onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  getWeather(lat: number, lon: number): Observable<any> {
    const url = `${this.baseUrl}weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url);
  }

  getForecast(lat: number, lon: number): Observable<any> {
    const url = `${this.baseUrl}forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url);
  }

  getPollution(lat: number, lon: number): Observable<any> {
    const url = `${this.baseUrl}air_pollution?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  getOther(lat: number, lon: number): Observable<any> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&hourly=temperature_2m,temperature_80m&minutely_15=weather_code,temperature_2m&timezone=Europe%2FRome`;
    return this.http.get<any>(url);
  }
  /*https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&hourly=temperature_2m,temperature_80m&minutely_15=weather_code,temperature_2m  */
}
