import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CRUDIndexPage } from 'src/app/shared/models/crud-index.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SharedService } from 'src/app/shared/service/shared.service';
import { ProductService } from 'src/app/features/sites/Product/service/product.service';
import { categorySelectedItem, pointActivateViewModel, productActivateViewModel, productSearchViewModel, productViewModel, reStockViewModel, subCategorySelectedItem } from '../../interfaces/product';
import { CrudIndexBaseUtils } from 'src/app/shared/classes/crud-index.utils';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends CrudIndexBaseUtils {
  override page: CRUDIndexPage = new CRUDIndexPage();
  override pageRoute = '/sites/product';
  override searchViewModel: productSearchViewModel = new productSearchViewModel();
  modalRef: BsModalRef;
  override items: productViewModel[] = [];
  selectedItem: productViewModel;
  categories: categorySelectedItem[] = [];
  subCategories: any[] = [];
  selectedCategoryId: string = '';
  showDownloadOptions = false;
  records: number;
  activation: productActivateViewModel = { id: ''};
  activationPoint: pointActivateViewModel = { id: ''};
  statuses = [
    { id: true, name: 'on' },
    { id: false, name: 'off' }
  ];
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
  restockQuantity: number = 1;
  selectedProduct: productViewModel;

  constructor(
    public override _sharedService: SharedService,
    private _productService: ProductService,
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private toastr:ToastrService
  ) {
    super(_sharedService);
  }

  ngOnInit(): void {
    this.initializePage();
  }

  initializePage() {
    this.page.columns = [
    
      { Name: "No", Title: "#", Selectable: true, Sortable: false },
      { Name: "productName", Title: "Product Name", Selectable: false, Sortable: true },
      { Name: "categoryName", Title: "category Name", Selectable: false, Sortable: true },
      { Name: "subcategoryName", Title: "Sub Category", Selectable: false, Sortable: true },
      { Name: "price", Title: "Price (EGP)", Selectable: false, Sortable: true },
      { Name: "quantity", Title: "Quantity", Selectable: false, Sortable: true },
      { Name: "imagePath", Title: "Image ", Selectable: false, Sortable: true },
      { Name: "isActive", Title: "Activation ", Selectable: false, Sortable: true },
      { Name: "isActivePoint", Title: "Activation point ", Selectable: false, Sortable: true },
      { Name: "Action", Title: "Action", Selectable: false, Sortable: true },
    ];

    forkJoin([this._productService.getCategories()]).subscribe((res) => {
      this.categories = res[0].data;
    });
    this.createSearchForm();
    this.activatedRoute.queryParams.subscribe(params => {
      this._sharedService.getFilterationFromURL(params, this.page.searchForm)
      this.search();
    });
  }
  override createSearchForm() {
    this.page.searchForm = this._sharedService.formBuilder.group({
      ProductName: [this.searchViewModel.ProductName],
      CategoryId: [this.searchViewModel.CategoryId],
      SubcategoryId: [this.searchViewModel.SubcategoryId],
      IsActive: [this.searchViewModel.IsActive],
    });

    this.page.isPageLoaded = true;
  }

  override search() {
    this.page.isSearching = true;
    this.items = [];
    Object.assign(this.searchViewModel, this.page.searchForm.value);
    this._productService.get(this.searchViewModel, this.page.orderBy, this.page.isAscending, this.page.options.currentPage, this.page.options.itemsPerPage).subscribe(response => {
      this.page.isSearching = false;
      if (response.isSuccess) {
        this.page.isAllSelected = false;
        this.confingPagination(response)
        this.items = response.data.items as productViewModel[];
      }
      this.fireEventToParent()
    });
  }

  // Region: Remove Product
  @ViewChild('confirmDeleteTemplate', { static: false }) confirmDeleteTemplate: any;

  showDeleteConfirmation(selectedItem: productViewModel) {
    this.selectedItem = selectedItem;
    this.modalRef = this._sharedService.modalService.show(this.confirmDeleteTemplate, { class: 'modal-sm' });
  }

  remove() {
    this._productService.remove(this.selectedItem).subscribe(res => {
      if (res.isSuccess) {
        this._sharedService.showToastr(res);
        this.items = this.items.filter(item => item.id !== this.selectedItem.id);
      }
      else{
        this._sharedService.showToastr(res);
      }
    });
  }

  editProduct(id: string) {
    this._router.navigate(['/sites/product/edit', id]);
  }

  navigateToCreateProduct() {
    this._router.navigate(['/sites/product/create']);
  }


  getImageUrl(imagePath: string): string {
    return `${environment.api}/` + imagePath;
  }




  onCategoryChange(CategoryId: string) {
    this.selectedCategoryId = CategoryId;
    this.page.searchForm.patchValue({ CategoryId: CategoryId });
    this.loadSubCategories(CategoryId);

  }

  loadSubCategories(categoryId: string) {
    this.subCategories = [];
    if (!categoryId) return;

    this._productService.getSubCategories(categoryId).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.subCategories = res.data;
        } else {
          this.subCategories = [];
        }
      },
      error: (err) => {
        this.subCategories = [];
      }
    });
  }

  @ViewChild('confirmDeleteTemplates', { static: false }) confirmDeleteTemplates: any;
  showDeleteConfirmations(selectedItem: productViewModel) {
    this.selectedItem = selectedItem;
    this.modalRef = this._sharedService.modalService.show(this.confirmDeleteTemplates, { class: 'modal-sm' });
  }


  deleteSelectedProducts() {
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
        this._productService.bulkDelete(selectedIds).subscribe({
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
  downloadExcel() {
    this.showDownloadOptions = false;

    this._productService.getProductsExcel(this.searchViewModel).subscribe({
      next: (response: Blob) => {
        const fileName = 'Products.xlsx';
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
  
    this._productService
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
          this.items = response.data.items as productViewModel[];
          this.records = response.data.records;
  
          // Now generate the PDF after fetching the data
          this.generatePDF();
        }
  
        this.fireEventToParent();
      });
  }

  openRestockModal(product: productViewModel, template: any) {
    this.selectedProduct = product;
    this.restockQuantity = 1; 
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  generatePDF() {
    const doc = new jsPDF();
  
    // Title
    doc.setFontSize(18);
    doc.text('Products List', 14, 15);
  
    // Table Headers
    const headers = [['No', 'Product Name', 'Category', 'Subcategory', 'Price (EGP)', 'Quantity']];
  
    // Table Data
    const data = this.items.map((item, index) => [
      index + 1,
      item.productName,
      item.categoryName,
      item.subcategoryName,
      item.price,
      item.quantity
    ]);
  
    // Generate Table
    autoTable(doc, {
      head: headers,
      body: data,
      startY: 20
    });
  
    // Save the PDF
    doc.save('products.pdf');
  }
  
  toggleDownloadOptions() {
    this.showDownloadOptions = !this.showDownloadOptions;
  }


  confirmRestock() {
    if (this.restockQuantity < 1) {
      this.toastr.warning("Please enter a valid quantity", "Warning");
      return;
    }
  
    const body: reStockViewModel = {
      productID: this.selectedProduct.id,
      quantity: this.restockQuantity
    };
  
    this._productService.reStock(body).subscribe({
      next: (response) => {
        this._sharedService.showToastr(response);
        if (response.isSuccess) {
          this.selectedProduct.quantity += body.quantity; // Update UI
          this.modalRef.hide();
          this.search(); 
        }
      },
      error: (error) => {
        this._sharedService.showToastr(error);
      }
    });
  }
   updateActivation(item: productViewModel, isActive: boolean) {
      this.page.isSaving = true
      this.activation.id = item.id;
      const updateObservable = isActive ? this._productService.updateActivated(this.activation) : this._productService.updateDeactivated(this.activation);
  
      updateObservable.subscribe({
        next: (response) => {
          this.page.isSaving = false
          this._sharedService.showToastr(response);
          if (response.isSuccess) {
            item.isActive = !item.isActive
            this.search();
          } 
        },
        error: (error) => {
          this.page.isSaving = true
          this._sharedService.showToastr(error);
        },
      });
    }

    updateActivationPoint(item: productViewModel, isActivePoint: boolean) {
      this.page.isSaving = true
      this.activationPoint.id = item.id;
      const updateObservable = isActivePoint ? this._productService.updateActivatedpoint(this.activationPoint) : this._productService.updateDeactivatedPoint(this.activationPoint);
  
      updateObservable.subscribe({
        next: (response) => {
          this.page.isSaving = false
          this._sharedService.showToastr(response);
          if (response.isSuccess) {
            item.isActivePoint = !item.isActivePoint
            this.search();
          } 
        },
        error: (error) => {
          this.page.isSaving = true
          this._sharedService.showToastr(error);
        },
      });
    }


    activateProducts() {
      const selectedIds = this.items
        .filter(item => item.selected)
        .map(item => item.id);
    
      if (selectedIds.length > 0) {
        this._productService.bulkActivate(selectedIds).subscribe(response => {
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
    
    disActiveProducts() {
      const selectedIds = this.items
        .filter(item => item.selected)
        .map(item => item.id);
    
      if (selectedIds.length > 0) {
        this._productService.bulkDeactivate(selectedIds).subscribe(response => {
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
    toggleSelectAll(event: any): void {
      const isChecked = event.target.checked;
      this.items.forEach(item => {
        item.selected = isChecked;
      });
    }
}


  // reStock(product: productViewModel) {
  //   this._productService.reStock(product).subscribe({
  //     next: (response) => {
  //       this._sharedService.showToastr(response);
  //       if (response.isSuccess) {
  //         product.quantity = 10; 
  //       }
  //     },
  //     error: (error) => {
  //       this._sharedService.showToastr(error);
  //     }
  //   });
  // }
  
