import { Component, OnDestroy, OnInit } from '@angular/core';
import { CRUDCreatePage } from 'src/app/shared/classes/crud-create.model';
import { SharedService } from 'src/app/shared/service/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { brandCreateViewModel } from '../../interface/brand';
import { BrandService } from '../../service/brand.service';
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
  item: brandCreateViewModel = new brandCreateViewModel();
  id: string;
  images = [{ uploaded: false, src: null }];
  isActivated: boolean = false;
  environment = environment
  constructor(
    private _sharedService: SharedService,
    private _BrandService: BrandService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.page.isPageLoaded = false;
    this._activatedRoute.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.page.isEdit = true;
      }
    });
    if (this.page.isEdit) {
      this.getEditableItem();
    } else {
      this.createForm();
    }
  }
  //Region:If Edit page
  getEditableItem() {
    this._BrandService.getById(this.id).subscribe((res) => {
      if (res.isSuccess) {
        this.item = res.data;
        if (res.data.media && res.data.media.length > 0) {
          this.images = res.data.media.map((m) => ({
            uploaded: true,
            src: m.path
          }));
        } else {
          this.images = [{ uploaded: false, src: null }];
        }
        

        this.createForm();
      }
    });
  }


  createForm() {
 
    this.page.form = this._sharedService.formBuilder.group({
      name: [this.item.name, [Validators.required, Validators.minLength(4), Validators.maxLength(200)]],
    
    });
    this.page.isPageLoaded = true;
  }

  Save() {
    this.page.isSaving = true;
    Object.assign(this.item, this.page.form.value);
    this.item.paths = this.getUploadedImages(); 
    //this.item.paths = this.getUploadedImages();
    // this.item.paths = this.images
    //    .filter((image) => image.uploaded)
    //    .map((image) => image.src);
    this.item.paths = this.images.filter((image) => image.uploaded).map((image) => image.src);
    this.item.id=this.id;
    this._BrandService.postOrUpdate(this.item).subscribe({
      next: (res) => {

        this.page.isSaving = false;
        this.page.responseViewModel = res;
        this._sharedService.showToastr(res);
        if (res.isSuccess) {
          this._router.navigate(['/sites/brand']);
        }
      },
      error: () => {
        this.page.isSaving = false;
      },
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
    this._BrandService.uploadImage(formData).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          console.log(res);
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
