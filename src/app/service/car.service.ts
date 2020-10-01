import { environment } from './../../environments/environment';

import { Car } from './../model/car.module';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QueryParam } from '../_base/query.param';
import {BaseService} from '../_base/base.service';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable()
export class CarService {
  private userSubject: BehaviorSubject<Car>;
  public car: Observable<Car>;


  constructor(protected http:HttpClient) {
    
   }

  listCars(qp?: QueryParam) {
    qp = qp || new QueryParam();
    return this.http.get<Car[]>(`${environment.apiURL}/cars`, {
        params: qp.toURLSearchParams()
    });
}

  deleteCar(id:any){
    return this.http.delete(`${environment.apiURL}/cars/${id}`);
  }
  retrieveCar(id:any){
    return this.http.get<Car>(`${environment.apiURL}/cars/${id}`);
  }
  updateCar(id,car){
    return this.http.put(`${environment.apiURL}/cars/${id}`
    ,car);
  }
  createCar(car){
    return this.http.post(`${environment.apiURL}/cars/`
    ,car);
  }
  
}
