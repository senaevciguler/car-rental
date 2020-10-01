import { CarService } from './../service/car.service';
import { Car } from './../model/car.module';

import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import{AppConfirmService} from '../service/app-confirm/app-confirm.service';
import{AppLoaderService} from '../service/app-loader/app-loader.service';
import{PaginationListComponent} from '../_base/pagination.list.component';
import { QueryParam } from '../_base/query.param';


@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent extends PaginationListComponent {
  cars: Car[]
  car:Car = new Car();
  message:String
  displayedColumns = ['model','actions'];
  
  constructor(
    @Inject(CarService) private carService: CarService, private router:Router,
    private snack: MatSnackBar,  private confirmService: AppConfirmService,
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
