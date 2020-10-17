
import { BookingService } from './../service/booking.service.';
import { OfficeService } from './../service/office.service';
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { QueryParam } from '../_base/query.param';
import { Utility } from '../_base/utility';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../_base/base.component';
import { Booking } from '../model/booking.model';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  extends BaseComponent {

  dataSourceOffice = [];
  searchForm: FormGroup;
  selected = [];
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
      office: new FormControl(this.booking.office, [
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

  ngAfterViewInit() {
  }


  actionSave(){
    if (!this.searchForm.valid) {
      return;
    }
    
    const model = this.searchForm.value;
    this.booking.office = model.office;
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
  }

  search(){

    const model = this.searchForm.value;
    this.router.navigate(['/avaibleCars'], 
    { queryParams: { office: model.office.name, 
      checkInDate: model.checkInDate.toISOString(),
      checkOutDate:  model.checkOutDate.toISOString()}});
  }
}
