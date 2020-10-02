import { EmployeeComponent } from './components/employeeComponents/employee/employee.component';
import { EmployeeListComponent } from './components/employeeComponents/employee-list/employee-list.component';
import { CustomerComponent } from './components/customerComponents/customer/customer.component';
import { CustomerListComponent } from './components/customerComponents/customer-list/customer-list.component';
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
  {path:'customers', component:CustomerListComponent},
  {path:'customers/profile', component:CustomerComponent},
  {path:'customers/profile/:id', component:CustomerComponent},
  {path:'employees', component:EmployeeListComponent},
  {path:'employees/profile', component:EmployeeComponent},
  {path:'employees/profile/:id', component:EmployeeComponent},

  {path:'**', component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
