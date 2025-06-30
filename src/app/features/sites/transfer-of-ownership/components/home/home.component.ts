import { Component, ViewChild } from '@angular/core';
import { RejectReasonViewModel, requestSearchViewModel, TransferOfOwnershipViewModel } from '../../interface/transfer-of-ownership';
import { TransferOfOwnershipService } from '../../service/transfer-of-ownership.service';
import { SharedService } from 'src/app/shared/service/shared.service';
import { CRUDIndexPage } from 'src/app/shared/models/crud-index.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ResponseViewModel } from 'src/app/shared/models/response.model';
import { ControlType } from 'src/app/shared/models/enum/control-type.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudIndexBaseUtils } from 'src/app/shared/classes/crud-index.utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends CrudIndexBaseUtils {
  override page: CRUDIndexPage = new CRUDIndexPage();
  loading = true;
  mobiles: TransferOfOwnershipViewModel[] = [];
  selectedItem: RejectReasonViewModel = new RejectReasonViewModel();
  modalRef: BsModalRef;
  override items: TransferOfOwnershipViewModel[] = [];
  override controlType = ControlType;
  override searchViewModel: requestSearchViewModel = new requestSearchViewModel();
  RequestStatus = [
    { id: 1, name: 'sites.ownership.pending' },
    { id: 2, name: 'sites.ownership.approved' },
    { id: 3, name: 'sites.ownership.editImageRequest' },
    { id: 4, name: 'sites.ownership.rejected' },
    { id: 5, name: 'sites.ownership.canceled' },

  ];


  constructor(private _TransferOfOwnershipService: TransferOfOwnershipService, public override _sharedService: SharedService,
    private activatedRoute: ActivatedRoute, private translate: TranslateService, private router: Router) { super(_sharedService); }

  ngOnInit() {
    this.loadRequestStatus();
    this.initializePage();

  }
  loadRequestStatus() {
    this.translate.get([
      'sites.ownership.pending',
      'sites.ownership.approved',
      'sites.ownership.editImageRequest',
      'sites.ownership.rejected',
      'sites.ownership.canceled'
    ]).subscribe(translations => {
      this.RequestStatus = [
        { id: 1, name: translations['sites.ownership.pending'] },
        { id: 2, name: translations['sites.ownership.approved'] },
        { id: 3, name: translations['sites.ownership.editImageRequest'] },
        { id: 4, name: translations['sites.ownership.rejected'] },
        { id: 5, name: translations['sites.ownership.canceled'] }
      ];
    });
  }
  getStatusName(status: number): string {

    const PhoneStatus = this.RequestStatus.find(s => s.id === status);
    return PhoneStatus ? PhoneStatus.name : 'Unknown';
  }
  initializePage() {
    this.createSearchForm();
    this.activatedRoute.queryParams.subscribe((params) => {
      this._sharedService.getFilterationFromURL(params, this.page.searchForm);
      this.search();
    });
  }

  openImage(path: string): void {
    const fullImageUrl = 'https://api.rage3ly.com/' + path;
    window.open(fullImageUrl, '_blank');
  }


  acceptRequest(id: string) {
    this.page.isSaving = true;
    this._TransferOfOwnershipService.Approved(id).subscribe({
      next: (response) => {
        this.page.isSaving = false;
        if (response.isSuccess) {
          this._sharedService.showToastr(response);
          this.initializePage();
        }
      },
      error: (error) => {
        this.page.isSaving = false;
        this._sharedService.showToastr(error);
      }
    });
  }
  override createSearchForm() {
    this.page.searchForm = this._sharedService.formBuilder.group({
      RequestStatus: [this.searchViewModel.RequestStatus],
      ClientName: [this.searchViewModel.ClientName],
    });
    this.page.isPageLoaded = true;
  }
  override search() {
    this.page.isSearching = true;
    this.items = [];
    Object.assign(this.searchViewModel, this.page.searchForm.value);
    this._TransferOfOwnershipService
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
          this.mobiles = response.data.items;
        }
        this.fireEventToParent();
      });
  }


  @ViewChild('confirmRejectTemplate', { static: false }) confirmRejectTemplate: any;
  showRejectConfirmation(Item: TransferOfOwnershipViewModel) {
    this.selectedItem = new RejectReasonViewModel();
    this.selectedItem.id = Item.id;
    this.modalRef = this._sharedService.modalService.show(this.confirmRejectTemplate, { class: 'modal-sm' });
  }

  rejectRequest() {
    const body: RejectReasonViewModel = {
      id: this.selectedItem.id,
      rejectReason: this.selectedItem.rejectReason
    };


    this._TransferOfOwnershipService.Rejected(body).subscribe({
      next: (response) => {
        this.page.isSaving = false;
        if (response.isSuccess) {
          this._sharedService.showToastr(response);
          this.initializePage();
        }
      },
      error: (error) => {
        this.page.isSaving = false;
        this._sharedService.showToastr(error);
      }
    });
  }

  requestEdit(id: string) {
    this.page.isSaving = true;
    this._TransferOfOwnershipService.editImageRequest(id).subscribe({
      next: (response) => {
        this.page.isSaving = false;
        if (response.isSuccess) {
          this._sharedService.showToastr(response);
          this.initializePage();
        }
      },
      error: (error) => {
        this.page.isSaving = false;
        this._sharedService.showToastr(error);
      }
    });
  }

  clientDetails(id: string) {
    sessionStorage.setItem('clientId', id);
    this.router.navigate(['/sites/transferOfOwnership/clientDetails']);
  }
  changePage(pageNumber: number) {
    const totalPages = Math.ceil(this.page.options.totalItems / this.page.options.itemsPerPage);
    if (pageNumber < 1 || pageNumber > totalPages) {
      return; // ممنوع أرقام خارج المدى
    }
    this.page.options.currentPage = pageNumber;
    this.search();
  }


}
