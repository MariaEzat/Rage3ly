import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/service/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _apiService: ApiService) { }

  getAllStatistics() {
    return this._apiService.get(`/DashboardStatisticsEndpoint/DashboardStatistics`);
  }

  getAllPhoneBrands() {
    return this._apiService.get(`/PhoneBrandRatioEndPoint/PhoneBrandRatio`);
  }

  getAllGovernoratePhoneRatio() {
    return this._apiService.get(`/GovernoratePhoneRatioEndPoint/GovernoratePhoneRatio`);
  }
  getStolenPhoneRatio() {
    return this._apiService.get(`/GetStolenPhoneRatioEndPoint/GetStolenPhoneRatio`);
  }
  getMostUsedGovernoratesRatio() {
    return this._apiService.get(`/MostUsedGovernoratesRatioEndpoint/MostUsedGovernoratesRatio`);
  }
  getMostUsedGovernorates(orderBy: string, isAscending: boolean, pageIndex: number = 1, pageSize: number = 100) {
    if (pageSize == 0)
      pageSize = environment.pageSize;
    let params = new HttpParams();

    return this._apiService.get(`/MostUsedGovernoratesEndpoint/MostUsedGovernorates?orderBy=${orderBy}&isAscending=${isAscending}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  getMostSearchClients(orderBy: string, isAscending: boolean, pageIndex: number = 1, pageSize: number = 100) {
    if (pageSize == 0)
      pageSize = environment.pageSize;
    let params = new HttpParams();


    return this._apiService.get(`/GetMostSearchClientsEndPoint/GetMostSearchClients?orderBy=${orderBy}&isAscending=${isAscending}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  getStolenPhonesInCities() {
    return this._apiService.get(`/StolenPhonesByCitiesEndpoint/StolenPhonesByCities`);
  }


  getStolenPhonesInGovernorates() {
    return this._apiService.get(`/StolenPhonesByGovernorateEndPoint/StolenPhonesByGovernorate`);
  }

}
