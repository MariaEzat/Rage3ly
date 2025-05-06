import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CrudIndexBaseUtils } from 'src/app/shared/classes/crud-index.utils';
import { CRUDIndexPage } from 'src/app/shared/models/crud-index.model';
import { mobileActivateViewModel, mobileSearchViewModel, mobileSelectedViewModel, mobileViewModel } from '../../interfaces/mobile-view-model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SharedService } from 'src/app/shared/service/shared.service';
import { MobileService } from '../../service/mobile.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends CrudIndexBaseUtils {
  override page: CRUDIndexPage = new CRUDIndexPage();
  override pageRoute = '/sites/mobile';
  override searchViewModel: mobileSearchViewModel = new mobileSearchViewModel();
  modalRef: BsModalRef;
  override items: mobileViewModel[] = [];
  selectedItem: mobileViewModel;
  showDownloadOptions = false;
  records: number;
  activation: mobileActivateViewModel = { id: '' }
  PhoneStatus = [
    { id: 1, name: 'Safe' },
    { id: 2, name: 'PendingUploadImage' },
    { id: 3, name: 'PendingAdminConfirmation' },
    { id: 4, name: 'Stolen' },
    { id: 5, name: 'UnRegistered' }
  ];

  

  // @ViewChild('downloadButton') downloadButton: ElementRef;
  // @ViewChild('downloadOptions') downloadOptions: ElementRef;
  // @HostListener('document:click', ['$event'])
  // onClickOutside(event: MouseEvent) {
  //   const clickedInside = this.downloadOptions?.nativeElement.contains(event.target) ||
  //     this.downloadButton?.nativeElement.contains(event.target);

  //   if (!clickedInside) {
  //     this.showDownloadOptions = false;
  //   }
  // }
 
  status: mobileSelectedViewModel[] = [];
  clientGroup: mobileSelectedViewModel[] = [];

  constructor(
    public override _sharedService: SharedService,
    private _pageService: MobileService,
    private _router: Router,
    private activatedRoute: ActivatedRoute,

  ) {
    super(_sharedService);
  }

  ngOnInit(): void {
    this.initializePage();

  }
  getPhoneStatusName(statusId: number): string {
    const PhoneStatus = this.PhoneStatus.find(s => s.id === statusId);
    return PhoneStatus ? PhoneStatus.name : 'Unknown';
  }

  initializePage() {
    this.page.columns = [

      { Name: 'No', Title: '#', Selectable: true, Sortable: false },
      { Name: 'User Name', Title: 'sites.mobile.userName', Selectable: false, Sortable: true },
      { Name: 'Mobile Model', Title: 'sites.mobile.mobileModel', Selectable: false, Sortable: true },
      { Name: 'IMEI1', Title: 'IMEI1', Selectable: false, Sortable: true },
      { Name: 'IMEI2', Title: 'IMEI2', Selectable: false, Sortable: true },
      { Name: 'Phone Status', Title: 'sites.mobile.phoneStatus', Selectable: false, Sortable: true },
      { Name: 'Action', Title: 'sites.mobile.action', Selectable: false, Sortable: true },

         
    ];
    this.createSearchForm();
    this.activatedRoute.queryParams.subscribe((params) => {
      this._sharedService.getFilterationFromURL(params, this.page.searchForm);
      this.search();
    });
  }


  override createSearchForm() {
    this.page.searchForm = this._sharedService.formBuilder.group({
      SearchText: [this.searchViewModel.SearchText],
      PhoneStatus: [this.searchViewModel.PhoneStatus],
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
          this.items = response.data.items as mobileViewModel[];
        }
        this.fireEventToParent();
      });
  }

  editPhone(id: string) {
    this._router.navigate(['/sites/mobile/edit', id]);
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
  // downloadExcel() {
  //   this.showDownloadOptions = false;

  //   this._pageService.getmobileExcel(this.searchViewModel).subscribe({
  //     next: (response: Blob) => {
  //       const fileName = 'Mobile.xlsx';
  //       saveAs(response, fileName);
  //     },
  //     error: (err) => {
  //       this._sharedService.showToastr(err);
  //     },
  //   });
  // }
  // downloadPDF() {
  //   this.showDownloadOptions = false;
  //   this.page.isSearching = true;

  //   this._pageService
  //     .get(
  //       this.searchViewModel,
  //       this.page.orderBy,
  //       this.page.isAscending,
  //       this.page.options.currentPage,
  //       this.records
  //     )
  //     .subscribe((response) => {
  //       this.page.isSearching = false;

  //       if (response.isSuccess) {
  //         this.page.isAllSelected = false;
  //         this.confingPagination(response);
  //         this.items = response.data.items as mobileViewModel[];
  //         this.records = response.data.records;

  //         // Now generate the PDF after fetching the data
  //         this.generatePDF();
  //       }

  //       this.fireEventToParent();
  //     });
  // }

  // generatePDF() {
  //   const doc = new jsPDF({
  //     orientation: "landscape", // Wider layout for large tables
  //     unit: "mm",
  //     format: "a4",
  //   });

  //   // Title Styling
  //   doc.setFontSize(18);
  //   doc.text("Customers List", 14, 15);

  //   // Table Headers
  //   const headers = [
  //     [
  //       "No",
  //       "Name",
  //       "Activation",
  //       "Email",
  //       "Verify Status",
  //       "National Number",
  //       "Mobile",
  //     ],
  //   ];

  //   // Table Data
  //   const data = this.items.map((item, index) => [
  //     index + 1,
  //     item.name,
  //     item.isActive ? "Active" : "Inactive",
  //     item.email,
  //     this.getVerifyStatusName(Number(item.verifyStatus)),
  //     item.nationalNumber,
  //     item.mobile,
  //   ]);

  //   // Generate Table with Better Formatting
  //   autoTable(doc, {
  //     head: headers,
  //     body: data,
  //     startY: 25, // Start table below title
  //     theme: "grid", // Adds borders
  //     styles: {
  //       fontSize: 10, // Reduce font size
  //       cellPadding: 2, // Adjust spacing
  //     },
  //     headStyles: {
  //       fillColor: [44, 62, 80], // Dark blue header
  //       textColor: [255, 255, 255], // White text
  //       fontSize: 11,
  //     },
  //     columnStyles: {
  //       0: { cellWidth: 10 }, // No
  //       1: { cellWidth: 30 }, // Name
  //       2: { cellWidth: 20 }, // Activation
  //       3: { cellWidth: 40 }, // Email
  //       4: { cellWidth: 20 }, // Verify Status
  //       5: { cellWidth: 25 }, // National Number
  //       6: { cellWidth: 25 }, // Mobile
  //     },
  //     margin: { top: 20 },
  //     pageBreak: "auto", // Automatically insert page breaks
  //   });

  //   // Save PDF
  //   doc.save("customers.pdf");
  // }

  toggleDownloadOptions() {
    this.showDownloadOptions = !this.showDownloadOptions;
  }

  @ViewChild('confirmDeleteTemplate', { static: false }) confirmDeleteTemplate: any;
  showDeleteConfirmation(selectedItem: mobileViewModel) {
    this.selectedItem = selectedItem;
    this.modalRef = this._sharedService.modalService.show(this.confirmDeleteTemplate, { class: 'modal-sm' });
  }



  remove() {
    this._pageService.remove(this.selectedItem).subscribe(res => {
      this._sharedService.showToastr(res)
      if (res.isSuccess) {
        let index = this.items.findIndex(x => x.id == this.selectedItem.id);
        this.items.splice(index, 1);
        this.search();
      }
    })
  }
  @ViewChild('confirmDeleteTemplates', { static: false }) confirmDeleteTemplates: any;
  showDeleteConfirmations(selectedItem: mobileViewModel) {
    this.selectedItem = selectedItem;
    this.modalRef = this._sharedService.modalService.show(this.confirmDeleteTemplates, { class: 'modal-sm' });
  }


  deleteSelectedPhones() {
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

}


