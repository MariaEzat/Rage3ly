import { Component } from '@angular/core';
import { CrudIndexBaseUtils } from 'src/app/shared/classes/crud-index.utils';
import { CRUDIndexPage } from 'src/app/shared/models/crud-index.model';
import { RetrivedPhonesViewModel, searchRetrivedPhonesViewModel } from '../../interface/retrived-phones-view-model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SharedService } from 'src/app/shared/service/shared.service';
import { RetrivedPhonesService } from '../../service/retrived-phones.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends CrudIndexBaseUtils {
  override page: CRUDIndexPage = new CRUDIndexPage();
  override pageRoute = '/sites/retrivedPhones';
  override searchViewModel: searchRetrivedPhonesViewModel = new searchRetrivedPhonesViewModel();
  modalRef: BsModalRef;
  id:string;
  override items: RetrivedPhonesViewModel[] = [];
  constructor(
    public override _sharedService: SharedService,
    private _pageService: RetrivedPhonesService,
    private _router: Router,
    private activatedRoute: ActivatedRoute,

  ) {
    super(_sharedService);
  }

  ngOnInit(): void {
    this.initializePage();

  }

 
  initializePage() {
    this.page.columns = [
      { Name: 'No', Title: '#', Selectable: true, Sortable: false },
      { Name: 'clientName ', Title: 'sites.retrivedPhones.clientName', Selectable: false, Sortable: true },
      { Name: 'mobileModel', Title: 'sites.retrivedPhones.mobileModel', Selectable: false, Sortable: true },
      { Name: 'brandName', Title: 'sites.retrivedPhones.brandName', Selectable: false, Sortable: true },
      
    ];
    this.createSearchForm();
    this.activatedRoute.queryParams.subscribe((params) => {
      this._sharedService.getFilterationFromURL(params, this.page.searchForm);
      this.search();
    });
  }


  override createSearchForm() {
    this.page.searchForm = this._sharedService.formBuilder.group({
      From: [this.searchViewModel.From],
      To: [this.searchViewModel.To]
    });
    this.page.isPageLoaded = true;
  }

  override search() {
    this.page.isSearching = true;
    this.items = [];
    Object.assign(this.searchViewModel, this.page.searchForm.value);
    this._pageService
      .get(
        this.searchViewModel,
        this.page.orderBy,
        this.page.isAscending,
        this.page.options.currentPage,
        this.page.options.itemsPerPage
      )
      .subscribe((response) => {
        this.page.isSearching = false;

        if (response.isSuccess) {
          this.page.isAllSelected = false;
          this.confingPagination(response);
          this.items = response.data.items as RetrivedPhonesViewModel[];
        }
        this.fireEventToParent();
      });
  }

  clientDetails(id: string) {
    this._sharedService.setTempClientId(id);
    this._router.navigate(['/sites/transferOfOwnership/clientDetails']);  }

}






