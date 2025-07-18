import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { SharedService } from 'src/app/shared/service/shared.service';
import { NotificationService } from '../../service/notification.service';
import {  notificationSearchViewModel,NotificationViewModel } from '../../interface/notification';
import { CRUDIndexPage } from 'src/app/shared/models/crud-index.model';


import { BsModalRef } from 'ngx-bootstrap/modal';
import { ResponseViewModel } from 'src/app/shared/models/response.model';
import { ControlType } from 'src/app/shared/models/enum/control-type.enum';
import { CrudIndexBaseUtils } from 'src/app/shared/classes/crud-index.utils';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent extends CrudIndexBaseUtils {
  override page: CRUDIndexPage = new CRUDIndexPage();
  loading = true;
  notifications: NotificationViewModel[] = [];
  modalRef: BsModalRef;
  override items: NotificationViewModel[] = [];
  override controlType = ControlType;
  override searchViewModel: notificationSearchViewModel = new notificationSearchViewModel();
  RequestStatus = [
    { id: 1, name: 'sites.ownership.pending' },
    { id: 2, name: 'sites.ownership.approved' },
    { id: 3, name: 'sites.ownership.editImageRequest' },
    { id: 4, name: 'sites.ownership.rejected' },
    { id: 5, name: 'sites.ownership.canceled' },
  ];


  constructor(private _TransferOfOwnershipService: NotificationService, public override _sharedService: SharedService,
    private activatedRoute: ActivatedRoute, private translate: TranslateService, private router: Router) { super(_sharedService); }

  ngOnInit() {
    this.initializePage();

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


  
  override createSearchForm() {
    this.page.searchForm = this._sharedService.formBuilder.group({
      ClinetName: [this.searchViewModel.ClinetName],
      PhoneNumber: [this.searchViewModel.PhoneNumber],
      From: [this.searchViewModel.From],
      To: [this.searchViewModel.To],
      ImeiAndSerial: [this.searchViewModel.ImeiAndSerial],

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
          this.notifications = response.data.items;
        }
        this.fireEventToParent();
      });
  }

 clientDetails(id: string) {
  sessionStorage.setItem('clientId', id);
  this.router.navigate(['/sites/transferOfOwnership/clientDetails']);  }

  changePage(pageNumber: number) {
    const totalPages = Math.ceil(this.page.options.totalItems / this.page.options.itemsPerPage);
    if (pageNumber < 1 || pageNumber > totalPages) {
      return; // ممنوع أرقام خارج المدى
    }
    this.page.options.currentPage = pageNumber;
    this.search();
  }

}
