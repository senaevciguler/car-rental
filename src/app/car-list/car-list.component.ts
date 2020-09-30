import { CarService } from './../service/car.service';
import { Car } from './../model/car.module';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Car[]
  message:String

  constructor(private carService: CarService,
    private router: Router) { }

  ngOnInit(): void {
    this.refreshCars();
  }

  refreshCars(){
    return this.carService.retrieveAllCars().subscribe(
      response =>{
        console.log(response);
        this.cars = response;
      }
    )
  }
  
  
  deleteCar(id){
    console.log(`delete car ${id}`)
    this.carService.deleteCar(id).subscribe(
      response => {
        console.log(response);
        this.message =`Delete of car ${id} Successful!`;
        this.refreshCars();
      }
    )
  }
  updateCar(id){
  console.log(`update ${id}`)
  this.router.navigate(['cars', id])
  }

  addCar(){
    this.router.navigate(['cars', -1])
  }

}
