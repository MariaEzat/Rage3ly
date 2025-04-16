import { Component, OnInit } from '@angular/core';
import { CustomerMobileService } from '../../../customer-mobile/service/customer-mobile.service';
import { CustomerMobile } from '../../interface/customer-mobile';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mobiles: CustomerMobile[] = [];
  loading = true;
  PhoneStatusList = [
    { id: 1, name: 'safe' },
    { id: 2, name: 'PendingUploadImage' },
    { id: 3, name: 'PendingAdminConfirmation' },
    { id: 4, name: 'Stolen' },
    { id: 5, name: 'UnRegistered' }
  ];
  

  constructor(private customerMobileService: CustomerMobileService) { }

  ngOnInit(): void {
    this.getMobiles();
  }

  getMobiles(): void {
    const searchViewModel = {};
    const orderBy = 'clientName';
    const isAscending = true;

    this.customerMobileService
      .get(searchViewModel, orderBy, isAscending)
      .subscribe({
        next: (res: any) => {
          console.log(res.data)
          this.mobiles = res.data || [];
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to fetch mobiles', err);
          this.loading = false;
        }
      });
  }
  getStatusName(statusId: number): string {
    const found = this.PhoneStatusList.find(item => item.id === statusId);
    return found ? found.name : 'غير معروف';
  }
  
}
