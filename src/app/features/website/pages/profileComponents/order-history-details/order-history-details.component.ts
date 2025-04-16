
import { ChangeDetectorRef, Component } from '@angular/core';
import { CrudIndexBaseUtils } from 'src/app/shared/classes/crud-index.utils';
import { CRUDIndexPage } from 'src/app/shared/models/crud-index.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SharedService } from 'src/app/shared/service/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
import { orderDetailsViewModel } from '../../../models/order.model';
import { WebsiteService } from '../../../services/website.service';
@Component({
  selector: 'app-order-history-details',
  templateUrl: './order-history-details.component.html',
  styleUrls: ['./order-history-details.component.css']
})
export class OrderHistoryDetailsComponent {
  previousRoute: string ='';
page: CRUDIndexPage = new CRUDIndexPage();
  orderDetails: orderDetailsViewModel;
  isLoading = true;
  modalRef: BsModalRef;
  orderNumber: string;
  errorMessage: string;
  orderStatuslist = [
    { id: 1, name: 'Pending' },
    { id: 2, name: 'InProcess' },
    { id: 3, name: 'Confirmed' },
    {id:4,name:'Cancelled'}, 
    {id:5,name:'Delivered'}, 
    {id:6,name:'Completed'}, 
  ];
  orderId:string;
  constructor(
    public _sharedService: SharedService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
   private _WebsiteService: WebsiteService

  ) {
   

  }


  ngOnInit(): void {
    // Capture the current order number from the route
    this._activatedRoute.paramMap.subscribe((params) => {
      if (params.has('orderNumber')) {
        this.orderNumber = params.get('orderNumber');
      }
    });


    this._activatedRoute.queryParamMap.subscribe(params => {
      const fromPage = params.get('from');
      this.previousRoute = fromPage === 'orderHistory' ? '/tahwesha/orderHistory' : 
                           fromPage === 'invoices' ? '/tahwesha/invoices' : '';
    });

   
    this.loadOrderDetails();

   
  }

  loadOrderDetails(): void {
    const orderNumber = this._activatedRoute.snapshot.paramMap.get('orderNumber'); 
    if (!orderNumber) {
      this.errorMessage = 'Order number not provided';
      this.isLoading = false;
      return;
    }

    this._WebsiteService.getByOrderNumber(orderNumber).subscribe({
      next: (res) => {
        console.log(res)
        this.orderId=res.data.orderId;   
        this.orderDetails = res.data;
       
        this.isLoading = false;
      },
      error: (err) => {
        this._sharedService.showToastr(err);
        this.isLoading = false;
      },
    });
  }

  getOrderStatusName(statusId: number): string {
    const status = this.orderStatuslist.find(s => s.id === Number(statusId));
    return status ? status.name : 'Unknown';
  }
  numberOnly(event: any) {
    return this._sharedService.numberOnly(event);
  }
  
  getImageUrl(imagePath: string): string {
    return `${environment.api}/` + imagePath;
  }
  Print() {
    const originalContent = document.body.innerHTML;
    const printContent = document.getElementById('print-section')?.innerHTML;
  
    if (printContent) {
      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload(); 
    }
  }

  getStatusStyle(status: number): { [key: string]: string } {
    switch (status) {
      case 1: return { color: '#eb762c' };
      case 2: return { color: '#717BBC' };
      case 3: return { color: '#12b76a' };
      case 4: return { color: '#f04438' };
      case 5: return { color: '#a6f4c5' };
      default: return { color: '#717680' };
    }
  }
  getTotalQuantity(): number {
    return this.orderDetails?.orderItems?.reduce((total, item) => total + item.quantity, 0) || 0;
  }
  onCancel(): void {
    this._router.navigate([this.previousRoute || '/tahwesha/orderHistory']);
  }
  

  reOrder(orderId: string): void {
    this._WebsiteService.reOrder(orderId)
      .subscribe(
        (response) => {
         this._sharedService.showToastr(response);
        },
        (error) => {
          this._sharedService.showToastr(error);
        }
      );
  }
}
