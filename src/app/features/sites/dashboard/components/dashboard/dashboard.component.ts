import { Component } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { DashboardService } from '../../service/dashboard.service';
import { dashboardStatisticsViewModel, mostSearchClientsViewModel, MostUsedGovernoratesRatioViewModel, MostUsedGovernoratesViewModel } from '../../interface/dashboard';
import { CRUDIndexPage } from 'src/app/shared/models/crud-index.model';
import { CrudIndexBaseUtils } from 'src/app/shared/classes/crud-index.utils';
import { SharedService } from 'src/app/shared/service/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends CrudIndexBaseUtils {
  override page: CRUDIndexPage = new CRUDIndexPage();
  regionsCount = 0;
  usersCount = 0;
  phonesCount = 0;
  returnedPhones=0;
  brandsBarData: any;
  governoratesBarData: any;
  stolenPhoneData: any;
  totalPhones: number = 0;
  stolenPhones: number = 0;
  stolenPercentage: number = 0;
  phonesDonutData :any;
  topRegionsDonutData: any;
  totalNumberOfClients: number = 0;

  override items: mostSearchClientsViewModel[] = [];

  ngOnInit(): void {
    this.initializePage();
    this.getDashboardStatistics();
    this.getPhoneBrandData();
    this.getGovernoratePhoneRatio();
    this.getStolenPhoneRatio();
    this.getMostSearchedClients();
    this.getMostUsedGovernoratesRatio();
  }
  constructor( public override _sharedService: SharedService,  private _router: Router,
      private activatedRoute: ActivatedRoute,
  private _DashboardService: DashboardService) {
    super(_sharedService);
  }



  initializePage() {
    this.page.columns = [

      { Name: 'No', Title: '#', Selectable: true, Sortable: false },
      { Name: 'ClientName ', Title: 'sites.dashboard.clientName', Selectable: false, Sortable: true },
      { Name: 'IP', Title: 'sites.dashboard.ip', Selectable: false, Sortable: true },
      { Name: 'Port', Title: 'sites.dashboard.port', Selectable: false, Sortable: true },
      { Name: "Latitude & Longitude ", Title: "sites.search.Latitude & Longitude", Selectable: false, Sortable: true },
      { Name: 'searchCount', Title: 'sites.dashboard.searchCount', Selectable: false, Sortable: true },
    ];
    this.createSearchForm();
   
    this.activatedRoute.queryParams.subscribe((params) => {
      this._sharedService.getFilterationFromURL(params, this.page.searchForm);
      this.search();
    });
  }


  getDashboardStatistics() {
    this._DashboardService.getAllStatistics().subscribe((res) => {

      this.regionsCount = res.data.governorateCount;
      this.usersCount = res.data.clientCount;
      this.phonesCount = res.data.phoneCount;
      this.returnedPhones = res.data.returnedPhones;
    });

  }


  getPhoneBrandData(): void {
    this._DashboardService.getAllPhoneBrands().subscribe((res) => {
      const brands = res.data;

      const labels = brands.map(brand => brand.brandName);
      const data = brands.map(brand => brand.phoneCount);

      this.brandsBarData = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: ['#EB762C', '#9454C6', '#0075FF', '#49A7C9'],
            barThickness: 25,
            borderRadius: 5
          }
        ]
      };
    });
  }


  getGovernoratePhoneRatio(): void {
    this._DashboardService.getAllGovernoratePhoneRatio().subscribe((res) => {
      const governorates = res.data;

      const labels = governorates.map(gov => gov.governorateName);
      const data = governorates.map(gov => gov.phoneCount);

      this.governoratesBarData = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: ['#FF5E5B', '#FFC107','#B771E5','#00C49A'],
            barThickness: 25,
            borderRadius: 5
          }
        ]
      };
    });
  }


  getStolenPhoneRatio(): void {
    this._DashboardService.getStolenPhoneRatio().subscribe((res) => {
      const data = res.data;

      this.phonesDonutData = {
        labels: ['الهواتف المسجلة', 'الهواتف المسروقة'],
        datasets: [
          {
            data: [data.numberOfRegisteredPhones, data.numberOfStolenPhone],
            backgroundColor: [ '#61647666','#0075FF'],
            borderColor: [ '#61647666','#0075FF'],
            borderWidth: 1
          }
        ]
      };
      this.totalPhones = data.numberOfRegisteredPhones;
      this.stolenPhones = data.numberOfStolenPhone;
      this.stolenPercentage = data.percentageOfStolenPhone;
    });
  }



  getMostSearchedClients(): void {
    this._DashboardService
      .getMostSearchClients(this.page.orderBy, this.page.isAscending, this.page.options.currentPage, this.page.options.itemsPerPage)
      .subscribe((res) => {
        this.items = res.data.items; 
        this.page.options.totalItems = res.data.totalCount; 
      });
  }

  getMostUsedGovernoratesRatio(): void {
    this._DashboardService.getMostUsedGovernoratesRatio().subscribe((res) => {
      const formatted: MostUsedGovernoratesViewModel = {
        totalNumberOfClients: res.data.totalNumberOfClients,
        mostUsedGovernoratesRatio: res.data.mostUsedGovernorates
      };
  
      const labels = formatted.mostUsedGovernoratesRatio.map((g) => g.governorateName);
      const data = formatted.mostUsedGovernoratesRatio.map((g) => g.clientCount);
  
      this.totalNumberOfClients = formatted.totalNumberOfClients;
  
      this.topRegionsDonutData = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: ['#EB762C', '#49A7C9', '#0075FF', '#12B76A', '#9454C6'],
            borderColor: ['#EB762C', '#49A7C9', '#0075FF', '#12B76A', '#9454C6'],
            borderWidth: 1
          }
        ]
      };
    });
  }
  
  donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white',
          font: {
            family: 'Zain',
            size: 14
          }
        }
      },
      tooltip: {
        bodyFont: {
          family: 'Zain',
          size: 18
        },
        titleFont: {
          family: 'Zain',
          size: 18
        }
      }
    }
  };
  

  barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: 'white',
          font: {
            family: 'Zain',
            size: 18
          }
        }
      },
      y: {
        ticks: {
          color: 'white',
          font: {
            family: 'Zain',
            size: 18
          },
          stepSize: 1
        },
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            family: 'Zain'
          }
        }
      },
      tooltip: {
        bodyFont: {
          family: 'Zain'
        },
        titleFont: {
          family: 'Zain'
        }
      }
    }
  };
  
  onSeeAllClick(): void {

    this._router.navigate(['/sites/dashboard/seeAll']);
  }
  

}
