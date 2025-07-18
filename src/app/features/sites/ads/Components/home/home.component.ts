import { Component, ViewChild } from '@angular/core';
import { CrudIndexBaseUtils } from 'src/app/shared/classes/crud-index.utils';
import { SharedService } from 'src/app/shared/service/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CRUDIndexPage } from 'src/app/shared/models/crud-index.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { adsActivateViewModel, adsSearchViewModel, adsViewModel } from '../../interfaces/ads';
import { AdsService } from '../../service/ads.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends CrudIndexBaseUtils {


  override page: CRUDIndexPage = new CRUDIndexPage();
  override pageRoute = '/sites/ads';
  override searchViewModel: adsSearchViewModel = new adsSearchViewModel();
  modalRef: BsModalRef;
  override items: adsViewModel[] = [];
   ads: [] = [];

  selectedItem: adsViewModel;
  activation: adsActivateViewModel = { id: '' }
  constructor(public override _sharedService: SharedService,
    private _pageService: AdsService, private _router: Router, private activatedRoute: ActivatedRoute

  ) {
    super(_sharedService);
  }

  ngOnInit(): void {
    this.initializePage();
  }


  initializePage() {
    this.page.columns = [
      { Name: "No", Title: "#", Selectable: true, Sortable: false },
      { Name: "adName", Title: "sites.advertisment.name", Selectable: false, Sortable: true },
      { Name: "startDate", Title: "sites.advertisment.startDate", Selectable: false, Sortable: true },
      { Name: "endDate", Title: "sites.advertisment.endDate", Selectable: false, Sortable: true },
      { Name: "isActive", Title: "sites.advertisment.activation", Selectable: false, Sortable: true },
      { Name: "path", Title: "sites.advertisment.image", Selectable: false, Sortable: true },
      { Name: "Action", Title: "sites.advertisment.action", Selectable: false, Sortable: true },
    ];
    this.createSearchForm();
    this.activatedRoute.queryParams.subscribe(params => {
      this._sharedService.getFilterationFromURL(params, this.page.searchForm)
      this.search();
    });
  }



  navigateToCreateBrand() {
    this._router.navigate(['/sites/ads/create']);
  }

  override createSearchForm() {
    this.page.searchForm = this._sharedService.formBuilder.group({
      Title: [this.searchViewModel.Title],
      StartDate: [this.searchViewModel.StartDate],
      EndDate: [this.searchViewModel.EndDate],

    });
    this.page.isPageLoaded = true;
  }

  override search() {
    this.page.isSearching = true;
    this.items = [];
    Object.assign(this.searchViewModel, this.page.searchForm.value);
    this._pageService.get(this.searchViewModel, this.page.orderBy, this.page.isAscending, this.page.options.currentPage, this.page.options.itemsPerPage).subscribe(response => {

      this.page.isSearching = false;
      // if( response.message = "Unauthorize Access "){
      //   this._router.navigate(['/auth/login'])
      //  }

      if (response.isSuccess) {
        
        this.page.isAllSelected = false;
        this.confingPagination(response)
        this.items = response.data.items as adsViewModel[];

      }
      this.fireEventToParent()
    });
  }

  @ViewChild('confirmDeleteTemplate', { static: false }) confirmDeleteTemplate: any;
  showDeleteConfirmation(selectedItem: adsViewModel) {
    this.selectedItem = selectedItem;
    this.modalRef = this._sharedService.modalService.show(this.confirmDeleteTemplate, { class: 'modal-sm' });
  }


  remove() {
    this._pageService.remove(this.selectedItem).subscribe(res => {
      this._sharedService.showToastr(res)
      if (res.isSuccess) {
        let index = this.items.findIndex(x => x.id == this.selectedItem.id);
        this.items.splice(index, 1);
        this.initializePage();
      }
    })
  }

  editad(id: string) {
    this._router.navigate(['/sites/ads/edit', id]);
  }


  updateActivation(id: string, isActive: boolean) {

    this.activation.id = id;
    const updateObservable = isActive ? this._pageService.updateActivated(this.activation) : this._pageService.updateDeactivated(this.activation);

    updateObservable.subscribe({
      next: (response) => {
        this._sharedService.showToastr(response);
        if (response.isSuccess) {
          this.initializePage();
        } else {

          this._sharedService.showToastr(response);
        }
      },
      error: (error) => {
        this._sharedService.showToastr(error);
      },
    });
  }

  getImageUrl(imagePath: string): string {
    return `${environment.api}/` + imagePath;
  }

  @ViewChild('confirmDeleteTemplates', { static: false }) confirmDeleteTemplates: any;
  showDeleteConfirmations(selectedItem: adsViewModel) {
    this.selectedItem = selectedItem;
    this.modalRef = this._sharedService.modalService.show(this.confirmDeleteTemplates, { class: 'modal-sm' });
  }
  deleteSelectedAds() {
    const selectedIds = this.items
      .filter(item => item.selected) // Filter selected rows
      .map(item => item.id);         // Extract IDs

    if (selectedIds.length === 0) {

      return;
    }
    this.modalRef = this._sharedService.modalService.show(this.confirmDeleteTemplates, { class: 'modal-sm' });
    this.modalRef.content = {
      onConfirm: () => {
        // Call the delete API
        this._pageService.bulkDelete(selectedIds).subscribe({
          next: (response) => {
            this._sharedService.showToastr(response);
            if (response.isSuccess) {
              // Remove the deleted items from the local list
              this.items = this.items.filter(item => !selectedIds.includes(item.id));
              this.search();
            }
          },
          error: (error) => {
            this._sharedService.showToastr(error);
          }
        });
      },
    };
  }
  activateAds() {
    const selectedIds = this.items
      .filter(item => item.selected)
      .map(item => item.id);

    if (selectedIds.length > 0) {
      this._pageService.bulkActivate(selectedIds).subscribe(response => {
        this._sharedService.showToastr(response);
        if (response.isSuccess) {

          this.items.forEach(item => {
            if (selectedIds.includes(item.id)) {
              item.isActive = true;
            }
          });
        }
      });
    }
  }

  disActiveAds() {
    const selectedIds = this.items
      .filter(item => item.selected)
      .map(item => item.id);

    if (selectedIds.length > 0) {
      this._pageService.bulkDeactivate(selectedIds).subscribe(response => {
        this._sharedService.showToastr(response);
        if (response.isSuccess) {
          this.items.forEach(item => {
            if (selectedIds.includes(item.id)) {
              item.isActive = false;
            }
          });
        }
      });
    }
  }
  isAllSelected(): boolean {
    return this.items.every(item => item.selected);
  }
  // Toggle the selection of all items
  toggleSelectAll(event: any): void {
    const isChecked = event.target.checked;
    this.items.forEach(item => {
      item.selected = isChecked;
    });
  }
}
