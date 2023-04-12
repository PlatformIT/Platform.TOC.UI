import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/shared/services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  basicModalCloseResult: string;
  modelTitle: string = "";
  stafTypeForm: FormGroup;
  resData: any;

  currentPage = 0;

  pagination: any = {
    pageNo: 0,
    pageSize: 10,
  };
  filterData: any = {
    stafTypename: "",
    fullname: "",
  };
  filterForm: FormGroup;
  modelType: number;
  stafType: any;
  departments: any[] = [];

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private toastr: ToastrService
  ) {
    this.filterForm = this.fb.group({
      stafTypename: "",
      fullname: "",
    });
  }

  ngOnInit(): void {
    this.buildstafTypeForm();
    this.getAll();
    this.getList()
  }

  // ui functions
  buildstafTypeForm(i?: any) {
    this.stafTypeForm = this.fb.group({
      code: [i?.code, [Validators.required]],
      name: [i?.name, [Validators.required]],
      parent: [i?.parent],
    });
  }
  openStafTypeModal(
    content: TemplateRef<any>,
    modelType: number,
    stafType?: any
  ) {
    this.getList()
    this.buildstafTypeForm();
    this.modelType = modelType;
    if (modelType == 1) {
      this.modelTitle = "اضافة";
    } else if (modelType == 2) {
      this.modelTitle = "تعديل";
      this.stafType = stafType;

      // this.departmentService.getById(this.stafType.id).subscribe((res: any) => {
      this.buildstafTypeForm(stafType);
      // });
    }
    this.modalService
      .open(content, {})
      .result.then((result) => {
        this.basicModalCloseResult = "Modal closed" + result;
      })
      .catch((res) => { });
  }
  openConfirmModal(content: TemplateRef<any>, stafType: any) {
    this.stafType = stafType;
    this.modalService
      .open(content, { centered: true, size: "sm" })
      .result.then((result) => {
        console.log("Modal closed" + result);
      })
      .catch((res) => { });
  }

  // api functions
  saveStafType() {
    if (this.modelType == 1) {
      this.departmentService.add(this.stafTypeForm.value).subscribe(
        (res: any) => {
          this.toastr.success("تمت الاضافة");
          this.getAll();
          this.modalService.dismissAll();
          this.buildstafTypeForm();
        },
        (err) => {
          this.toastr.error("لم تتم الاضافة");
        }
      );
    } else {
      this.departmentService
        .update(this.stafType.id, this.stafTypeForm.value)
        .subscribe(
          (res: any) => {
            this.toastr.success("تم التعديل");
            this.getAll();
            this.modalService.dismissAll();
          },
          (err) => {
            this.toastr.error("لم يتم التعديل");
          }
        );
    }
  }

  getAll() {
    const paginationQuery: any = {
      pageNo: this.pagination.pageNo,
      pageSize: this.pagination.pageSize,
    };
    this.departmentService.get(paginationQuery).subscribe((res: any) => {
      this.resData = res;
    });
  }
  getList() {
    this.departmentService.getList().subscribe((res: any) => {
      this.departments = res.data
    })
  }
  getById(id: any) { }

  delete() {
    this.departmentService.delete(this.stafType.id).subscribe(
      (res: any) => {
        this.toastr.success("تم الحذف");
        this.modalService.dismissAll();
        this.getAll();
      },
      (err) => {
        this.toastr.error("لم يتم الحذف");
      }
    );
  }
  pageChange() {
    this.pagination.pageNo = (this.currentPage * 10) - 10;
    this.getAll();
  }

  filter() {
    // this.filterData = {
    //   stafTypename: this.filterForm.get("stafTypename")?.value,
    //   fullname: this.filterForm.get("fullname")?.value,
    // };
    // this.getAll();
  }
}
