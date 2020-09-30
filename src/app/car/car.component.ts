import { CarService } from './../service/car.service';
import { Car} from '../model/car.module';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  id:number
  car:Car

  constructor(private carService:CarService,
    private route: ActivatedRoute,
    private router:Router
) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id']
    this.car = new Car();

    if(this.id != -1){
      this.carService.retrieveCar(this.id)
      .subscribe(
      data => this.car = data
      )
    }
  }
  
  saveCar(){
    if(this.id == -1){
      this.carService.createCar(this.car)
      .subscribe(
          data =>{
            console.log(data)
            this.router.navigate(['cars'])
          } 
        
      )
    }else{
      this.carService.updateCar(this.id,this.car)
      .subscribe(
            data =>{
            console.log(data)
            this.router.navigate(['cars'])
          } 
        
      )
    }
  }

}
