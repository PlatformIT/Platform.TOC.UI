import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { LocalStoreService } from "./local-store.service";

@Injectable({
  providedIn: "root",
})
export class AuthGaurd implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService,
    private store: LocalStoreService
  ) {}

  canActivate(): boolean {
    this.auth.authenticated;
    if (this.store.getItem("isActive")) {
      return true;
    } else {
      this.router.navigateByUrl("/accounts/login");
      return false;
    }
  }

  // canActivate() {
  //   if (this.auth.authenticated) {
  //     return true;
  //   } else {
  //     this.router.navigateByUrl('/sessions/signin');
  //   }
  // }
}
