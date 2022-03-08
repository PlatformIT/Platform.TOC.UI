import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  users: any = [];
  user:any;
  confirmResut: string;
  loading: boolean;
  title: string;
  typeMethod: any;
  start: any = 0;
  take: any = 10;
  constructor( private userService: UserService,
   private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.get();
    this.buildFormBasic();
  }

  buildFormBasic() {
    this.userForm = this.fb.group({
      fullname: null,
      userName: null,
      password: null,
      roles: null,
    });
  }
  get() {
    let data = { 
      start: this.start,
      take: this.take
    }
    
    this.userService.get(data).subscribe((res: any) => {
      this.users = res.data;
      console.log('====================================');
      console.log(this.users);
      console.log('====================================');
    });
  }
  open(content, type, element?) {
    // this.clientStatstics = {};
    this.userForm.reset();
    this.typeMethod = type;
    if (type == 1) {
      this.title = "  اضافة مستخدم";
    }
    if (type == 2) {
      this.user = element;
      this.title = " تعديل مستخدم";
      this.userForm.setValue({
        fullname: element.fullname,
        userName: element.userName,
        password: null,
        roles: element.roles,
      })
    }
    
    this.modalService
      .open(content, {
        ariaLabelledBy: "modal-basic-title ",
      })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }
  confirm(content, element) {
    this.user = element;
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
  onSubmit() {
    this.loading = true;
    if (this.typeMethod == 1) {
      this.userService.add(this.userForm.value).subscribe(
        (res: any) => {
          this.toastr.success("تمت الاضافة بنجاح");
          this.get();
          this.modalService.dismissAll();
          this.loading = false;
        },
        (err) => {
          this.toastr.error("عذرا هناك خطأ ما");
          this.loading = false;
        }
      );
    } else {
      console.log(this.user);
      
      this.userService.update(this.userForm.value,this.user.id).subscribe(
        (res: any) => {
          console.log("res", res);
          
          this.toastr.success("تم التعديل بنجاح");
          this.get();
          this.modalService.dismissAll();
          this.loading = false;
        },
        (err) => {
          console.log(err);
          
          this.toastr.error("عذرا هناك خطأ ما");
          this.loading = false;
        }
      );
    }
  }
  delete() {
    this.loading = true;
    this.userService.delete(this.user.id).subscribe(
      (res: any) => {
        this.toastr.success("تم الحذف");
        this.get();
        this.modalService.dismissAll();
        this.loading = false;
      },
      (err) => {
        this.toastr.error("عذرا هناك خطأ ما");
        this.loading = false;
      }
    );
  }
}
