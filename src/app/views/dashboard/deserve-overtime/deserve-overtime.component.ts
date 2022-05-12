import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { isThisSecond } from "date-fns/esm";
import { ToastrService } from "ngx-toastr";
import { DeservedService } from "src/app/shared/services/deserved.service";
import { UploadFileService } from "src/app/shared/services/upload-file.service";

@Component({
  selector: "app-deserve-overtime",
  templateUrl: "./deserve-overtime.component.html",
  styleUrls: ["./deserve-overtime.component.scss"],
})
export class DeserveOvertimeComponent implements OnInit {
  hodidaysSelected: any[] = [];
  uploadFileForm: FormGroup;
  fileData: any;
  employees: any;
  nowDate = new Date(Date.now());
  blockedEployees: any = [];
  data: any = {};
  confirmResut: string;
  employeeData = {
    employeeId: "",
  };
  employeeId: any;
  resData: any;
  showSearch: boolean = true;
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private deservedService: DeservedService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.uploadFileForm = this.fb.group({
      file: ["", Validators.required],
    });
    this.getAll();
  }
  getAll() {
    this.deservedService.getAll().subscribe((res: any) => {
      this.employees = res.data;
      this.resData = res
    });
  }
  open(holidaysModel) {
    this.modalService
      .open(holidaysModel, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          console.log(result);
        },
        (reason) => {
          console.log("Err!", reason);
        }
      );
  }
  uploadFileBtn(e) {
    this.fileData = e.target.files[0];
  }

  uploadFile() {
    const fromData = new FormData();
    fromData.append("file", this.fileData);
    console.log(fromData);
    this.deservedService.uploadFile(fromData).subscribe(
      (res: any) => {
        this.toastr.success("تم رفع الملف");
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
  deleteAll() {
    this.deservedService.deleteAll().subscribe((res: any) => {
      this.toastr.success("تم حذف جميع البيانات");
      this.getAll();
    });
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
  addNewEmployee(employeeId: any) {
    this.deservedService.addDeserveEmployee(employeeId.value).subscribe(
      (res: any) => {
        this.toastr.success("تم اضافة موظف جديد");
        this.modalService.dismissAll();
        this.employeeData.employeeId = "";
        this.getAll();
      },
      (error) => {
        this.toastr.error("لم يتم الاضافة", "تأكد من البيانات المدخلة");
      }
    );
  }
  deleteEmployee(content,id) {
    this.employeeId = id;
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
  deleteOne(){
    this.deservedService.deleteDeserveEmployee(this.employeeId).subscribe((res:any) => {
      this.toastr.success("تم حذف الموظف")
      this.getAll();
    }, err => {
      this.toastr.error("لم يتم الحذف")
    })
  }
  searchEmployee(employeeId){
    this.employees = []
    this.deservedService.getEmployeeTypeById(employeeId).subscribe((res:any) => {
      res.data == null ? false : this.employees.push(res.data)
     this.resData = res
    }, err => {
      this.toastr.error("لم يتم جلب البيانات")
    })
  }
}
