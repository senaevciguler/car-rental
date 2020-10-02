import { CarComponent } from './components/carComponents/car/car.component';
import { CarListComponent } from './components/carComponents/car-list/car-list.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '', component:HomeComponent},
  {path:'cars', component:CarListComponent},
  {path:'cars/definition', component:CarComponent},
  {path:'cars/definition/:id', component:CarComponent},

  {path:'**', component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
