import { Component } from '@angular/core';
import { requestToStolenPhone } from '../../interface/request';
import { RequestService } from '../../service/request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loading = true;
  mobiles: requestToStolenPhone[] = [];
  RequestStatus = [
    { id: 1, name: 'Pending ' },
    { id: 2, name: 'Approved' },
    { id: 3, name: 'Rejected' }
  ];

  constructor(private requestService: RequestService) {}

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
  
}
