import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/service/shared.service';
import { TransferOfOwnershipService } from '../../service/transfer-of-ownership.service';
import { TransferOfOwnershipViewModel, ClientDetailsViewModel } from '../../interface/transfer-of-ownership';
import { CRUDIndexPage } from 'src/app/shared/models/crud-index.model';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  client: ClientDetailsViewModel = new ClientDetailsViewModel();
  mobiles: TransferOfOwnershipViewModel[] = [];
  page: CRUDIndexPage = new CRUDIndexPage();
id:string;
  RequestStatus = [
    { id: 1, name: 'sites.ownership.pending' },
    { id: 2, name: 'sites.ownership.approved' },
    { id: 3, name: 'sites.ownership.editImageRequest' },
    { id: 4, name: 'sites.ownership.rejected' }
  ];

  constructor(
    private _sharedService: SharedService,
    private _transferService: TransferOfOwnershipService,
    private _activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.id = params.get('id');
      }
    });
    this.getClientDetailsById(this.id);
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

  // clientDetails(id: string): void {
  //   this._sharedService.navigateWithQueryParams('/clients/details', { ID: id });
  // }
}
