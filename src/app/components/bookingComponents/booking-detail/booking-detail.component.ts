import { Car } from './../../../model/car.module';
import { CarService } from 'src/app/service/car.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryParam } from 'src/app/_base/query.param';
import { Utility } from 'src/app/_base/utility';
import {BaseComponent} from '../../../_base/base.component';
import { Booking } from 'src/app/model/booking.model';
import { BookingService } from 'src/app/service/booking.service.';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent extends BaseComponent {

  bookingForm: FormGroup;
  booking: Booking;
  dataSourceCars:Booking;
  startDate = new Date('DD-MM-YYYY');
  
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private bookingService:BookingService,
    private carService:CarService,
    ) {

    super();
  }
  
  init() {
    this.bookingForm = new FormGroup({

      carsControl: new FormControl(this.booking.car, [
        Validators.required,
      ]),
      checkInDate: new FormControl(this.booking.checkInDate,[
        Validators.required,
      ]),
      checkOutDate: new FormControl(this.booking.checkOutDate,[
        Validators.required,
      ]),
    });

    this.isComponentReady = true;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe(params => {
    this.loadBooking(params['id']);
     this.carService.listCars(QueryParam.ALL).subscribe((response) => {
      this.dataSourceCars = response['payload'];
    });
   

    });

  }

  minDateOfCheckInDate = new Date();
  checkInDateFilter = (d: Date): boolean => {
    return Utility.isEqualOrAfter(d, this.minDateOfCheckInDate);
  }

  checkOutDateFilter = (d: Date): boolean => {
    return this.booking.checkInDate && Utility.isAfter(d, this.booking.checkInDate);
  }


  getBooking(qp: QueryParam) {
    return this.bookingService.listBookings(qp);
    //return this.carService.listCars(qp);

  }
  getCars(qp: QueryParam) {
    //return this.bookingService.listBookings(qp);
    return this.carService.listCars(qp);

  }

  onChanged(carsControl: any) {
    this.booking.car = carsControl.value;
  }


  ngAfterViewInit() {
  }


  actionSave(){
    if (!this.bookingForm.valid) {
      return;
    }
    
    const model = this.bookingForm.value;
    this.booking.car = model.carsControl;
    this.booking.checkInDate = model.checkInDate;
    this.booking.checkOutDate = model.checkOutDate;

    
    if (Utility.isEmpty(this.booking.id)) {
      this.bookingService.createBooking(this.booking).subscribe(response => {
        console.log(response)
        if (Utility.isSuccess(response)) {
          this.router.navigate(['/bookings']);
        }
      });
    } else {
      this.bookingService.updateBooking(this.booking).subscribe(response => {
        if (Utility.isSuccess(response)) {
          this.router.navigate(['/bookings']);
        }
      });
    }
  
  }

  
    private loadBooking(id: any) {
      if (Utility.isEmpty(id)) {
        this.booking = new Booking();
        this.init();
        return;
      }
      this.bookingService.retrieveBooking(id).subscribe((response) => {
        if (Utility.isSuccess(response)) {
          this.booking = Object.assign(new Booking(), response['payload']);
          this.init();
        }
      });
  
    }


}