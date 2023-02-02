import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { UploadFileService } from "src/app/shared/services/upload-file.service";

@Component({
  selector: "app-upload-file",
  templateUrl: "./upload-file.component.html",
  styleUrls: ["./upload-file.component.scss"],
})
export class UploadFileComponent implements OnInit {
  hodidaysSelected: any[] = [];
  uploadFileForm: FormGroup;
  fileData: any;
  employees: any;
  nowDate = new Date(Date.now());
  blockedEployees: any = [];
  data: any = {};
  listYears: number[]=[];
  thisYear: number;
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private uploadFileService: UploadFileService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.uploadFileForm = this.fb.group({
      month: [this.nowDate.getMonth() + 1, Validators.required],
      year: [this.nowDate.getFullYear(), Validators.required],
      startTime: ["07:45", Validators.required],
      endTime: ["14:20", Validators.required],
      file: ["", Validators.required],
    });


    this.thisYear = new Date().getFullYear()
    for (let firstYear = 2019; firstYear <= this.thisYear; firstYear++) {
      this.listYears.push(firstYear)
    }
    
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
  addHoliday(holiday) {
    this.hodidaysSelected.push(holiday);
  }
  deleteDayFromHoliday(i) {
    this.hodidaysSelected.splice(i, 1);
  }
  addBlockedEmployee(accountNumber) {
    this.blockedEployees.push(accountNumber);
  }

  deleteBlockedEployees(i) {
    this.blockedEployees.splice(i, 1);
  }
  uploadFileBtn(e) {
    console.log(e.target.files[0]);
    this.fileData = e.target.files[0];
  }

  uploadFile() {
    const fromData = new FormData();
    this.hodidaysSelected.forEach((day) => {
      fromData.append("Holidays", day);
    });

    if (this.data.morningOverTimeForAll) {
      fromData.append("EmployeeIds", "");
      fromData.append("MorningOverTimeForAll", this.data.morningOverTimeForAll);
    } else {
      this.blockedEployees.forEach((acoount) => {
        fromData.append("EmployeeIds", acoount);
      });
      fromData.append("MorningOverTimeForAll", this.data.morningOverTimeForAll);
    }
    fromData.append("month", this.uploadFileForm.get("month").value);
    fromData.append("year", this.uploadFileForm.get("year").value);
    fromData.append("startTime", this.uploadFileForm.get("startTime").value);
    fromData.append("endTime", this.uploadFileForm.get("endTime").value);
    fromData.append("file", this.fileData);
    console.log(fromData);
    this.uploadFileService.uploadFile(fromData).subscribe(
      (res: any) => {
        console.log(res);
        this.employees = res.data;
        this.toastr.success("تم رفع الملف");
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
