import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:4000';

  get() {
    return this.http.get(this.baseUrl + '/api/v1/cars');
  }

  post(data) {
    return this.http.post(this.baseUrl + '/api/v1/cars', data);
  }
}
