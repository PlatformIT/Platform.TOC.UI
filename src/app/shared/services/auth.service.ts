import { environment } from "./../../../environments/environment";
import { Injectable } from "@angular/core";
import { LocalStoreService } from "./local-store.service";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  //Only for demo purpose
  authenticated = true;
  baseUrl = environment.baseUrl;
  constructor(
    private store: LocalStoreService,
    private router: Router,
    private http: HttpClient
  ) {
    this.checkAuth();
  }

  checkAuth() { }

  getuser() {
    return of({});
  }

  signin(credentials) {
    return this.http.post(
      this.baseUrl + "/api/auth/token",
      credentials
    );
  }

  signout() {
    this.authenticated = false;
    this.store.clear();
    this.router.navigateByUrl("/sessions/signin");
    // location.reload();
  }

  searchEmployeeInfo(number, year, month) {
    return this.http.get(this.baseUrl + `/api/employee/get?employeeId=${number}&month=${month}&year=${year}`)
  }
}
