import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { CustomerService } from 'src/app/service/customer.service';
import { Utility } from 'src/app/_base/utility';
import {BaseComponent} from '../../../_base/base.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent extends BaseComponent {

  customerForm: FormGroup;
  customer: Customer;
  dataSource = [];
  
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private customerService:CustomerService) {

    super();
  }
  
  init() {
    this.customerForm = new FormGroup({
      name: new FormControl(this.customer.name, [
        Validators.required,
      ]),
      lastName: new FormControl(this.customer.lastName, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),
    });

    this.isComponentReady = true;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe(params => {
    this.loadCustomer(params['id']);
    });

  }

  ngAfterViewInit() {
  }


  actionSave(){
    if (!this.customerForm.valid) {
      return;
    }
    
    const model = this.customerForm.value;
    this.customer.name = model.name;
    this.customer.lastName = model.lastName;

    
    if (Utility.isEmpty(this.customer.id)) {
      this.customerService.createCustomer(this.customer).subscribe(response => {
        console.log(response)
        if (Utility.isSuccess(response)) {
          this.router.navigate(['/customers']);
        }
      });
    } else {
      this.customerService.updateCustomer(this.customer).subscribe(response => {
        if (Utility.isSuccess(response)) {
          this.router.navigate(['/customers']);
        }
      });
    }
  
  }
  
    private loadCustomer(id: any) {
      if (Utility.isEmpty(id)) {
        this.customer = new Customer();
        this.init();
        return;
      }
      this.customerService.retrieveCustomer(id).subscribe((response) => {
        if (Utility.isSuccess(response)) {
          this.customer = Object.assign(new Customer(), response['payload']);
          this.init();
        }
      });
  
    }
      
}