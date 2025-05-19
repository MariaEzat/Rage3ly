import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/service/shared.service';
import { MobileService } from '../../service/mobile.service';
import { CRUDCreatePage } from 'src/app/shared/classes/crud-create.model';
import {
  mobileCreateViewModel
} from '../../interfaces/mobile-view-model';
import { Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit, OnDestroy {
  page: CRUDCreatePage = new CRUDCreatePage();
  item: mobileCreateViewModel = new mobileCreateViewModel();
  id: string;
  isActivated: boolean = false;
  images = [{ uploaded: false, src: null }, { uploaded: false, src: null }];

  environment = environment;
  Brandslist: [] = [];
  clientId: string = "";

  constructor(
    private _sharedService: SharedService,
    private _mobileService: MobileService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.page.isPageLoaded = false;
    this.onSelectBrand();

   

    this._activatedRoute.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.page.isEdit = true;
      }

      if (params.has('clientId')) {
        this.clientId = params.get('clientId');
      }

      if (this.page.isEdit) {
        this.getEditableItem();
      } else {
        this.createForm();
      }
    });
  }


  getEditableItem() {
    this._mobileService.getById(this.id).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          console.log(res.data)
          this.item = res.data;
          this.item.id = this.id;
          this.item.paths = res.data.media?.map((m) => m.path) || [];

          
          this.images = [];

          for (let i = 0; i < 2; i++) {
            const path = this.item.paths[i];
            this.images.push({
              uploaded: !!path,
              src: path || null
            });
          }
          this.createForm();
          this.page.isPageLoaded = true;
        }
      },
      error: (err) => {
        console.error('Error fetching data:', err);
        this.page.isPageLoaded = true;
      },
    });
  }
  createForm() {
    this.page.form = this._sharedService.formBuilder.group({
      imeI1: [this.item.imeI1, [Validators.required, Validators.pattern(/^\d{15}$/)]],
      imeI2: [this.item.imeI2, [Validators.required, Validators.pattern(/^\d{15}$/)]],
      mobileModel: [this.item.mobileModel, Validators.required],
      number: [this.item.number, [Validators.required, Validators.pattern(/^(010|011|012|015)\d{8}$/)]],
      serialNumber: [this.item.serialNumber,[Validators.required,Validators.minLength(5)] ],
      brandId: [this.item.brandId, Validators.required],
      dateOfPurchase: [this.item.dateOfPurchase, Validators.required],
      paths: [this.item.paths],
    });
    this.page.isPageLoaded = true;
  }

  Save() {
    if (this.page.isSaving || this.page.form.invalid) return;
    this.page.isSaving = true;
    Object.assign(this.item, this.page.form.value);
    this.item.paths = this.getUploadedImages();
    this.item.paths = this.images.filter((image) => image.uploaded).map((image) => image.src);
    if (!this.page.isEdit) {
      this.item.clientId = this.clientId;
    }


    this._mobileService.postOrUpdate(this.item).subscribe({
      next: (res) => {
        this.page.isSaving = false;
        this.page.responseViewModel = res;
        this._sharedService.showToastr(res);
        if (res.isSuccess) {
          this._router.navigate(['/sites/mobile']);
        }
      },
      error: (err) => {
        this._sharedService.showToastr(err);
        this.page.isSaving = false;
      },
    });
  }

  
 
  onCancel(): void {
    this._router.navigate(['/sites/mobile']);
  }

  onReset() {
    this.page.form.reset();
    this.isActivated = false;
  }

  onSelectBrand() {
    forkJoin([this._mobileService.getBrands()]).subscribe((res) => {
      const BrandResponse = res[0];
      if (BrandResponse.isSuccess) {
        this.Brandslist = BrandResponse.data;
        this.createForm();
      }
    });
  }
  ngOnDestroy(): void { }

  onImageUpload(files, index: number): void {
    if (files.length === 0) {
      return;
    }

    const file = <File>files[0];
    const formData = new FormData();
    formData.append('Files', file, file.name);

    this._mobileService.uploadImage(formData).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          // this.images[index] = { uploaded: true, src: res.data.path[index] };
          this.images[index] = { uploaded: true, src: res.data.path[0] };

          this._sharedService.showToastr(res);
        }
      },
      error: (err) => {
        this._sharedService.showToastr(err);
      },
    });
  }

  replaceImage(index: number): void {
    this.images[index] = { src: '', uploaded: false };
  }

  addNewPhone() {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate([`/sites/mobile/create/${this.clientId}`]);
    });
  }
  addImageBox() {
    this.images.push({ uploaded: false, src: null });
  }

  getUploadedImages() {
    return this.images.filter(image => image.uploaded).map(image => image.src);
  }


  numberOnly(event: any) {
    return this._sharedService.numberOnly(event);
  }


}