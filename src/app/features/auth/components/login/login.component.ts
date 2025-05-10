import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

import { FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from 'src/app/features/auth/service/authservice.service'; // Adjust the path as necessary
import { LoginViewModel } from 'src/app/features/auth/interfaces/authviewmodel';
import { SharedService } from 'src/app/shared/service/shared.service';
import { ControlType } from 'src/app/shared/models/enum/control-type.enum';
import { Router } from '@angular/router';
import { NgControlComponent } from "../../../../shared/components/ng-control/ng-control.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitting = false;
  controlType = ControlType;
  constructor(
    private authService: AuthserviceService,
    private _sharedService: SharedService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(): void {
    this.loginForm = this._sharedService.formBuilder.group({
      mobile: ['', [Validators.required,Validators.pattern(/(^((010|011|012|015)\d{8})$)|(^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$)/)]],
      password: ['', Validators.required],
    });
  }
  // onSubmit(): void {
  //   if (!this.loginForm.valid ||this.isSubmitting) return;
  //   this.isSubmitting=true;
  //   const loginData: LoginViewModel = this.loginForm.value;
  //   this.authService.setLogin(loginData).subscribe({
  //     next: (response) => {
  //       this._sharedService.showToastr(response);
  //          this.isSubmitting=false

  //       localStorage.setItem('token', response.data.token);
  //       this._router.navigate(['/sites/company'], {
  //         queryParams: { source: 'login'},
  //       });

  //       this.isSubmitting=false
  //     },
  //     error: (error) => {
  //       this._sharedService.showToastr(error);
  //       this.isSubmitting=false
  //     },
  //   });
  // }
  // onSubmit(): void {
  //   if (!this.loginForm.valid || this.isSubmitting) return;
  //   this.isSubmitting = true;

  //   const loginData: LoginViewModel = this.loginForm.value;

  //   this.authService.setLogin(loginData).subscribe({
  //     next: (response) => {

  //       this._sharedService.showToastr(response);

  //       this.isSubmitting = false;

  //       const token = response.data.token;
  //       localStorage.setItem('eToken', token);

  //       const decodedToken: any = jwtDecode(token);
  //       const roleId = decodedToken.RoleID;

  //       localStorage.setItem('roleId', roleId);


  //       if (roleId == 'Admin' || 'SuperAdmin') {
  //         this._sharedService.showToastr(response);

  //         this._router.navigate(['/sites/customers'], {
  //           queryParams: { source: 'login' },

  //         });
  //       } else {
  //         this._router.navigate(['/**'])

  //       }

  //     },
  //     error: (error) => {
  //       this._sharedService.showToastr(error);
  //       this.isSubmitting = false;
  //     },
  //   });
  // }
  onSubmit(): void {
    if (!this.loginForm.valid || this.isSubmitting) return;
    this.isSubmitting = true;
  
    const loginData: LoginViewModel = this.loginForm.value;
  
    this.authService.setLogin(loginData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
  
        const token = response.data?.token;
        if (!token) {
          this._sharedService.showToastr(response);
          return;
        }
  
        localStorage.setItem('eToken', token);
  
        const decodedToken: any = jwtDecode(token);
        const roleId = decodedToken?.RoleID;
        localStorage.setItem('roleId', roleId);
  
        if (roleId === 'Admin' || roleId === 'SuperAdmin') {
          this._sharedService.showToastr(response);

          this._router.navigate(['/sites/dashboard'], {
            queryParams: { source: 'login' },
          });
        } else {
          this._router.navigate(['/**']);
        }
      },
      error: (error) => {
        this.isSubmitting = false;
  
        // ✅ استخراج رسالة الخطأ بشكل آمن
        const message =
          error?.error?.message || 'حدث خطأ أثناء تسجيل الدخول';
  
        this._sharedService.showToastr(error);
      },
    });
  }
  


  numberOnly(event: any) {
    return this._sharedService.numberOnly(event);
  }
}
