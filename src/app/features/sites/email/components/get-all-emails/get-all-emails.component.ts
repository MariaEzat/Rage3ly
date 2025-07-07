import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CrudIndexBaseUtils } from 'src/app/shared/classes/crud-index.utils';
import { CRUDIndexPage } from 'src/app/shared/models/crud-index.model';
import { SharedService } from 'src/app/shared/service/shared.service';
import { EmployeeService } from '../../../job-title/service/job-title.service';
import { AllEmailsViewModel, EmailSearchViewModel } from '../../interface/email';
import { EmailService } from '../../service/email.service';

@Component({
  selector: 'app-get-all-emails',
  templateUrl: './get-all-emails.component.html',
  styleUrls: ['./get-all-emails.component.css']
})
export class GetAllEmailsComponent extends CrudIndexBaseUtils {
  override page: CRUDIndexPage = new CRUDIndexPage();
  override pageRoute = '/sites/email';
  override searchViewModel: EmailSearchViewModel = new EmailSearchViewModel();
  modalRef: BsModalRef;
  override items: AllEmailsViewModel[] = [];
  selectedItem: AllEmailsViewModel;
  activation: any = { id: '' }

  constructor(public override _sharedService: SharedService,
    private _emailService: EmailService, private _router: Router, private activatedRoute: ActivatedRoute

  ) {
    super(_sharedService);
  }
  RolesEnum = [
    { id: 1, name: 'SuperAdmin' },
    { id: 2, name: 'Admin' },
    { id: 4, name: 'Client' },
  ];

  ngOnInit(): void {
    this.initializePage();
  }


  initializePage() {
    this.page.columns = [
      { Name: "No", Title: "#", Selectable: true, Sortable: false },
      { Name: "Subject", Title: "salesflow.Email.subject", Selectable: false, Sortable: true },
      { Name: "Body", Title: "salesflow.Email.body", Selectable: false, Sortable: true },
      { Name: "EmailAdresses", Title: "salesflow.Email.emailAdress", Selectable: false, Sortable: true },


    ];


    
  
    // this.subscribeToParentEvent()
    this.createSearchForm();
    this.activatedRoute.queryParams.subscribe(params => {
      this._sharedService.getFilterationFromURL(params, this.page.searchForm)
      this.search();
    });
  }

  navigateToSendEmail() {
    this._router.navigate(['/sites/email/sendEmail']);
  }

  override createSearchForm() {
    this.page.searchForm = this._sharedService.formBuilder.group({
      Subject: [this.searchViewModel.Subject],
      Body: [this.searchViewModel.Body],
      EmailAdress: [this.searchViewModel.EmailAdress],
    });
    this.page.isPageLoaded = true;
  }

  override search() {
    this.page.isSearching = true;
    this.items = [];
    Object.assign(this.searchViewModel, this.page.searchForm.value);
    this._emailService.get(this.searchViewModel, this.page.orderBy, this.page.isAscending, this.page.options.currentPage, this.page.options.itemsPerPage).subscribe(response => {
      this.page.isSearching = false;
      if (response.isSuccess) {
        this.page.isAllSelected = false;
        this.confingPagination(response)
        this.items = response.data.items as AllEmailsViewModel[];
      }
      this.fireEventToParent()
    });
  }




  getRoleName(statusId: number): string {
    const status = this.RolesEnum.find(s => s.id === Number(statusId));
    return status ? status.name : 'Unknown';
  }
 
 
 

  getRoleNameById(id: number): string {
    const role = this.RolesEnum.find(r => r.id === id);
    return role ? role.name : 'Unknown';
  }
  

}
