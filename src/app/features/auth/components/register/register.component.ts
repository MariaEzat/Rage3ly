import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from 'src/app/features/auth/service/authservice.service';
import { RegisterViewModel } from 'src/app/features/auth/interfaces/authviewmodel';
import { SharedService } from 'src/app/shared/service/shared.service';
import { CityService } from 'src/app/features/sites/city/service/city.service';
import { CompanyService } from 'src/app/features/sites/company/service/company.service';
import { governorateSelectedItem } from 'src/app/features/sites/city/interfaces/city';
import { Router } from '@angular/router';
import { ControlType } from 'src/app/shared/models/enum/control-type.enum';
import { environment } from 'src/environments/environment';

import * as L from 'leaflet';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  map: L.Map;
  marker: L.Marker;
  governorates: governorateSelectedItem[] = [];
  isEqualPassword: boolean = true;
  isSubmitting: boolean = false;
  images = [{ uploaded: false, src: null }];
  item: RegisterViewModel;
  controlType = ControlType;
  environment = environment;
  genderOptions = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
  ];
  customerActivity = [
    { id: 1, name: 'CarWash' },
    { id: 2, name: 'ServiceStation' },
    { id: 3, name: 'GasStation' },
    { id: 4, name: 'Trader' },

  ];

  cities: { value: number; label: string }[] = [];

  constructor(
    private authService: AuthserviceService,
    private _sharedService: SharedService,
    private _cityService: CityService,
    private _companyService: CompanyService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  
  }



initializeForm(): void {
  this.registerForm = this._sharedService.formBuilder.group({
    nationalNumber: ['', [Validators.pattern(/^\d{14}$/)]],
    name: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    mobile: ['', [Validators.required, Validators.pattern(/^(010|011|012|015)\d{8}$/)]],
    email: ['', [ Validators.email,Validators.required]],
  });
}


confirmPassword(): void {
  const password = this.registerForm.get('password')?.value;
  const confirmPassword = this.registerForm.get('confirmPassword')?.value;

  if(password !== confirmPassword) {
  this.isEqualPassword = false;
} else {
  this.isEqualPassword = true;
}
  }

onSubmit(): void {
  if(!this.registerForm.valid|| this.isSubmitting) return;
  this.isSubmitting = true;

  const registerData: RegisterViewModel = this.registerForm.value;
 // registerData.paths = this.getUploadedImages();
  this.authService.setRegister(registerData).subscribe({
    next: (response) => {
      this._sharedService.showToastr(response);

      if (response.data != null) {
        localStorage.setItem('token', response.data.otPtoken);
        this._router.navigate(['/auth/otp'], {
          queryParams: { source: 'register' },
        });
        this.isSubmitting = false;
      }

    },
    error: (error) => {
     
      this._sharedService.showToastr(error);
      this.isSubmitting = false;
    },
  });
}

numberOnly(event: any) {
  return this._sharedService.numberOnly(event);
}

// onImageUpload(files, index: number): void {
//   if(files.length === 0) {
//   return;
// }
// const file = <File>files[0];
// const formData = new FormData();
// formData.append('Files', file, file.name);  // Use 'Files' as the field name if required by backend
// console.log(formData);
// // Call the service to upload the image, passing the FormData directly
// this.authService.uploadImage(formData).subscribe({
//   next: (res) => {
//     if (res.isSuccess) {
//       console.log(res);
//       //this.images[index] = { uploaded: true, src: res.data.path[index] };
//       this.images[index] = { uploaded: true, src: res.data.path[index] };

//       this._sharedService.showToastr(res);
//     }
//   },
//   error: (err) => {
//     this._sharedService.showToastr(err);
//   },
// });
//   }
// getUploadedImages() {
//   return this.images.filter(image => image.uploaded).map(image => image.src);
// }
// isImageUploaded(): boolean {
//   return this.images.some(image => image.uploaded); // Returns true if at least one image is uploaded
// }

}
