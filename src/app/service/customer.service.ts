import { Customer } from './../model/customer.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryParam } from '../_base/query.param';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CustomerService {
  private userSubject: BehaviorSubject<Customer>;
  public customer: Observable<Customer>;


  constructor(protected http:HttpClient) { }

  listCustomers(qp?: QueryParam) {
    qp = qp || new QueryParam();
    return this.http.get<Customer[]>(`${environment.apiURL}/customers`, {
        params: qp.toURLSearchParams()
    });
}

  deleteCustomer(id:any){
    return this.http.delete(`${environment.apiURL}/customers/${id}`);
  }
  retrieveCustomer(id:any){
    return this.http.get<Customer>(`${environment.apiURL}/customers/${id}`);
  }
  updateCustomer(model: Customer){
    return this.http.put(`${environment.apiURL}/customers/${model.id}`, model);
  }
  createCustomer(model: Customer){
    return this.http.post(`${environment.apiURL}/customers` ,model);
  }

}
