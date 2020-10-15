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
import { Car } from 'src/app/model/car.module';
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
    this.route.params.subscribe(params => {
    this.loadBooking(params['id']);
    this.carService.listCars(QueryParam.ALL).subscribe((response) => {
      this.dataSource = response['payload'];
    });
   

    });
    
  }

  getData(qp: QueryParam) {
    return this.carService.listCars(qp);
  }

  getFilters(): Map<string, any> {
    return new Map()
      .set('name', this.book.car.model);
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
 
  //const model = this.book.car;
  

  this.bookingService.createBooking(this.book).subscribe(response => {
    if (Utility.isSuccess(response)) {
      this.router.navigate(['/profile']);
    }
  });
  //this.router.navigate([`booking/detail/${id}`])
  }

}

