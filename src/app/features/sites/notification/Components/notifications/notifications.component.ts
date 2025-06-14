import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CrudIndexBaseUtils } from 'src/app/shared/classes/crud-index.utils';
import { CRUDIndexPage } from 'src/app/shared/models/crud-index.model';
import { searchOfnotificationViewModel, searchSelectedViewModel, notificationViewModel } from '../../interface/notifications';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SharedService } from 'src/app/shared/service/shared.service';
import { SearchService } from '../../../search/service/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NotificationsService } from '../../service/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent extends CrudIndexBaseUtils{
 override page: CRUDIndexPage = new CRUDIndexPage();
  override pageRoute = '/sites/customers';
  override searchViewModel: searchOfnotificationViewModel = new searchOfnotificationViewModel();
  modalRef: BsModalRef;
  override items: notificationViewModel[] = [];
  selectedItem: notificationViewModel;
  showDownloadOptions = false;
  records: number;
  MessageStatus=[
    { id: 1, name: 'Pending  ' },
    { id: 2, name: 'Received' },
    { id: 3, name: 'Read' }
  ]
  @ViewChild('downloadButton') downloadButton: ElementRef;
  @ViewChild('downloadOptions') downloadOptions: ElementRef;
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = this.downloadOptions?.nativeElement.contains(event.target) ||
      this.downloadButton?.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.showDownloadOptions = false;
    }
  }
 
  status: searchSelectedViewModel[] = [];
  clientGroup: searchSelectedViewModel[] = [];

  constructor(
    public override _sharedService: SharedService,
    private _pageService: NotificationsService,
    private _router: Router,
    private activatedRoute: ActivatedRoute,

  ) {
    super(_sharedService);
  }

  ngOnInit(): void {
    this.initializePage();

  }

  getMessageStatusName(statusId: number): string {

    const MessageStatuslist = this.MessageStatus.find(s => s.id === statusId);
    return MessageStatuslist ? MessageStatuslist.name : 'Unknown';
  }

  initializePage() {
    this.page.columns = [

      { Name: 'No', Title: '#', Selectable: true, Sortable: false },
      { Name: 'userName  ', Title: 'sites.allNotifications.userName', Selectable: false, Sortable: true },
      { Name: 'userMobile ', Title: 'sites.allNotifications.userMobile', Selectable: false, Sortable: true },
      { Name: 'title ', Title: 'sites.allNotifications.title', Selectable: false, Sortable: true },
      { Name: 'body ', Title: 'sites.allNotifications.body', Selectable: false, Sortable: true },
      { Name: 'createdDate ', Title: 'sites.search.createdDate', Selectable: false, Sortable: true },
      { Name: 'messageStatus', Title: 'sites.allNotifications.messageStatus', Selectable: false, Sortable: true },
   


    ];
    this.createSearchForm();
    this.activatedRoute.queryParams.subscribe((params) => {
      this._sharedService.getFilterationFromURL(params, this.page.searchForm);
      this.search();
    });
  }


  override createSearchForm() {
    this.page.searchForm = this._sharedService.formBuilder.group({
      UserName: [this.searchViewModel.UserName],
      UserMobile: [this.searchViewModel.UserMobile],
      Title: [this.searchViewModel.Title],
      MessageStatus: [this.searchViewModel.MessageStatus],
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
          this.items = response.data.items as notificationViewModel[];
        }
        this.fireEventToParent();
      });
  }


}
