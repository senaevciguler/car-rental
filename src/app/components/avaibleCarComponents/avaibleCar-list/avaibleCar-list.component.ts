import { BookingService } from './../../../service/booking.service.';
import { Booking } from './../../../model/booking.model';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {PaginationListComponent} from '../../../_base/pagination.list.component';
import { CarService } from 'src/app/service/car.service';
import {AppConfirmService} from '../../../service/app-confirm/app-confirm.service';
import{AppLoaderService} from '../../../service/app-loader/app-loader.service';
import { QueryParam } from 'src/app/_base/query.param';
import { DomSanitizer } from '@angular/platform-browser';
import { Utility } from 'src/app/_base/utility';



@Component({
  selector: 'app-avaibleCar-list',
  templateUrl: './avaibleCar-list.component.html',
  styleUrls: ['./avaibleCar-list.component.css']
})
export class AvaibleCarListComponent extends PaginationListComponent {
  avaibleCars: Booking;
  book: Booking = new Booking();
  message:String
  click: boolean = false;
  public checkInDate:Date;
  public checkOutDate:Date;
  public officeName = "";


  //model = this.book.car.model;

  displayedColumns = ['model','bodyType','year','actions','photo'];
  
  constructor(
    @Inject(CarService) private carService: CarService, private router:Router,
    private snack: MatSnackBar,  
    private confirmService: AppConfirmService,
    private sanitizer:DomSanitizer,
    private loader: AppLoaderService,
    private bookingService: BookingService,
    private route: ActivatedRoute) {
    super();
      }

  ngOnInit() {
    super.ngOnInit();
    this.route.queryParams.subscribe(params => {
      this.officeName = params['office'];
      this.checkInDate = params['checkInDate'];  
      this.checkOutDate = params['checkOutDate'];  
    });
    this.route.params.subscribe(params => {
    this.loadBooking(params['id']);

    this.carService.availableCars(QueryParam.ALL, this.officeName, this.checkInDate, this.checkOutDate).subscribe((response) => {
      this.dataSource = response['payload'];
    });
    });
    
  }

  getData(qp: QueryParam) {
    return  this.carService.availableCars(QueryParam.ALL, this.officeName, this.checkInDate, this.checkOutDate);
  }

  getFilters(): Map<string, any> {
    return new Map();
  }

  private loadBooking(id: any) {
    if (Utility.isEmpty(id)) {
      this.book = new Booking();
       return;
    }
    this.bookingService.retrieveBooking(id).subscribe((response) => {
      if (Utility.isSuccess(response)) {
        this.book = Object.assign(new Booking(), response['payload']);
       
      }
    });

  }
  actionClear() {
    this.book = new Booking();
  }

  transform(photo){
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'+photo);
}
booking(id){
  this.book.car = id;
  //this.book.office = this.officeName;
  this.book.checkInDate = this.checkInDate;
  this.book.checkOutDate = this.checkOutDate;

  this.bookingService.createBooking(this.book).subscribe(response => {
    if (Utility.isSuccess(response)) {
      this.router.navigate(['/cars']);
    }
  });
  }
}

