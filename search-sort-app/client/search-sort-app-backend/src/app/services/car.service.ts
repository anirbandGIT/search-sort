import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:4000';

  get(value: string) {
    if (value === '') {
      return this.http.get(this.baseUrl + '/api/v1/cars');
    } else if (value === 'priceAscending' || 'priceDescending' || 'newest') {
      return this.http.get(this.baseUrl + `/api/v1/cars/sort=${value}`);
    } else {
      return this.http.get(this.baseUrl + `/api/v1/cars/search=${value}`);
    }
  }

  post(data) {
    return this.http.post(this.baseUrl + '/api/v1/cars', data);
  }
}
