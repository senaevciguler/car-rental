import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Car } from 'src/app/model/car.module';
import { AppConfirmService } from 'src/app/service/app-confirm/app-confirm.service';
import { AppLoaderService } from 'src/app/service/app-loader/app-loader.service';
import { CarService } from 'src/app/service/car.service';
import { PaginationListComponent } from 'src/app/_base/pagination.list.component';
import { QueryParam } from 'src/app/_base/query.param';

@Component({
  selector: 'app-car-for-user-components',
  templateUrl: './car-for-user-components.component.html',
  styleUrls: ['./car-for-user-components.component.css']
})

export class CarForUserComponentsComponent extends PaginationListComponent {
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