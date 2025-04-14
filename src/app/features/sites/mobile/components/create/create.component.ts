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
import { TabEnum } from '../../interfaces/tab_enum';
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
  images = [{ uploaded: false, src: null }];
  environment = environment;
  Brandslist: [] = [];
  clientId: string = "";
  selectedTab: TabEnum = TabEnum.UserLogin;
  TabEnum = TabEnum;
  // Tabs = [
  //   {
  //     ID: 1,
  //     name: 'User Login',
  //     icon: '/assets/icons/vector.svg',
  //     // selectedIcon: '/assets/icons/vector-colored.svg',
  //     isSelected: true,
  //   },
  //   {
  //     ID: 2,
  //     name: 'Add Phone Data',
  //     icon: '/assets/icons/sell.svg',
  //     // selectedIcon: '/assets/icons/sell-colored.svg',
  //     isSelected: false,
  //   },
  //   {
  //     ID: 3,
  //     name: 'Phone Confirmation',
  //     icon: '/assets/icons/sell.svg',
  //     // selectedIcon: '/assets/icons/sell-colored.svg',
  //     isSelected: false,
  //   },
  // ];
  Tabs = [];
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

    this.translate.get([
      'sites.mobile.UserLogin',
      'sites.mobile.AddPhoneData',
      'sites.mobile.PhoneConfirmation'
    ]).subscribe(translations => {
      this.Tabs = [
        {
          ID: 1,
          name: translations['sites.mobile.UserLogin'],
          icon: '/assets/icons/vector.svg',
          isSelected: true,
        },
        {
          ID: 2,
          name: translations['sites.mobile.AddPhoneData'],
          icon: '/assets/icons/sell.svg',
          isSelected: false,
        },
        {
          ID: 3,
          name: translations['sites.mobile.PhoneConfirmation'],
          icon: '/assets/icons/sell.svg',
          isSelected: false,
        },
      ];
    });

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
      name: [this.item.name, Validators.required],
      imeI1: [this.item.imeI1, [Validators.required, Validators.pattern(/^\d{15}$/)]],
      imeI2: [this.item.imeI2, [Validators.required, Validators.pattern(/^\d{15}$/)]],
      mobileModel: [this.item.mobileModel, Validators.required],
      number: [this.item.number, [Validators.required, Validators.pattern(/^(010|011|012|015)\d{8}$/)]],
      serialNumber: [this.item.serialNumber, Validators.required],
      brandId: [this.item.brandId, Validators.required],
      dateOfPurchase: [this.item.dateOfPurchase, Validators.required]
    });
    this.page.isPageLoaded = true;
  }

  Save() {
    if (this.page.isSaving || this.page.form.invalid) return;
    this.page.isSaving = true;
    Object.assign(this.item, this.page.form.value);
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

  switchTab(tabID: number) {
    this.selectedTab = tabID;
    this.Tabs.forEach((item) => {
      item.isSelected = item.ID === tabID;
    });
  }

  getSelectedTab() {
    return this.Tabs.find((item) => item.isSelected);
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
    formData.append('Files', file, file.name);  // Use 'Files' as the field name if required by backend
    console.log(formData);

    // Call the service to upload the image, passing the FormData directly
    this._mobileService.uploadImage(formData).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          console.log(res);
          //this.images[index] = { uploaded: true, src: res.data.path[index] };
          this.images[index] = { uploaded: true, src: res.data.path[index] };

          this._sharedService.showToastr(res);
          this.addImageBox();
        }
      },
      error: (err) => {
        this._sharedService.showToastr(err);
      },
    });
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