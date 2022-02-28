import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { LocalStoreService } from "./local-store.service";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private store: LocalStoreService,
    private authService: AuthService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var token = this.store.getItem("token");
    const req = request.clone({
      headers: request.headers.set("Authorization", "Bearer " + token),
    });
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (req.url.endsWith("Auth/token")) {
          // Password invalid case
          return throwError(error);
        }
        //error.status == 401
        if (error.status == 401) {
          // if token exp or invalid get new token from refresh token or login again
        //   this.router.navigateByUrl("account/login");
        } else if (error.status == 403) {
          this.router.navigateByUrl("others/error/403");
        }
        return throwError(error);
      })
    );
  }
}
