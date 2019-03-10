import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StarwarsService {
  private baseUrl: string = 'https://swapi.co/api/';

  constructor(private http: HttpClient) { }

  getData(type='people', searchParam?: string) {
    const url = `${this.baseUrl}${type}`;
    const options = searchParam 
      ? { params: new HttpParams().set('search', searchParam) } 
      : {};

    return this.http.get<any>(url, options);
  }


  init() {
    // this.getPeople()
    //   .pipe(
    //     tap(console.log),
    //     map(res => res.results)
    //   )
    //   .subscribe(res => console.log(res))

    // this.getStarships()
    //   .pipe(
    //     tap(console.log),
    //     map(res => res.results)
    //   )
    //   .subscribe(res => console.log(res))
  }

}
