import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { ReportCheckService } from 'src/app/shared/services/report-check.service';

declare var window: any;
@Component({
  selector: 'app-report-check',
  templateUrl: './report-check.component.html',
  styleUrls: ['./report-check.component.scss']
})
export class ReportCheckComponent implements OnInit {

  allEmployeeForm: FormGroup
  assignEmployeeForm: FormGroup
  contractEmployeeForm: FormGroup
  undifinedEmployeeForm: FormGroup
  years: any[] = []
  months: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  departments: any[] = [];
  thisYear: number;
  loadingGetEmployee: boolean;
  loadingTextGetEmployee: string;
  employeeInfo: any;
  lastYear: number;
  listYears: any[] = [];
  constructor(private fb: FormBuilder,
    private reportService: ReportCheckService,
    private departmentService: DepartmentService,
    private toastr: ToastrService,
    private auth: AuthService,
    private modalService: NgbModal
  ) {

    this.allEmployeeForm = this.fb.group({
      year: [],
      month: [],
      departmentCode: [],
    })
    this.assignEmployeeForm = this.fb.group({
      year: [],
      month: [],
      departmentCode: [],
    })
    this.contractEmployeeForm = this.fb.group({
      year: [],
      month: [],
      departmentCode: [],
    })
    this.undifinedEmployeeForm = this.fb.group({
      year: [],
      month: [],
      departmentCode: [],
    })

  }
  ngOnInit(): void {

    let date = new Date();
    this.lastYear = date.getFullYear();
    this.departmenttList()

    this.thisYear = new Date().getFullYear()
    for (let firstYear = 2019; firstYear <= this.thisYear; firstYear++) {
      this.years.push(firstYear)
    }
    this.thisYear = new Date().getFullYear()
    for (let firstYear = 2019; firstYear <= this.thisYear; firstYear++) {
      this.listYears.push(firstYear)
    }
  }
  departmenttList() {
    this.departmentService.getList().subscribe((res: any) => {
      this.departments = res.data
    })
  }
  allEmployeeReport() {
    this.reportService.getAllFile(this.allEmployeeForm.value).subscribe((res: any) => {
      let newBlob = new Blob([res], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }
      let data = window.URL.createObjectURL(newBlob);
      let link = document.createElement("a");
      link.href = data;
      link.download = `كل الموظفين`;
      link.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );
      setTimeout(function () {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
      this.toastr.success("تم تحميل الملف بنجاح");
    }, err => {
      this.toastr.error("لم يتم تحميل الملف");
    })

  }
  assignEmployeeReport() {
    this.reportService.getAssignmentsFile(this.assignEmployeeForm.value).subscribe((res: any) => {
      let newBlob = new Blob([res], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }
      let data = window.URL.createObjectURL(newBlob);
      let link = document.createElement("a");
      link.href = data;
      link.download = `الدائمين`;
      link.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );
      setTimeout(function () {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
      this.toastr.success("تم تحميل الملف بنجاح");
    }, err => {
      this.toastr.error("لم يتم تحميل الملف");
    })
  }
  contractEmployeeReport() {
    this.reportService.getContractsFile(this.contractEmployeeForm.value).subscribe((res: any) => {
      let newBlob = new Blob([res], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }
      let data = window.URL.createObjectURL(newBlob);
      let link = document.createElement("a");
      link.href = data;
      link.download = `العقود`;
      link.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );
      setTimeout(function () {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
      this.toastr.success("تم تحميل الملف بنجاح");
    }, err => {
      this.toastr.error("لم يتم تحميل الملف");
    })
  }
  undifinedEmployeeReport() {
    this.reportService.getUndefinedFile(this.undifinedEmployeeForm.value).subscribe((res: any) => {
      let newBlob = new Blob([res], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }
      let data = window.URL.createObjectURL(newBlob);
      let link = document.createElement("a");
      link.href = data;
      link.download = `غير المسجلين`;
      link.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );
      setTimeout(function () {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
      this.toastr.success("تم تحميل الملف بنجاح");
    }, err => {
      this.toastr.error("لم يتم تحميل الملف");
    })
  }

  search(jobNumber, year, month, content) {
    this.loadingGetEmployee = true;
    this.loadingTextGetEmployee = "جاري البحث";
    this.auth.searchEmployeeInfo(jobNumber, year, month).subscribe(
      (res: any) => {
        this.employeeInfo = res.data
        this.loadingGetEmployee = false;
        this.modalService
          .open(content, {
            ariaLabelledBy: "modal-basic-title ",
          })
          .result.then(
            (result) => { },
            (reason) => { }
          );
      },
      (err: any) => {
        this.loadingGetEmployee = false;
        this.toastr.error("لا توجد بيانات");
      }
    );
  }
}
