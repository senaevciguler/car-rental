import { Car } from './../model/car.module';
import{environment} from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class CarService {


  constructor(private http:HttpClient) { }

  retrieveAllCars(){
    return this.http.get<Car[]>(`${environment.baseURL}/cars`);
   
  }
  deleteCar(id){
    return this.http.delete(`${environment.baseURL}/cars/${id}`);
  }
  retrieveCar(id){
    return this.http.get<Car>(`${environment.baseURL}/cars/${id}`);
  }
  updateCar(id,car){
    return this.http.put(`${environment.baseURL}/cars/${id}`
    ,car);
  }
  createCar(car){
    return this.http.post(`${environment.baseURL}/cars/`
    ,car);
  }
  
}
