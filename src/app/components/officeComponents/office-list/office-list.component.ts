import { OfficeService } from '../../../service/office.service';
import { Component, Inject, OnInit } from '@angular/core';
import { PaginationListComponent } from 'src/app/_base/pagination.list.component';
import { QueryParam } from 'src/app/_base/query.param';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from 'src/app/service/app-confirm/app-confirm.service';
import { AppLoaderService } from 'src/app/service/app-loader/app-loader.service';
import { Office } from 'src/app/model/office.module';



@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.css']
})
export class OfficeListComponent extends PaginationListComponent {
  
  displayedColumns = ['name','cars','actions'];
  offices: Office[]
  office:Office = new Office();
  message:String


  constructor(
    @Inject(OfficeService) private officeService: OfficeService, private router:Router,
    private snack: MatSnackBar,  private confirmService: AppConfirmService,
    private loader: AppLoaderService) {
    super();
      }


  ngOnInit(): void {
    super.ngOnInit();
    this.officeService.listOffices(QueryParam.ALL).subscribe((response) => {
      this.dataSource = response['payload'];

      
    });
  }
  getData(qp: QueryParam) {
    return this.officeService.listOffices(qp);
  }

  getFilters(): Map<string, any> {
    return new Map()
      .set('name', this.office.name);
  }

  deleteOffice(id) {
    this.confirmService.confirm({message: `Delete ${id}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.officeService.deleteOffice(id)
          .subscribe(
            response => {
              console.log(response);
              this.dataSource = this.offices;
              this.loader.close();
              this.refresh();
            })
        }
      })
  }


  updateOffice(id) {
    console.log(`update ${id}`)
    this.router.navigate([`offices/profile/${id}`])
  }

  actionClear() {
    this.office = new Office();
  }
  addOffice(){
    this.router.navigate(['offices/profile'])
  }

}
