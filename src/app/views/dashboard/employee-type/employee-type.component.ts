import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { EmployeeTypeService } from "src/app/shared/services/employee-type.service";
import { UploadFileService } from "src/app/shared/services/upload-file.service";

@Component({
  selector: "app-employee-type",
  templateUrl: "./employee-type.component.html",
  styleUrls: ["./employee-type.component.scss"],
})
export class EmployeeTypeComponent implements OnInit {
  confirmResut: string;
  page = 1;
  pageSize = 10;
  uploadFileForm: FormGroup;
  fileData: any;
  uploadedFiles: any;
  employees: any;
  resData: any;
  employeeId: any;
  showSearch: boolean = true;
  addEmployeeTypeForm: FormGroup;
  updateEmployeeTypeForm: FormGroup;
  employee: any;
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private uploadFileService: UploadFileService,
    private employeeTypeService: EmployeeTypeService
  ) { }

  ngOnInit(): void {
    this.uploadFileForm = this.fb.group({
      file: ["", Validators.required],
      employeeTypeSelected: [1],
    });
    this.getAll();
    this.buildAddEmployeeTypeForm()
  }
  getAll() {
    this.uploadFileService.getEmployeeType(this.page * 10 - 10).subscribe((res: any) => {
      this.uploadedFiles = res.data;
      this.employees = res.data;
      this.resData = res
    });
  }
  uploadFileBtn(e) {
    this.fileData = e.target.files[0];
  }
  uploadFile() {
    const fromData = new FormData();
    fromData.append("file", this.fileData);
    var employeeTypeSelected = this.uploadFileForm.get(
      "employeeTypeSelected"
    ).value;
    if (employeeTypeSelected == 1) {
      this.uploadFileService.addAssignmentType(fromData).subscribe(
        (res: any) => {
          this.toastr.success("تم رفع الملف");
          this.uploadFileForm.reset()
          this.getAll();
        },
        (err: any) => {
          if (err.error.errorCode == 1) {
            this.toastr.error("مرفوع فايل مسبقاً", "لم يتم رفع الملف");
          } else {
            this.toastr.error("لم يتم رفع الملف", err.error.message);
          }
        }
      );
    } else if (employeeTypeSelected == 2) {
      this.uploadFileService.addContractType(fromData).subscribe(
        (res: any) => {
          this.toastr.success("تم رفع الملف");
          this.uploadFileForm.reset()
          this.getAll();
        },
        (err: any) => {
          if (err.error.errorCode == 1) {
            this.toastr.error("مرفوع فايل مسبقاً", "لم يتم رفع الملف");
          } else {
            this.toastr.error("لم يتم رفع الملف", err.error.message);
          }
        }
      );
    }
  }
  confirm(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {
          this.confirmResut = `Closed with: ${result}`;
        },
        (reason) => {
          this.confirmResut = `Dismissed with: ${reason}`;
        }
      );
  }
  confirmDeleteEmployeef(confirmDeleteEmployee, employeeid) {
    this.employeeId = employeeid;
    this.modalService
      .open(confirmDeleteEmployee, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {
          this.confirmResut = `Closed with: ${result}`;
        },
        (reason) => {
          this.confirmResut = `Dismissed with: ${reason}`;
        }
      );
  }
  deleteAll() {
    this.uploadFileService.deleteEmployeeType().subscribe((res: any) => {
      this.toastr.success("تم حذف جميع البيانات")
      this.getAll();
    })
  }
  searchEmployee(employeeId) {
    this.employees = []
    this.uploadFileService.getEmployeeTypeById(employeeId).subscribe((res: any) => {
      res.data == null ? false : this.employees.push(res.data)
      this.resData = res
    }, err => {
      this.toastr.error("لم يتم جلب البيانات")
    })
  }
  deleteEmployee() {
    this.uploadFileService.deleteEmployee(this.employeeId).subscribe((res: any) => {
      this.toastr.success("تم حذف البيانات")
      this.getAll()
    }, err => {
      this.toastr.error("لم يتم الحذف")
    })
  }
  buildAddEmployeeTypeForm() {
    this.addEmployeeTypeForm = this.fb.group({
      "employeeId": [],
      "type": []
    })

    this.updateEmployeeTypeForm = this.fb.group({
      typeEnum: []
    })
  }
  addEmployeeType() {
    this.employeeTypeService.addEmployeeType(this.addEmployeeTypeForm.value).subscribe((res: any) => {
      this.toastr.success("تمت الاضافة")
      this.modalService.dismissAll()
      this.getAll()
    }, err => {
      this.toastr.error("لم تتم الاضافة")
    })
  }
  updateModal(content, employee) {
    this.employee = employee
    this.updateEmployeeTypeForm.get('typeEnum').setValue(employee?.type)
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {
          this.confirmResut = `Closed with: ${result}`;
        },
        (reason) => {
          this.confirmResut = `Dismissed with: ${reason}`;
        }
      );
  }
  updateEmployeeType() {
    this.employeeTypeService.updateEmployeeType(this.employee.id, this.updateEmployeeTypeForm.get('typeEnum').value).subscribe((res: any) => {
      this.toastr.success("تم التعديل")
      this.modalService.dismissAll()
      this.getAll()
    }, err => {
      this.toastr.error("لم تتم الاضافة")
    })
  }
}
