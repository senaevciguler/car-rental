import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/model/car.module';
import { CarService } from 'src/app/service/car.service';
import { Utility } from 'src/app/_base/utility';
import {BaseComponent} from '../../../_base/base.component';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent extends BaseComponent {

  carForm: FormGroup;
  car: Car;
  dataSource = [];
  selectedFiles: any;
  
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private carService:CarService) {

    super();
  }
  
  init() {
    this.carForm = new FormGroup({
      model: new FormControl(this.car.model, [
        Validators.required,
      ]),
      bodyType: new FormControl(this.car.bodyType, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(9)
      ]),
      color: new FormControl(this.car.color,[
        Validators.required
      ]),
      year: new FormControl(this.car.year,[
        Validators.required
      ])
    });

    this.isComponentReady = true;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe(params => {
    this.loadCar(params['id']);
    });

  }

  ngAfterViewInit() {
  }


  actionSave() {
    if (!this.carForm.valid) {
      return;
    }
    
    console.log(this.selectedFiles[0]);
    const model = this.carForm.value;
    this.car.model = model.model;
    this.car.bodyType = model.bodyType;
    this.car.color = model.color;
    this.car.year = model.year;
    //this.car.photo = this.selectedFiles[0];

    console.log(this.car);
    if (Utility.isEmpty(this.car.id)) {
      this.carService.createCar(this.car).subscribe(response => {
        console.log(response)
        if (Utility.isSuccess(response)) {
          this.carService.saveCarImage( response['payload'].id, this.selectedFiles[0]).subscribe(response => {
            console.log(response)
            if (Utility.isSuccess(response)) {
              this.router.navigate(['/cars']);
            }
          });
          //this.router.navigate(['/cars']);
        }
      });
      
      


    } else {
      this.carService.updateCar(this.car).subscribe(response => {
        if (Utility.isSuccess(response)) {
          this.router.navigate(['/cars']);
        }
      });
    }
  }
  
    private loadCar(id: any) {
      if (Utility.isEmpty(id)) {
        this.car = new Car();
        this.init();
        return;
      }
      this.carService.retrieveCar(id).subscribe((response) => {
        if (Utility.isSuccess(response)) {
          this.car = Object.assign(new Car(), response['payload']);
          this.init();
        }
      });
  
    }

    selectFile(event) {
      this.selectedFiles = event.target.files;
  }
      
}