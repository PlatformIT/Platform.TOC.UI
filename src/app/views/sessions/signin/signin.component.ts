import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouteConfigLoadStart, ResolveStart, RouteConfigLoadEnd, ResolveEnd } from '@angular/router';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    animations: [SharedAnimations]
})
export class SigninComponent implements OnInit {
    loading: boolean;
    loadingText: string;
    signinForm: FormGroup;
    errorMessage: boolean;
    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router,
        private store: LocalStoreService,
        private navigationService: NavigationService
    ) { }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
                this.loadingText = 'جاري تحميل الصفحة';

                this.loading = true;
            }
            if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
                this.loading = false;
            }
        });

        this.signinForm = this.fb.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    signin() {
        this.errorMessage = false
        this.loading = true;
        this.loadingText = 'جاري تسجيل الدخول';
        this.auth.signin(this.signinForm.value)
            .subscribe((res:any) => {
                console.log(res);
                this.store.setItem("token", res.token)
                this.store.setItem("roles", res.roles.toString())
                if(res.roles == "admin"){
                    this.router.navigateByUrl('/dashboard/uploadfile');
                }else if(res.roles == "contract" || res.roles == "assignment"){
                    this.router.navigateByUrl('/dashboard/getByMonth');
                }
                this.navigationService.createMenu();
                
                this.store.setItem("isActive", true)
                this.loading = false;
            }, err => {

        this.errorMessage = true
        this.loading = false
            });
    }

}
