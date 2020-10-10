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
  profiles: Customer[]
  profile:Customer = new Customer();
  message:String
  click: boolean = false;
  displayedColumns = ['name','lastName','customerId','actions','photo'];
  
  constructor(
    @Inject(CarService) private customerService: CustomerService, private router:Router,
    private snack: MatSnackBar,  
    private confirmService: AppConfirmService,
    private sanitizer:DomSanitizer,
    private loader: AppLoaderService) {
    super();
      }

  ngOnInit() {
    super.ngOnInit();
    this.customerService.listCustomers(QueryParam.ALL).subscribe((response) => {
      this.dataSource = response['payload'];
    });
  }

  getData(qp: QueryParam) {
    return this.customerService.listCustomers(qp);
  }

  getFilters(): Map<string, any> {
    return new Map()
      .set('name', this.profile.name);
  }

  actionClear() {
    this.profile = new Customer();
  }

  transform(photo){
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'+photo);
}
updateProfile(){
  this.router.navigate(['/profile/detail']);

}

}

