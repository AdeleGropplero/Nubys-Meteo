import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  private apiKey = '07e3f74535df6914e9e000a659e01ea4';
  private baseUrl = 'https://api.openweathermap.org/data/3.0/';

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
}
