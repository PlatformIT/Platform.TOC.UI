import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UploadFileService } from "src/app/shared/services/upload-file.service";
declare var window: any;
@Component({
  selector: "app-get-by-month",
  templateUrl: "./get-by-month.component.html",
  styleUrls: ["./get-by-month.component.scss"],
})
export class GetByMonthComponent implements OnInit {
  searchForm: FormGroup;
  employees: any = [];
  asignEmployees: any = [];
  contractEmployees: any = [];
  data: any = {}
  roles: string;

  listYears: number[] = [];
  thisYear: number;
  constructor(
    private fb: FormBuilder,
    private uploadFileService: UploadFileService
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      month: ["", Validators.required],
      year: ["", Validators.required],
      departmentCode: [""]
    });
    this.roles = localStorage.getItem("roles").replace(/"/g, '')



    this.thisYear = new Date().getFullYear()
    for (let firstYear = 2019; firstYear <= this.thisYear; firstYear++) {
      this.listYears.push(firstYear)
    }

  }
  search() {
    this.employees = [];
    this.uploadFileService
      .getBymonth(this.searchForm.value)
      .subscribe((res: any) => {
        console.log(res);
        this.employees = res.data;
        this.asignEmployees = this.employees.filter(employee => employee.type == 1)
        this.contractEmployees = this.employees.filter(employee => employee.type == 2)
      });
  }
  getAssignments() {
    this.uploadFileService.getAssignmentsFile(this.searchForm.value).subscribe(
      (res: any) => {
        let newBlob = new Blob([res], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }
        let data = window.URL.createObjectURL(newBlob);
        let link = document.createElement("a");
        link.href = data;
        link.download = `الدائمين.xlsx`;
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
      },
      (err: any) => { }
    );
  }
  getContracts() {
    this.uploadFileService
      .getContractsFile(this.searchForm.value)
      .subscribe(
        (res: any) => {
          let newBlob = new Blob([res], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
          }
          let data = window.URL.createObjectURL(newBlob);
          let link = document.createElement("a");
          link.href = data;
          link.download = `العقود.xlsx`;
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
        },
        (err: any) => { }
      );
  }
}
