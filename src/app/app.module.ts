import { FooterComponent } from './footer/footer.component';
import { CarService } from './service/car.service';
import { CarComponent } from './car/car.component';
import { CarListComponent } from './car-list/car-list.component';
import { ErrorComponent } from './error/error.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';




@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    CarComponent,
    ErrorComponent,
    HomeComponent,
    FooterComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CarService],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
