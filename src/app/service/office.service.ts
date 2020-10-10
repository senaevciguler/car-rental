import { Office } from '../model/office.module';
import { environment } from '../../environments/environment';


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QueryParam } from '../_base/query.param';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class OfficeService {
  private officeSubject: BehaviorSubject<Office>;
  public office: Observable<Office>;


  constructor(protected http:HttpClient) {
    
   }


  listOffices(qp?: QueryParam) {
    qp = qp || new QueryParam();
    return this.http.get<Office[]>(`${environment.apiURL}/offices`, {
        params: qp.toURLSearchParams()
  });
}

  deleteOffice(id:any){
    return this.http.delete(`${environment.apiURL}/offices/${id}`);
  }
  retrieveOffice(id:any){
    return this.http.get<Office>(`${environment.apiURL}/offices/${id}`);
  }
  updateOffice(model: Office){
    return this.http.put(`${environment.apiURL}/offices/${model.id}`, model);
  }
  createOffice(model: Office){
    return this.http.post(`${environment.apiURL}/offices` ,model);
  }
  
}
