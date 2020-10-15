import { Booking } from './../model/booking.model';
import { Office } from './../model/office.module';
import { environment } from './../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QueryParam } from '../_base/query.param';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class BookingService {
  private bookingSubject: BehaviorSubject<Booking>;
  public booking: Observable<Booking>;


  constructor(protected http:HttpClient) {
    
   }

  listBookings(qp?: QueryParam) {
    qp = qp || new QueryParam();
    return this.http.get<Booking[]>(`${environment.apiURL}/booking`, {
        params: qp.toURLSearchParams()
    });
}

  deleteBooking(id:any){
    return this.http.delete(`${environment.apiURL}/booking/${id}`);
  }
  retrieveBooking(id:any){
    return this.http.get<Booking>(`${environment.apiURL}/booking/${id}`);
  }
  updateBooking(model: Booking){
    return this.http.put(`${environment.apiURL}/booking/${model.id}`, model);
  }
  createBooking(model: Booking){
    return this.http.post(`${environment.apiURL}/booking` ,model);
  }

}
