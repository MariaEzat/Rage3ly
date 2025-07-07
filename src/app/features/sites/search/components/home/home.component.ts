import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CrudIndexBaseUtils } from 'src/app/shared/classes/crud-index.utils';
import { CRUDIndexPage } from 'src/app/shared/models/crud-index.model';
import {  searchOfSearchViewModel, searchSelectedViewModel, searchViewModel } from '../../interface/search';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SharedService } from 'src/app/shared/service/shared.service';
import { SearchService } from '../../service/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from "../../../../../shared/shared.module";
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})


export class HomeComponent extends CrudIndexBaseUtils {
  override page: CRUDIndexPage = new CRUDIndexPage();
  override pageRoute = '/sites/search';
  override searchViewModel: searchOfSearchViewModel = new searchOfSearchViewModel();
  modalRef: BsModalRef;
  override items: searchViewModel[] = [];
  selectedItem: searchViewModel;
  showDownloadOptions = false;
  records: number;
  ActionLogType=[
    { id: 0, name: 'All ' },
    { id: 1, name: 'Reigester ' },
    { id: 2, name: 'Login' },
    { id: 3, name: 'Search' }
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
    private _pageService: SearchService,
    private _router: Router,
    private activatedRoute: ActivatedRoute,

  ) {
    super(_sharedService);
  }

  ngOnInit(): void {
    this.initializePage();

  }

  getActionLogTypeName(statusId: number): string {

    const verifyStatuslist = this.ActionLogType.find(s => s.id === statusId);
    return verifyStatuslist ? verifyStatuslist.name : 'Unknown';
  }

  initializePage() {
    this.page.columns = [

      { Name: 'No', Title: '#', Selectable: true, Sortable: false },
      { Name: 'ClientName ', Title: 'sites.search.clientName', Selectable: false, Sortable: true },
      { Name: 'IP', Title: 'sites.search.ip', Selectable: false, Sortable: true },
      { Name: 'Port', Title: 'sites.search.port', Selectable: false, Sortable: true },
      { Name: 'SearchText', Title: 'sites.search.searchText', Selectable: false, Sortable: true },
      // { Name: 'Email', Title: 'sites.search.email', Selectable: false, Sortable: true },
      { Name: 'phoneNumberOwner ', Title: 'sites.search.phoneNumberOwner', Selectable: false, Sortable: true },
      { Name: 'phoneNumberSearcher ', Title: 'sites.search.phoneNumberSearcher', Selectable: false, Sortable: true },
      { Name: 'createdDate ', Title: 'sites.search.createdDate', Selectable: false, Sortable: true },
      { Name: 'IMEI', Title: 'sites.search.imeI1', Selectable: false, Sortable: true },
      { Name: "Latitude & Longitude ", Title: "sites.search.Latitude & Longitude", Selectable: false, Sortable: true },


    ];
    this.createSearchForm();
    this.page.searchForm.get('LogType')?.valueChanges.subscribe((value) => {
      this.page.searchForm.get('LogType')?.setValue(Number(value), { emitEvent: false });
      this.search();
    });
    
    this.activatedRoute.queryParams.subscribe((params) => {
      this._sharedService.getFilterationFromURL(params, this.page.searchForm);
      this.search();
    });
  }


  override createSearchForm() {
    this.page.searchForm = this._sharedService.formBuilder.group({
      EmailAndClinetName: [this.searchViewModel.EmailAndClinetName],
      ImeiAndSerial: [this.searchViewModel.ImeiAndSerial],
      LogType: [this.searchViewModel.LogType],
      PhoneNumber: [this.searchViewModel.PhoneNumber],
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
          this.items = response.data.items as searchViewModel[];
        }
        this.fireEventToParent();
      });
  }

  
 
 

  getImageUrl(imagePath: string): string {
    return `${environment.api}/` + imagePath;
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
  downloadExcel() {
    this.showDownloadOptions = false;

    this._pageService.getCustomerExcel(this.searchViewModel).subscribe({
      next: (response: Blob) => {
        const fileName = 'Customers.xlsx';
        saveAs(response, fileName);
      },
      error: (err) => {
        this._sharedService.showToastr(err);
      },
    });
  }
  downloadPDF() {
    this.showDownloadOptions = false;
    this.page.isSearching = true;

    this._pageService
      .get(
        this.searchViewModel,
        this.page.orderBy,
        this.page.isAscending,
        this.page.options.currentPage,
        this.records
      )
      .subscribe((response) => {
        this.page.isSearching = false;

        if (response.isSuccess) {
          this.page.isAllSelected = false;
          this.confingPagination(response);
          this.items = response.data.items as searchViewModel[];
          this.records = response.data.records;

          // Now generate the PDF after fetching the data
          this.generatePDF();
        }

        this.fireEventToParent();
      });
  }

  generatePDF() {
    const doc = new jsPDF({
      orientation: "landscape", // Wider layout for large tables
      unit: "mm",
      format: "a4",
    });

    // Title Styling
    doc.setFontSize(18);
    doc.text("Customers List", 14, 15);

    // Table Headers
    const headers = [
      [
        "No",
        "Name",
        "Activation",
        "Email",
        "Verify Status",
        "National Number",
        "Mobile",
      ],
    ];

    // Table Data
    const data = this.items.map((item, index) => [
      index + 1,
      item.ip,
      item.port,
      this.getActionLogTypeName(Number(item.logType)),
      item.searchText,
      item.phoneNumberOwner,
    ]);

    // Generate Table with Better Formatting
    autoTable(doc, {
      head: headers,
      body: data,
      startY: 25, // Start table below title
      theme: "grid", // Adds borders
      styles: {
        fontSize: 10, // Reduce font size
        cellPadding: 2, // Adjust spacing
      },
      headStyles: {
        fillColor: [44, 62, 80], // Dark blue header
        textColor: [255, 255, 255], // White text
        fontSize: 11,
      },
      columnStyles: {
        0: { cellWidth: 10 }, // No
        1: { cellWidth: 30 }, // Name
        2: { cellWidth: 20 }, // Activation
        3: { cellWidth: 40 }, // Email
        4: { cellWidth: 20 }, // Verify Status
        5: { cellWidth: 25 }, // National Number
        6: { cellWidth: 25 }, // Mobile
      },
      margin: { top: 20 },
      pageBreak: "auto", // Automatically insert page breaks
    });

    // Save PDF
    doc.save("customers.pdf");
  }

  toggleDownloadOptions() {
    this.showDownloadOptions = !this.showDownloadOptions;
  }
 
  clientDetails(id: string) {
    sessionStorage.setItem('clientId', id);
    this._router.navigate(['/sites/transferOfOwnership/clientDetails']);  }
  
}





