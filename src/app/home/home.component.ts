import { BookingService } from './../service/booking.service.';
import { OfficeService } from './../service/office.service';
import { Office } from './../model/office.module';
import { CarService } from './../service/car.service';
import { Car } from 'src/app/model/car.module';
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DatePipe} from '@angular/common';
import { PaginationListComponent } from '../_base/pagination.list.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { QueryParam } from '../_base/query.param';
import { Utility } from '../_base/utility';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfirmService } from '../service/app-confirm/app-confirm.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppLoaderService } from '../service/app-loader/app-loader.service';
import { BaseComponent } from '../_base/base.component';
import { Booking } from '../model/booking.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  extends BaseComponent {

  dataSourceOffice = [];
  searchForm: FormGroup;
  selected;
  booking: Booking;
  startDate = new Date();

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private officeService:OfficeService,
    private bookingService:BookingService) {
      super();
  }

  init() {
    this.searchForm = new FormGroup({
      office: new FormControl(this.booking.offices, [
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
    this.officeService.listOffices(QueryParam.ALL).subscribe((response) => {
      this.dataSourceOffice = response['payload'];
    });
  });

  }

  getData(qp: QueryParam) {
    return this.officeService.listOffices();
  }

  onOfficeChanged(office: any) {
    console.log('testtttttt'+office.value);
    this.booking.offices = office.value;
  }
  ngAfterViewInit() {
  }


  actionSave(){
    if (!this.searchForm.valid) {
      return;
    }
    
    const model = this.searchForm.value;
    this.booking.offices = model.office;
    this.booking.checkInDate = model.checkInDate;
    this.booking.checkOutDate = model.checkOutDate;
    
     this.router.navigate(['/cars'])
  
  
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
        this.selected = this.booking.offices;
        console.log(this.selected);
        this.init();
      }
    });

  }
  search(){
    console.log(this.selected);
    this.router.navigate(['/avaibleCars'], { queryParams: { office: this.selected } });
}


  public compareWith(object1: Office, object2:Office) {
    return object1.id && object2.id && object1.name === object2.name;
  }


}
