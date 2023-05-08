import { Component, OnInit } from "@angular/core";
import { SharedAnimations } from "src/app/shared/animations/shared-animations";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../shared/services/auth.service";
import {
  Router,
  RouteConfigLoadStart,
  ResolveStart,
  RouteConfigLoadEnd,
  ResolveEnd,
} from "@angular/router";
import { LocalStoreService } from "src/app/shared/services/local-store.service";
import { NavigationService } from "src/app/shared/services/navigation.service";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
  animations: [SharedAnimations],
})
export class SigninComponent implements OnInit {
  loading: boolean;
  loadingText: string;
  signinForm: FormGroup;
  errorMessage: boolean;
  loadingGetEmployee: boolean;
  loadingTextGetEmployee: string;
  employeeInfo: any;
  lastYear: number;
  thisYear: number;
  listYears: any[] = [];
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: LocalStoreService,
    private navigationService: NavigationService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    let date = new Date();
    this.lastYear = date.getFullYear();

    this.router.events.subscribe((event) => {
      if (
        event instanceof RouteConfigLoadStart ||
        event instanceof ResolveStart
      ) {
        this.loadingText = "جاري تحميل الصفحة";

        this.loading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.loading = false;
      }


    });

    this.signinForm = this.fb.group({
      userName: ["", Validators.required],
      password: ["", Validators.required],
    });

    this.thisYear = new Date().getFullYear()
    for (let firstYear = 2019; firstYear <= this.thisYear; firstYear++) {
      this.listYears.push(firstYear)
    }
  }

  signin() {
    this.errorMessage = false;
    this.loading = true;
    this.loadingText = "جاري تسجيل الدخول";
    this.auth.signin(this.signinForm.value).subscribe(
      (res: any) => {
        console.log(res);
        this.store.setItem("token", res.token);
        this.store.setItem("roles", res.roles.toString());
        if (res.roles == "admin") {
          this.router.navigateByUrl("/dashboard/uploadfile");
        } else if (res.roles == "contract" || res.roles == "assignment") {
          this.router.navigateByUrl("/dashboard/getByMonth");
        }
        else if (res.roles == "audit") {
          this.router.navigateByUrl("/dashboard/report-check");
        }
        this.navigationService.createMenu();

        this.store.setItem("isActive", true);
        this.loading = false;
      },
      (err) => {
        this.errorMessage = true;
        this.loading = false;
      }
    );
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
