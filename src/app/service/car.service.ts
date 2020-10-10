import { Office } from './../model/office.module';
import { environment } from './../../environments/environment';

import { Car } from './../model/car.module';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QueryParam } from '../_base/query.param';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class CarService {
  private carSubject: BehaviorSubject<Car>;
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
  updateCar(model: Car){
    return this.http.put(`${environment.apiURL}/cars/${model.id}`, model);
  }
  createCar(model: Car){
    return this.http.post(`${environment.apiURL}/cars` ,model);
  }

  saveCarImage(id: any, file){
    const formData = new FormData();
    formData.append('file',file, file.name);
    return this.http.post(`${environment.apiURL}/cars/image/${id}`, formData);
  }
  
}
