import { Component, OnDestroy, OnInit } from '@angular/core';
import { CRUDCreatePage } from 'src/app/shared/classes/crud-create.model';

import { SharedService } from 'src/app/shared/service/shared.service';

import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { adsCreateViewModel } from '../../interfaces/ads';
import { AdsService } from '../../service/ads.service';
import { Title } from 'chart.js';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {
  imageTypelist = [
    { id: 1, name: 'Right' },
    { id: 2, name: 'Left' },
    { id: 3, name: 'Top' },
    { id: 4, name: 'Bottom' }

  ];

  page: CRUDCreatePage = new CRUDCreatePage();
  item: adsCreateViewModel = new adsCreateViewModel();
  id: string;
  images = [{ uploaded: false, src: null }];
  isActivated: boolean = false;
  environment = environment
  constructor(
    private _sharedService: SharedService,
    private _AdsService: AdsService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }
  formatDateForInput(dateString: string): string {
    return new Date(dateString).toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.page.isPageLoaded = false;
    this._activatedRoute.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.page.isEdit = true;
        this.getEditableItem();
      } else {
        this.createForm();
        this.onChangeStartDate(null);
      }
    });
  }

  //Region:If Edit page
  getEditableItem() {
    this._AdsService.getById(this.id).subscribe((res) => {
      if (res.isSuccess) {
        this.item = res.data;
        this.isActivated = this.item.isActive;
        this.item.startDate = this.convertToLocalDate(this.item.startDate);
        this.item.endDate = this.convertToLocalDate(this.item.endDate);

        if (res.data.path) {
          this.images = [{ uploaded: true, src: res.data.path }];
        } else {
          this.images = [{ uploaded: false, src: null }];
        }

        this.createForm();
        this.onChangeStartDate(null);
      }
    });
  }
  getTomorrowDate(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  }



  validatePastDate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const selectedDate = new Date(control.value);
    const today = new Date();

    // Reset time parts to compare only dates
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate <= today) {
      return { pastDate: 'Please select  future date.' };
    }

    return null;
  }
  endDateValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = this.page.form?.get('startDate')?.value;
    const endDate = control.value;

    if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
      return { endDateBeforeStart: 'End date must be after start date' };
    }
    return null;
  }

  onChangeStartDate(event: any): void {
    const startDate = this.page.form?.get('startDate')?.value;
    const endDateControl = this.page.form?.get('endDate');

    if (!startDate || !endDateControl) return;

    const endDate = endDateControl.value;

    // Reset time for accurate comparison
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    if (start.getTime() === end.getTime()) {
      endDateControl.disable(); // Disable endDate field
    } else {
      endDateControl.enable();  // Enable endDate field
    }

    endDateControl.updateValueAndValidity();
  }

  parseLocalDate(date: string | Date): Date {
    if (!date) return null;

    // If it's already a Date, return as is (for edit case)
    if (date instanceof Date) return date;

    const [year, month, day] = date.split('-').map(Number);
    return new Date(year, month - 1, day, 12); // 12 ظهرًا يضمن عدم الدخول في يوم سابق
  }

  getMinEndDate(): Date {
    const startDate = this.page.form?.get('startDate')?.value;
    const minDate = startDate ? new Date(startDate) : new Date();

    // Always move +1 day to ensure even today is excluded
    minDate.setDate(minDate.getDate() + 1);
    return minDate;
  }



  createForm() {
    const tomorrow = this.getTomorrowDate();


    // tomorrow.setDate(tomorrow.getDate() + 1);

    this.page.form = this._sharedService.formBuilder.group({
      title: [this.item.title, [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      hyperlink: [this.item.hyperlink],
      startDate: [
        this.page.isEdit ? this.item.startDate : tomorrow,
        [Validators.required],
      ],

      endDate: [
        this.item.endDate,
        [
          Validators.required,
          this.endDateValidator.bind(this),
        ],
      ],
    });
    this.page.form.get('startDate')?.enable();
    this.page.isPageLoaded = true;

  }


  adjustToUTCOffset(date: Date): Date {
    const corrected = new Date(date);
    corrected.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return corrected;
  }

  Save() {
    this.page.isSaving = true;
    Object.assign(this.item, this.page.form.value);
   
    const formatDate = (input: any): string => {
      const date = input instanceof Date ? input : new Date(input);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    };

   
    const fixTimezone = (date: any): Date => {
      const [year, month, day] = formatDate(date).split('-').map(Number);
      return new Date(year, month - 1, day, 12); 
    };

   
    this.item.startDate = fixTimezone(this.page.form.get('startDate')?.value);
    this.item.endDate = fixTimezone(this.page.form.get('endDate')?.value);





    this.item.isActive = this.isActivated;
    this.item.paths = this.getUploadedImages();
    //this.item.paths = this.getUploadedImages();
    // this.item.paths = this.images
    //    .filter((image) => image.uploaded)
    //    .map((image) => image.src);
    this.item.paths = this.images.filter((image) => image.uploaded).map((image) => image.src);
    this.item.id = this.id;
    this._AdsService.postOrUpdate(this.item).subscribe({
      next: (res) => {

        this.page.isSaving = false;
        this.page.responseViewModel = res;
        this._sharedService.showToastr(res);
        if (res.isSuccess) {
          this._router.navigate(['/sites/ads']);
        }
      },
      error: () => {
        this.page.isSaving = false;
      },
    });
  }

  ngOnDestroy(): void { }
  convertToLocalDate(dateStr: string | Date): Date {
    if (!dateStr) return null;

    if (dateStr instanceof Date) return dateStr;

    const parts = dateStr.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // JS months are 0-based
    const day = parseInt(parts[2], 10);

    // Create date at noon to avoid timezone offset
    return new Date(year, month, day, 12, 0, 0);
  }

  onImageUpload(files, index: number): void {
    if (files.length === 0) {
      return;
    }

    const file = <File>files[0];
    const formData = new FormData();
    formData.append('Files', file, file.name);  // Use 'Files' as the field name if required by backend

    // Call the service to upload the image, passing the FormData directly
    this._AdsService.uploadImage(formData).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          //this.images[index] = { uploaded: true, src: res.data.path[index] };
          this.images[index] = { uploaded: true, src: res.data.path[index] };

          this._sharedService.showToastr(res);
        }
      },
      error: (err) => {
        this._sharedService.showToastr(err);
      },
    });
  }

  getUploadedImages() {
    return this.images.filter(image => image.uploaded).map(image => image.src);
  }


  validateImages(): boolean {
    return this.images.some(image => image.uploaded);
  }

  replaceImage(index: number) {
    this.images[index] = { uploaded: false, src: null };
  }

}
