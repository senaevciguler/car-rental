import { CustomerService } from './../../../service/customer.service';
import { Component, Inject, OnInit } from '@angular/core';
import { PaginationListComponent } from 'src/app/_base/pagination.list.component';
import { QueryParam } from 'src/app/_base/query.param';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from 'src/app/service/app-confirm/app-confirm.service';
import { AppLoaderService } from 'src/app/service/app-loader/app-loader.service';
import { Customer } from 'src/app/model/customer.model';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent extends PaginationListComponent {
  customers: Customer[]
  customer:Customer = new Customer();
  message:String
  displayedColumns = ['customerId','name','lastName','actions'];

  constructor(
    @Inject(CustomerService) private customerService: CustomerService, private router:Router,
    private snack: MatSnackBar,  private confirmService: AppConfirmService,
    private loader: AppLoaderService) {
    super();
      }


  ngOnInit(): void {
    super.ngOnInit();
    this.customerService.listCustomers(QueryParam.ALL).subscribe((response) => {
      this.dataSource = response['payload'];
    });
  }
  getData(qp: QueryParam) {
    return this.customerService.listCustomers(qp);
  }

  getFilters(): Map<string, any> {
    return new Map()
      .set('name', this.customer.name);
  }

  deleteCustomer(id) {
    this.confirmService.confirm({message: `Delete ${id}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.customerService.deleteCustomer(id)
          .subscribe(
            response => {
              console.log(response);
              this.dataSource = this.customers;
              this.loader.close();
              this.refresh();
            })
        }
      })
  }


  updateCustomer(id) {
    console.log(`update ${id}`)
    this.router.navigate([`customers/profile/${id}`])
  }

  actionClear() {
    this.customer = new Customer();
  }
  addCustomer(){
    this.router.navigate(['customers/profile'])
  }

}
