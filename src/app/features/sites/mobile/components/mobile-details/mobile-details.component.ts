import { MobileService } from './../../service/mobile.service';
import { Component, OnInit } from '@angular/core';
import { CRUDIndexPage } from 'src/app/shared/models/crud-index.model';
import { SharedService } from 'src/app/shared/service/shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mobile-details',
  templateUrl: './mobile-details.component.html',
  styleUrls: ['./mobile-details.component.css'],
})
export class MobileDetailsComponent implements OnInit {
  mobile: any ;
  page: CRUDIndexPage = new CRUDIndexPage();
  id: string;

  constructor(
    private _sharedService: SharedService,
    private _mobileService: MobileService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = sessionStorage.getItem('mobileId');
    if (this.id) {
      this.getMobileDetailsById(this.id);
    } else {
      console.error('No Mobile ID provided');
    }
  }


   getMobileDetailsById(id: string): void {
    this._mobileService.getById(id).subscribe({
      next: (res) => {
        this.mobile = res.data; // Adjust if key differs
        console.log(this.mobile)
      },
      error: (err) => {
        console.error('Error fetching client details:', err);
      }
    });
  }
}
