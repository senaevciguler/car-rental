import { EmployeeService } from './../../../service/employee.service';
import { Component, Inject, OnInit } from '@angular/core';
import { PaginationListComponent } from 'src/app/_base/pagination.list.component';
import { QueryParam } from 'src/app/_base/query.param';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from 'src/app/service/app-confirm/app-confirm.service';
import { AppLoaderService } from 'src/app/service/app-loader/app-loader.service';
import { Employee } from 'src/app/model/employee.model';



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent extends PaginationListComponent {
  employees: Employee[]
  employee:Employee = new Employee();
  message:String
  displayedColumns = ['employeeId','name','lastName','actions'];

  constructor(
    @Inject(EmployeeService) private employeeService: EmployeeService, private router:Router,
    private snack: MatSnackBar,  private confirmService: AppConfirmService,
    private loader: AppLoaderService) {
    super();
      }


  ngOnInit(): void {
    super.ngOnInit();
    this.employeeService.listEmployees(QueryParam.ALL).subscribe((response) => {
      this.dataSource = response['payload'];
    });
  }
  getData(qp: QueryParam) {
    return this.employeeService.listEmployees(qp);
  }

  getFilters(): Map<string, any> {
    return new Map()
      .set('name', this.employee.name);
  }

  deleteEmployee(id) {
    this.confirmService.confirm({message: `Delete ${id}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.employeeService.deleteEmployee(id)
          .subscribe(
            response => {
              console.log(response);
              this.dataSource = this.employees;
              this.loader.close();
              this.refresh();
            })
        }
      })
  }


  updateEmployee(id) {
    console.log(`update ${id}`)
    this.router.navigate([`employees/profile/${id}`])
  }

  actionClear() {
    this.employee = new Employee();
  }
  addEmployee(){
    this.router.navigate(['employees/profile'])
  }

}
