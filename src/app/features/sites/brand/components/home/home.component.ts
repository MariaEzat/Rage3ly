import { Component, ViewChild } from '@angular/core';
import { CrudIndexBaseUtils } from 'src/app/shared/classes/crud-index.utils';
import { SharedService } from 'src/app/shared/service/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CRUDIndexPage } from 'src/app/shared/models/crud-index.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { brandViewModel} from '../../interface/brand';
import { BrandService } from '../../service/brand.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends CrudIndexBaseUtils {


  override page: CRUDIndexPage = new CRUDIndexPage();
  override pageRoute = '/sites/brand';
  modalRef: BsModalRef;
  override items: brandViewModel[] = [];
   ads: [] = [];

  selectedItem: brandViewModel;
  constructor(public override _sharedService: SharedService,
    private _pageService: BrandService, private _router: Router, private activatedRoute: ActivatedRoute

  ) {
    super(_sharedService);
  }

  ngOnInit(): void {
    this.initializePage();
  }


  initializePage() {
    this.page.columns = [
      { Name: "No", Title: "#", Selectable: true, Sortable: false },
      { Name: "name", Title: "sites.brands.brandName", Selectable: false, Sortable: true },
      { Name: "path", Title: "sites.brands.image", Selectable: false, Sortable: true },
      { Name: "Action", Title: "sites.brands.action", Selectable: false, Sortable: true },
    ];
  
    this.search();
  }



  navigateToCreateBrand() {
    this._router.navigate(['/sites/brand/create']);
  }


  override search() {
    this.page.isSearching = true;
    this.items = [];
    this._pageService.get( this.page.orderBy, this.page.isAscending, this.page.options.currentPage, this.page.options.itemsPerPage).subscribe(response => {

      this.page.isSearching = false;
      if (response.isSuccess) {
        this.page.isAllSelected = false;
        this.confingPagination(response)
        this.items = response.data.items as brandViewModel[];

      }
      this.fireEventToParent()
    });
  }

  @ViewChild('confirmDeleteTemplate', { static: false }) confirmDeleteTemplate: any;
  showDeleteConfirmation(selectedItem: brandViewModel) {
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
    this._router.navigate(['/sites/brand/edit', id]);
  }



  getImageUrl(imagePath: string): string {
    return `${environment.api}/` + imagePath;
  }

  @ViewChild('confirmDeleteTemplates', { static: false }) confirmDeleteTemplates: any;
  showDeleteConfirmations(selectedItem: brandViewModel) {
    this.selectedItem = selectedItem;
    this.modalRef = this._sharedService.modalService.show(this.confirmDeleteTemplates, { class: 'modal-sm' });
  }
  deleteSelectedbrands() {
    const selectedIds = this.items
      .filter(item => item.selected) 
      .map(item => item.id);        

    if (selectedIds.length === 0) {

      return;
    }
    this.modalRef = this._sharedService.modalService.show(this.confirmDeleteTemplates, { class: 'modal-sm' });
    this.modalRef.content = {
      onConfirm: () => {
        this._pageService.bulkDelete(selectedIds).subscribe({
          next: (response) => {
            this._sharedService.showToastr(response);
            if (response.isSuccess) {
      
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
 
  isAllSelected(): boolean {
    return this.items.every(item => item.selected);
  }
 
  toggleSelectAll(event: any): void {
    const isChecked = event.target.checked;
    this.items.forEach(item => {
      item.selected = isChecked;
    });
  }
}
