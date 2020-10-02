import { EmployeeService } from './service/employee.service';
import { CustomerService } from './service/customer.service';
import { AppLoaderService } from './service/app-loader/app-loader.service';
import { AppConfirmService } from './service/app-confirm/app-confirm.service';
import { FooterComponent } from './footer/footer.component';
import { CarService } from './service/car.service';
import { CarComponent } from './components/carComponents/car/car.component';
import { CarListComponent } from './components/carComponents/car-list/car-list.component';
import { ErrorComponent } from './error/error.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import {LayoutModule} from '@angular/cdk/layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { CustomerComponent } from './components/customerComponents/customer/customer.component';
import { CustomerListComponent } from './components/customerComponents/customer-list/customer-list.component';
import { EmployeeComponent } from './components/employeeComponents/employee/employee.component';
import { EmployeeListComponent } from './components/employeeComponents/employee-list/employee-list.component';



@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    CarComponent,
    ErrorComponent,
    HomeComponent,
    FooterComponent,
    CustomerComponent,
    CustomerListComponent,
    EmployeeComponent,
    EmployeeListComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,
    LayoutModule,
    MatButtonModule, 
    ReactiveFormsModule,
    MatIconModule,
    MatGridListModule,
    MatInputModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatDialogModule

  ],
  providers: [CarService,AppConfirmService,AppLoaderService,CustomerService,EmployeeService],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
