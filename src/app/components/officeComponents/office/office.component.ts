import { Car } from 'src/app/model/car.module';
import { CarService } from 'src/app/service/car.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Office } from 'src/app/model/office.module';
import { OfficeService } from 'src/app/service/office.service';
import { QueryParam } from 'src/app/_base/query.param';
import { Utility } from 'src/app/_base/utility';
import {BaseComponent} from '../../../_base/base.component';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent extends BaseComponent {

  officeForm: FormGroup;
  office: Office;
  dataSourceCars = [];
  selected = [];
 
  
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private officeService:OfficeService,
    private carService:CarService) {

    super();
  }
  
  init() {
    this.officeForm = new FormGroup({
      name: new FormControl(this.office.name, [
        Validators.required,
      ]),
      carsControl:  new FormControl(this.office.cars, [
        Validators.required,
      ]),
    });

    this.isComponentReady = true;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe(params => {
    this.loadOffice(params['id']);
    this.carService.listCars(QueryParam.ALL).subscribe((response) => {
      this.dataSourceCars = response['payload'];
    });
   

    });

  }

  getData(qp: QueryParam) {
    return this.carService.listCars(qp);
  }

  onChanged(carsControl: any) {
    this.office.cars = [carsControl.value];
  }


  ngAfterViewInit() {
  }


  actionSave(){
    if (!this.officeForm.valid) {
      return;
    }
    
    const model = this.officeForm.value;
    this.office.name = model.name;
    this.office.cars = model.carsControl;

    
    if (Utility.isEmpty(this.office.id)) {
      this.officeService.createOffice(this.office).subscribe(response => {
        console.log(response)
        if (Utility.isSuccess(response)) {
          this.router.navigate(['/offices']);
        }
      });
    } else {
      this.officeService.updateOffice(this.office).subscribe(response => {
        if (Utility.isSuccess(response)) {
          this.router.navigate(['/offices']);
        }
      });
    }
  
  }
  
    private loadOffice(id: any) {
      if (Utility.isEmpty(id)) {
        this.office = new Office();
        this.init();
        return;
      }
      this.officeService.retrieveOffice(id).subscribe((response) => {
        if (Utility.isSuccess(response)) {
          this.office = Object.assign(new Office(), response['payload']);
          this.selected = this.office.cars;
          console.log(this.selected);
          this.init();
        }
      });
  
    }
    public compareWith(object1: Car, object2: Car) {
      console.log(object1.id)
      console.log(object1.model)
      return object1.id && object2.id && object1.model === object2.model;
    }
      
}