import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboadDefaultComponent } from './dashboad-default/dashboad-default.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { DashboardV2Component } from './dashboard-v2/dashboard-v2.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardV3Component } from './dashboard-v3/dashboard-v3.component';
import { DashboardV4Component } from './dashboard-v4/dashboard-v4.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetByMonthComponent } from './get-by-month/get-by-month.component';
import { ReportsComponent } from './reports/reports.component';
import { PrintComponent } from './print/print.component';
import { EmployeeComponent } from './employee/employee.component';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    NgxEchartsModule,
    NgxDatatableModule,
    NgbModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [DashboadDefaultComponent, DashboardV2Component, DashboardV3Component, DashboardV4Component, UploadFileComponent, GetByMonthComponent, ReportsComponent, PrintComponent, EmployeeComponent, UserComponent]
})
export class DashboardModule { }
