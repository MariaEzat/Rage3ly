import { Component } from '@angular/core';
import { requestToStolenPhone } from '../../interface/request';
import { RequestService } from '../../service/request.service';
import { SharedService } from 'src/app/shared/service/shared.service';
import { CRUDIndexPage } from 'src/app/shared/models/crud-index.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  page: CRUDIndexPage = new CRUDIndexPage();
  loading = true;
  mobiles: requestToStolenPhone[] = [];
  RequestStatus = [
    { id: 1, name: 'Pending ' },
    { id: 2, name: 'Approved' },
    { id: 3, name: 'Rejected' }
  ];

  constructor(private requestService: RequestService , public _sharedService: SharedService,) {}

  ngOnInit() {
    this.loadMobileRequests();
  }

  loadMobileRequests() {
    this.requestService.get('phoneModel', true, 1, 10).subscribe({
      next: (response: any) => {
        console.log(response)
        this.mobiles = response.data.items;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
       
      }
    });
  }

  getStatusName(status: number): string {

    const PhoneStatus = this.RequestStatus.find(s => s.id === status);
    return PhoneStatus ? PhoneStatus.name : 'Unknown';
  }


  openImage(path: string): void {
    const fullImageUrl = 'https://api.rage3ly.com/' + path;
    window.open(fullImageUrl, '_blank');
  }
  

  acceptRequest(id: string) {
    this.page.isSaving = true;
    this.requestService.Approved(id).subscribe({
      next: (response) => {
        this.page.isSaving = false;
        if (response.isSuccess) {
          this._sharedService.showToastr(response);
          this.loadMobileRequests();
        }
      },
      error: (error) => {
        this.page.isSaving = false;
        this._sharedService.showToastr(error);
      }
    });
  }
  
  
  
  rejectRequest(mobile: requestToStolenPhone) {
    const reason = prompt("Enter reason for rejection:");
    if (reason) {
      const body = {
        id: mobile.iD, 
        reason
      };
      this.requestService.Rejected(body).subscribe({
        next: () => {
          this.loadMobileRequests();
        },
        error: (err) => {
          console.error('Error rejecting request:', err);
        }
      });
    }
  }
  

}
