import { LogoutComponent } from './components/logout/logout.component';
import { BookingComponent } from './components/bookingComponents/booking/booking.component';
import { ProfileDetailComponent } from './components/profileComponents/profile-detail/profile-detail.component';
import { AvaibleCarListComponent } from './components/avaibleCarComponents/avaibleCar-list/avaibleCar-list.component';
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
import { OfficeListComponent } from './components/officeComponents/office-list/office-list.component';
import { OfficeComponent } from './components/officeComponents/office/office.component';
import { ProfileComponent } from './components/profileComponents/profile/profile.component';
import {BookingDetailComponent} from './components/bookingComponents/booking-detail/booking-detail.component'
import { CarForUserComponentsComponent } from './components/car-for-user-components/car-for-user-components.component';
import { LoginComponent } from './components/login/login.component';



const routes: Routes = [
  {path: '', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'logout', component:LogoutComponent},
  //{path:'logout', component:LogoutComponent,canActivate:[RouteGuardService]},
  {path:'cars', component:CarListComponent},
  {path:'cars/definition', component:CarComponent},
  {path:'cars/definition/:id', component:CarComponent},
  {path:'customers', component:CustomerListComponent},
  {path:'customers/profile', component:CustomerComponent},
  {path:'customers/profile/:id', component:CustomerComponent},
  {path:'employees', component:EmployeeListComponent},
  {path:'employees/profile', component:EmployeeComponent},
  {path:'employees/profile/:id', component:EmployeeComponent},
  {path:'offices', component:OfficeListComponent},
  {path:'offices/profile', component:OfficeComponent},
  {path:'offices/profile/:id', component:OfficeComponent},
  {path:'avaibleCars', component:AvaibleCarListComponent},
  {path:'profile', component:ProfileComponent},
  {path:'profile/detail', component:ProfileDetailComponent},
  {path:'profile/detail/:id', component:ProfileDetailComponent},
 
  {path:'booking/detail/:id', component:BookingDetailComponent},
  {path:'booking', component:BookingComponent},
  {path:'showCar', component:CarForUserComponentsComponent},
  {path:'login', component:LoginComponent},
 

  {path:'**', component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
