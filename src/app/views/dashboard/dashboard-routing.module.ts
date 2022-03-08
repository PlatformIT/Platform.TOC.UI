import { UserComponent } from './user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboadDefaultComponent } from './dashboad-default/dashboad-default.component';
import { DashboardV2Component } from './dashboard-v2/dashboard-v2.component';
import { DashboardV3Component } from './dashboard-v3/dashboard-v3.component';
import { DashboardV4Component } from './dashboard-v4/dashboard-v4.component';
import { GetByMonthComponent } from './get-by-month/get-by-month.component';
import { ReportsComponent } from './reports/reports.component';
import { UploadFileComponent } from './upload-file/upload-file.component';

const routes: Routes = [
  {
    path: 'uploadfile',
    component: UploadFileComponent
  },
  {
    path: 'getByMonth',
    component: GetByMonthComponent
  },
  {
    path: 'reports',
    component: ReportsComponent
  },
  {
    path: 'users',
    component: UserComponent
  },
  // {
  //   path: 'v1',
  //   component: DashboadDefaultComponent
  // },
  // {
  //   path: 'v2',
  //   component: DashboardV2Component
  // },
  // {
  //   path: 'v3',
  //   component: DashboardV3Component
  // },
  // {
  //   path: 'v4',
  //   component: DashboardV4Component
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
