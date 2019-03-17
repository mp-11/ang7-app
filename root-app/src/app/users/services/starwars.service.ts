import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StarwarsService {
  private baseUrl: string = 'https://swapi.co/api/';

  constructor(private http: HttpClient) { }

  getPeople(searchParam?: string) {
    const url = `${this.baseUrl}people`;
    const options = searchParam 
      ? { params: new HttpParams().set('search', searchParam) } 
      : {};

    return this.http.get<any>(url, options);
  }

  loadFilms() {
    const url = `${this.baseUrl}films`;
    return this.http.get<any>(url);
  }
}
