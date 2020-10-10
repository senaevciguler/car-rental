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
  selector: 'app-avaibleCar-list',
  templateUrl: './avaibleCar-list.component.html',
  styleUrls: ['./avaibleCar-list.component.css']
})
export class AvaibleCarListComponent extends PaginationListComponent {
  avaibleCars: Car[]
  avaibleCar:Car = new Car();
  message:String
  click: boolean = false;
  displayedColumns = ['model','bodyType','year','actions','photo'];
  
  constructor(
    @Inject(CarService) private carService: CarService, private router:Router,
    private snack: MatSnackBar,  
    private confirmService: AppConfirmService,
    private sanitizer:DomSanitizer,
    private loader: AppLoaderService) {
    super();
      }

  ngOnInit() {
    super.ngOnInit();
    this.carService.listCars(QueryParam.ALL).subscribe((response) => {
      this.dataSource = response['payload'];
    });
  }

  getData(qp: QueryParam) {
    return this.carService.listCars(qp);
  }

  getFilters(): Map<string, any> {
    return new Map()
      .set('name', this.avaibleCar.model);
  }

  actionClear() {
    this.avaibleCar = new Car();
  }

  transform(photo){
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'+photo);
}
booking(id){  
    this.confirmService.confirm({message: ` ${id} number of car booked for you ! 
    Please Keep your car number for payment when you come our office to get your car! `})
          this.loader.open()
              this.loader.close();
              this.click = !this.click;
              this.refresh();
  }

}

