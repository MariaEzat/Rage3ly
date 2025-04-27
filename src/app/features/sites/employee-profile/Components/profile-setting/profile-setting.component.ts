import { Component } from '@angular/core';
import { profileSettingViewModel } from '../../Interface/profile';
import { CRUDCreatePage } from 'src/app/shared/classes/crud-create.model';
import { ControlType } from 'src/app/shared/models/enum/control-type.enum';
import { environment } from 'src/environments/environment';
import { Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { ApiService } from 'src/app/shared/service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/service/shared.service';
import { EmployeeProfileService } from '../../Service/employee-profile.service';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.css']
})
export class ProfileSettingComponent {
  page: CRUDCreatePage = new CRUDCreatePage();
  item: profileSettingViewModel = new profileSettingViewModel();
  isEqualPassword: boolean = true;
  id: string;
  controlType = ControlType;
  environment = environment;
  image: { uploaded: boolean, src: string, error?: string } = { uploaded: false, src: '', error: '' };

  clientId: string;
  customerActivity = [
    { id: 1, name: 'CarWash' },
    { id: 2, name: 'ServiceStation' },
    { id: 3, name: 'GasStation' },
    { id: 4, name: 'Trader' },

  ]
  genderOptions = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' }
  ];



  constructor(private _router: Router, private _employeeProfile: EmployeeProfileService, private _sharedService: SharedService,
    private _apiService: ApiService, private _activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.getClientIdFromToken();
    this.page.isPageLoaded = false;
    this._activatedRoute.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.id = params.get('id'); // Assign clientId from route or other source
      } else {
        console.error('Client ID is not available.');
      }
    });
    this.getEditableItem();
  }
  getClientIdFromToken() {
    const token = localStorage.getItem('eToken'); // Assuming the token is stored in localStorage
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token); // Decode the token
        this.clientId = decodedToken.ID;
      } catch (error) {
      }
    } else {
    }
  }

  createForm() {
    this.page.form = this._sharedService.formBuilder.group({
      name: [this.item.name, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      mobile: [this.item.mobile, [Validators.required, Validators.pattern(/^(010|011|012|015)\d{8}$/)]],
      email: [this.item.email],

    });
    this.page.isPageLoaded = true;
  }

  getEditableItem() {
    this._employeeProfile.getClientById(this.clientId).subscribe({
      next: (res) => {
        console.log(res)
        if (res.isSuccess) {
          this.item = res.data;
          this.item.id = this.id;
          this.createForm();


          this.image = {
            uploaded: !!this.item.path,
            src: this.item.path,
            error: ''
          };



          this.page.isPageLoaded = true;
        }
      },
      error: (err) => {
        this._sharedService.showToastr(err);
        this.page.isPageLoaded = true;
      }
    });
  }

  Save() {
    if (this.page.isSaving || this.page.form.invalid) return;

    this.page.isSaving = true;
    Object.assign(this.item, this.page.form.value);
    this.item.path = this.image.uploaded ? this.image.src : '';
    this.item.id = this.clientId;


    this.item.id = this.clientId;
    console.log(this.item)
    this._employeeProfile.profileSetting(this.item).subscribe({
      next: (res) => {
        this.page.isSaving = false;
        this.page.responseViewModel = res;
        this._sharedService.showToastr(res);
        if (res.isSuccess) {
          this._router.navigate(['/sites/employeeProfile']);
        }
      },
      error: (err) => {
        this._sharedService.showToastr(err);
        this.page.isSaving = false;
      },
    });
  }

  onCancel(): void {
    this._router.navigate(['/sites/employeeProfile']);
  }
  getImageUrl(imagePath: string): string {
    return `${environment.api}/` + imagePath;
  }

  onImageUpload(files, index: number): void {
    if (files.length === 0) {
      return;
    }

    const file = <File>files[0];
    const formData = new FormData();
    formData.append('Files', file, file.name);  // Use 'Files' as the field name if required by backend
    console.log(formData);

    // Call the service to upload the image, passing the FormData directly
    this._employeeProfile.uploadImage(formData).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          console.log(res);
          //this.images[index] = { uploaded: true, src: res.data.path[index] };
          this.image = { uploaded: true, src: res.data.path[0] };

          this._sharedService.showToastr(res);
        }
      },
      error: (err) => {
        this._sharedService.showToastr(err);
      },
    });
  }

  getUploadedImages() {
    return this.image.uploaded ? this.image.src : '';
  }
  
  replaceImage(): void {
    this.image = { uploaded: false, src: '', error: '' };
  }
  

}
