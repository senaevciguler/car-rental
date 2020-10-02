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

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  car: Car;
  startDate = new Date();
  dataSourceOffice = [];
  searchForm: FormGroup;
  minDateOfCheckInDate = new Date();
  
  checkInDateFilter = (d: Date): boolean => {
    return Utility.isEqualOrAfter(d, this.minDateOfCheckInDate);
  }

  checkOutDateFilter = (d: Date): boolean => {
    return this.car.checkInDate && Utility.isAfter(d, this.car.checkInDate);
  }

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private carService:CarService) {

  }

  init() {
    this.searchForm = new FormGroup({
      office: new FormControl(this.car.office, [
        Validators.required,
      ]),
      checkInDate: new FormControl(this.car.checkInDate, [
        Validators.required,
      ]),
      checkOutDate: new FormControl(this.car.checkOutDate, [
        Validators.required,
      ])
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
  }


  actionSave(){
    if (!this.searchForm.valid) {
      return;
    }
    
    const model = this.searchForm.value;
    this.car.office = model.office;
    this.car.checkInDate = model.checkInDate;
    this.car.checkInDate = model.checkInDate;
      
  
  }
  searchAvaibleCar(){
    this.router.navigate(['cars'])
  }
}
