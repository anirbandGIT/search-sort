import { Component, OnInit } from '@angular/core';
import { CarModel } from '../../models/cars.model';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  copyCars: CarModel;
  cars: CarModel;
  carName: string;
  constructor(private carService: CarService) {}

  ngOnInit() {
    this.getCar();
    // data is fetched on init and stored
  }

  // this will get the list of cars
  getCar() {
    this.carService.get().subscribe(
      res => {
        this.cars = res as CarModel;
        this.copyCars = this.cars;
      },
      error => {
        console.error(error);
      }
    );
  }

  // this will do live search on keypress
  searchCarsLive() {
    if (this.carName !== '') {
      this.cars = this.copyCars.filter(element => {
        return element.carName.toLowerCase().includes(this.carName.toLowerCase());
      });
    } else {
      this.ngOnInit();
    }
  }

  // this will do search on submit and keyup.enter on input field
  searchCar(value: string) {
    if (value === '') {
      // this.ngOnInit();
      alert('ENTER CAR NAME TO FIND YOUR DREAM CAR');
    } else {
      this.cars = this.copyCars.filter(element => {
        return element.carName.toLowerCase().includes(value.toLowerCase());
      });
      console.log(this.cars);
      if (this.cars.length === 0) {
      alert('NO CARS FOUND');
      }
    }
  }

  // this will do sort on button press
  sortCars(value: string) {
    if (value === 'priceAscending') {
      this.cars = this.cars.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (value === 'priceDescending') {
      this.cars = this.cars.sort((a, b) => {
        return b.price - a.price;
      });
    } else if (value === 'newest') {
      // this is not working properly
      this.cars = this.cars.sort( (a, b) => a.updatedAt - b.updatedAt);
    }
  }
}
