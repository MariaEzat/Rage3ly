import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudIndexBaseUtils } from 'src/app/shared/classes/crud-index.utils';
import { CRUDIndexPage } from 'src/app/shared/models/crud-index.model';
import { SharedService } from 'src/app/shared/service/shared.service';
import { BrandService } from '../../../brand/service/brand.service';
import { MostUsedGovernoratesRatioViewModel } from '../../interface/dashboard';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-see-all',
  templateUrl: './see-all.component.html',
  styleUrls: ['./see-all.component.css']
})
export class SeeAllComponent extends CrudIndexBaseUtils{
 override page: CRUDIndexPage = new CRUDIndexPage();
 override items: MostUsedGovernoratesRatioViewModel[] = [];

  constructor(public override _sharedService: SharedService,
     private _pageService: DashboardService, private _router: Router, private activatedRoute: ActivatedRoute
 
   ) {
     super(_sharedService);
   }
   ngOnInit(): void {
    this.initializePage();
  }
  
   initializePage() {
    this.page.columns = [
      { Name: "No", Title: "#", Selectable: true, Sortable: false },
      { Name: "governorateName", Title: "sites.dashboard.governorateName", Selectable: false, Sortable: true },
      { Name: "clientCount", Title: "sites.dashboard.clientCount", Selectable: false, Sortable: true },
   
    ];
  
    this.search();
  }


   override search() {
      this.page.isSearching = true;
      this.items = [];
      this._pageService.getMostUsedGovernorates( this.page.orderBy, this.page.isAscending, this.page.options.currentPage, this.page.options.itemsPerPage).subscribe(response => {
  
        this.page.isSearching = false;
        if (response.isSuccess) {
          console.log(response);
          this.page.isAllSelected = false;
          this.confingPagination(response)
          this.items = response.data.items as MostUsedGovernoratesRatioViewModel[];
  
        }
        this.fireEventToParent()
      });
    }
  

    onBackToDashboard() 
    {
      this._router.navigate(['/sites/dashboard']);
    }
}
