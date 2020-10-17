import { BookingService } from 'src/app/service/booking.service.';
import { Booking } from './../../../model/booking.model';
import { CustomerService } from 'src/app/service/customer.service';
import { Customer } from 'src/app/model/customer.model';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {PaginationListComponent} from '../../../_base/pagination.list.component';
import { Car } from 'src/app/model/car.module';
import { CarService } from 'src/app/service/car.service';
import {AppConfirmService} from '../../../service/app-confirm/app-confirm.service';
import{AppLoaderService} from '../../../service/app-loader/app-loader.service';
import { QueryParam } from 'src/app/_base/query.param';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends PaginationListComponent {
  books: Booking[]
  book:Booking = new Booking();
  message:String
  displayedColumns = ['car'];
  
  constructor(
    @Inject(CarService) private carService: CarService, private router:Router,
    private snack: MatSnackBar,  
    private confirmService: AppConfirmService,
    private sanitizer:DomSanitizer,
    private loader: AppLoaderService,
    private bookService:BookingService) {
    super();
      }

  ngOnInit() {
    super.ngOnInit();
    this.bookService.listBookings(QueryParam.ALL).subscribe((response) => {
      this.dataSource = response['payload'];
    });
  }

  getData(qp: QueryParam) {
    return this.bookService.listBookings(qp);
  }

  getFilters(): Map<string, any> {
    return new Map()
      .set('name', this.book.car);
  }

  actionClear() {
    this.book = new Booking();
  }

}



