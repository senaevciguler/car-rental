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
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent extends PaginationListComponent {
  cars: Car[]
  car:Car = new Car();
  message:String
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
      .set('name', this.car.model);
  }

  deleteCar(id) {
    this.confirmService.confirm({message: `Delete ${id}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.carService.deleteCar(id)
          .subscribe(
            response => {
              console.log(response);
              this.dataSource = this.cars;
              this.loader.close();
              this.refresh();
            })
        }
      })
  }


  updateCar(id) {
    console.log(`update ${id}`)
    this.router.navigate([`cars/definition/${id}`])
  }

  actionClear() {
    this.car = new Car();
  }
  addCar(){
    this.router.navigate(['cars/definition'])
  }
  
  transform(photo){
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'+photo);
}

  /*
  onStatusChange(value: any, row: any) {
    if (value === row.companyStatus) {
      return;
    }
    if (!Utility.isEmpty(value)) {
      this.companyService.changeCompanyStatus(row.id, value).subscribe(response => {
        if (Utility.isSuccess(response)) {
          row.companyStatus = value;
        }
      });
    }

  }
  */
}
