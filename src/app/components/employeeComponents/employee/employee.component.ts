import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/service/employee.service';
import { Utility } from 'src/app/_base/utility';
import {BaseComponent} from '../../../_base/base.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent extends BaseComponent {

  employeeForm: FormGroup;
  employee: Employee;
  dataSource = [];
  
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private employeeService:EmployeeService) {

    super();
  }
  
  init() {
    this.employeeForm = new FormGroup({
      name: new FormControl(this.employee.name, [
        Validators.required,
      ]),
      lastName: new FormControl(this.employee.lastName, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(9)
      ]),
      employeeId: new FormControl(this.employee.employeeId,[
        Validators.required
      ])
    });

    this.isComponentReady = true;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe(params => {
    this.loadEmployee(params['id']);
    });

  }

  ngAfterViewInit() {
  }


  actionSave(){
    if (!this.employeeForm.valid) {
      return;
    }
    
    const model = this.employeeForm.value;
    this.employee.name = model.name;
    this.employee.lastName = model.lastName;
    this.employee.employeeId = model.employeeId;
    
    
    if (Utility.isEmpty(this.employee.id)) {
      this.employeeService.createEmployee(this.employee).subscribe(response => {
        console.log(response)
        if (Utility.isSuccess(response)) {
          this.router.navigate(['/employees']);
        }
      });
    } else {
      this.employeeService.updateEmployee(this.employee).subscribe(response => {
        if (Utility.isSuccess(response)) {
          this.router.navigate(['/employees']);
        }
      });
    }
  
  }
  
    private loadEmployee(id: any) {
      if (Utility.isEmpty(id)) {
        this.employee = new Employee();
        this.init();
        return;
      }
      this.employeeService.retrieveEmployee(id).subscribe((response) => {
        if (Utility.isSuccess(response)) {
          this.employee = Object.assign(new Employee(), response['payload']);
          this.init();
        }
      });
  
    }
      
}