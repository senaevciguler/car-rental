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
  getData(qp: QueryParam) {
    throw new Error('Method not implemented.');
  }
  getFilters(): Map<string, any> {
    throw new Error('Method not implemented.');
  }

}



