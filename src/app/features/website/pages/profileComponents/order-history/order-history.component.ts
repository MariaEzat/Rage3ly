import { Component } from '@angular/core';
import { orderHistoryViewModel } from '../../../models/order.model';
import { ApiService } from 'src/app/shared/service/api.service';
import { WebsiteService } from '../../../services/website.service';
import { SharedService } from 'src/app/shared/service/shared.service';
import { CRUDIndexPage } from 'src/app/shared/models/crud-index.model';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {
  orders: orderHistoryViewModel[] = [];
  page: CRUDIndexPage = new CRUDIndexPage();
  orderStatuslist = [
    { id: 1, name: 'Pending' },
    { id: 2, name: 'InProcess' },
    { id: 3, name: 'Confirmed' },
    { id: 4, name: 'Cancelled' },
    { id: 5, name: 'Delivered' },
    { id: 6, name: 'Completed' },

  ];
  constructor(private apiService: ApiService, private _WebsiteService: WebsiteService, private _SharedService: SharedService) { }

  ngOnInit(): void {
    this.getOrderHistory();
  }

  getOrderHistory(): void {
    this._WebsiteService.getOrderHistory(this.page.options.currentPage, this.page.options.itemsPerPage)
      .subscribe((response) => {
        this.orders = response.data.items;
      }, error => {
        console.error('Error fetching order history:', error);
      });
  }

  getOrderStatusName(statusId: number): string {
    const status = this.orderStatuslist.find(s => s.id === Number(statusId));
    return status ? status.name : 'Unknown';
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
  reOrder(orderId: string): void {
    this._WebsiteService.reOrder(orderId)
      .subscribe(
        (response) => {
          this._SharedService.showToastr(response);
        },
        (error) => {
          this._SharedService.showToastr(error);
        }
      );
  }
}


