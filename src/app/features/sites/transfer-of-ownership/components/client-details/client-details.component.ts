import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/service/shared.service';
import { TransferOfOwnershipService } from '../../service/transfer-of-ownership.service';
import { TransferOfOwnershipViewModel, ClientDetailsViewModel } from '../../interface/transfer-of-ownership';
import { CRUDIndexPage } from 'src/app/shared/models/crud-index.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  client: ClientDetailsViewModel = new ClientDetailsViewModel();
  mobiles: TransferOfOwnershipViewModel[] = [];
  page: CRUDIndexPage = new CRUDIndexPage();
  id: string;
  RequestStatus = [
    { id: 1, name: 'Safe' },
    { id: 2, name: 'PendingUploadImage' },
    { id: 3, name: 'PendingAdminConfirmation' },
    { id: 4, name: 'Stolen' },
    { id: 5, name: 'NotSure' },
    { id: 6, name: 'UnRegistered' }

  ];

  constructor(
    private _sharedService: SharedService,
    private _transferService: TransferOfOwnershipService,
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
 

    this.id = this._sharedService.getTempClientId();

  if (this.id) {
    this.getClientDetailsById(this.id);
  } else {
    console.error('No client ID provided');
  }
  }


  getClientDetailsById(id: string): void {
    this._transferService.getById(id).subscribe({
      next: (res) => {
        this.client = res.data;
        this.mobiles = res.data.mobiles; // Adjust if key differs
      },
      error: (err) => {
        console.error('Error fetching client details:', err);
      }
    });
  }




  getStatusName(status: number): string {

    const PhoneStatus = this.RequestStatus.find(s => s.id === status);
    return PhoneStatus ? PhoneStatus.name : 'Unknown';
  }

  openImage(path: string): void {
    window.open('https://api.rage3ly.com/' + path, '_blank');
  }

   getImageUrl(imagePath: string): string {
      return `${environment.api}/` + imagePath;
    }
}
