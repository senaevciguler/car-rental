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

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  offices: Office[];
  office:Office = new Office();
  dataSourceOffice = [];
  searchForm: FormGroup;
  selected = [];

  
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private officeService:OfficeService) {
 
  }

  init() {
    this.searchForm = new FormGroup({
      name: new FormControl(this.office.name, [
        Validators.required,
      ])
    });

  }

  ngOnInit(): void {
  
    this.officeService.listOffices(QueryParam.ALL).subscribe((response) => {
      this.dataSourceOffice = response['payload'];
    });
    this.searchForm = new FormGroup({
      name: new FormControl(this.office.name, [
        Validators.required,
      ])
    });

  }

  getData(qp: QueryParam) {
    return this.officeService.listOffices();
  }

  onOfficeChanged(roleUser: any) {
    this.office.name = [this.office.name];
  }
  ngAfterViewInit() {
  }


  actionSave(){
    if (!this.searchForm.valid) {
      return;
    }
    
    const model = this.searchForm.value;
    this.office.name = model.name;
    
     this.router.navigate(['/cars'])
  
  
  }

  search(id){
    /*

    if(this.office.id === this.selected){

      this.office.getCar
    }
    */
    
    this.router.navigate(['/avaibleCars'])
  }


  public compareWith(object1: Office, object2:Office) {
    return object1.id && object2.id && object1.name === object2.name;
  }


}
