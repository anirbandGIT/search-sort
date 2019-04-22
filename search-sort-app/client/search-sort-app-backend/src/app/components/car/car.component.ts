import { Component, OnInit } from '@angular/core';
import { CarModel } from '../../models/cars.model';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: CarModel;
  copyCars: CarModel;
  carName: string;
  constructor(private carService: CarService) {}

  ngOnInit() {
    this.getCar();
    // data is fetched on init and stored
  }

  getCar() {
    this.carService.get('').subscribe(
      res => {
        this.cars = res as CarModel;
        this.copyCars = this.cars;
      },
      error => {
        console.error(error);
      }
    );
  }

  searchCarsLive() {
    if (this.carName !== '') {
      this.cars = this.copyCars.filter(element => {
        return element.carName.toLowerCase().includes(this.carName.toLowerCase());
      });
    } else {
      this.ngOnInit();
    }
  }

  searchCar(value: string) {
    if (value === '') {
      // this.ngOnInit();
      alert('ENTER CAR NAME TO FIND YOUR DREAM CAR');
    } else {
      this.carService.get(value).subscribe(
        res => {
          this.cars = res as CarModel;
          // this.copyCars = this.cars;
          if (this.cars.length === 0) {
          alert('NO CARS FOUND');
          }
        },
      );
    }
  }

  sortCars(value: string) {
    if (value === 'priceAscending') {
      this.carService.get(value).subscribe(
        res => {});
    } else if (value === 'priceDescending') {
      this.carService.get(value).subscribe(
        res => {});
    } else if (value === 'newest') {
      this.carService.get(value).subscribe(
        res => {});
    }
  }

  // sortCars(value: string) {
  //   if (value === 'priceAscending') {
  //     this.cars = this.copyCars.sort((a, b) => {
  //       return a.price - b.price;
  //     });
  //   } else if (value === 'priceDescending') {
  //     this.cars = this.copyCars.sort((a, b) => {
  //       return b.price - a.price;
  //     });
  //   } else if (value === 'newest') {
  //     // this is not working as sort() cannot work with the values that is present in createdAt or updatedAt
  //     this.cars = this.copyCars.sort((a, b) => {
  //       return a.updatedAt - b.updatedAt;
  //     });
  //   }
  // }
}
