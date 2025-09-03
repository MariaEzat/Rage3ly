import { Injectable } from '@angular/core';
import { cityActivateViewModel, cityCreateViewModel, citySearchViewModel, cityViewModel } from '../interface/city';
import { ApiService } from 'src/app/shared/service/api.service';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private _apiService: ApiService) { }

  get(searchViewModel: citySearchViewModel, orderBy: string, isAscending: boolean, pageIndex: number, pageSize: number = 0) {
    if (pageSize == 0)
      pageSize = environment.pageSize;

    let params = new HttpParams();
    if (searchViewModel.GovernorateId) {
      params = params.set("GovernorateId", searchViewModel.GovernorateId);
    }
    if (searchViewModel.CityName) {
      params = params.set("CityName", searchViewModel.CityName);
    }
  
    return this._apiService.get(`/GetByCityNameOrGovernNameEndPoint/GetByName?orderBy=${orderBy}&isAscending=${isAscending}&pageIndex=${pageIndex}&pageSize=${pageSize}`, params);
  }

  getById(ID: string) {
    return this._apiService.get(`/GetCityByIDEndPoint/GetCityByID?ID=${ID}`,);
  }

  remove(body:cityViewModel) {
    return this._apiService.remove(`/DeleteCityEndPoint/Delete`,body);
  }

  postOrUpdate(body:cityCreateViewModel ) {
    if (body.id) return this._apiService.update(`/EditCityEndPoint/Post`, body)
    else return this._apiService.post(`/CreateCityEndPoint/Post`, body)
  }
  getGovernorates() {
    return this._apiService.get('/GetDropdownListGovernorateEndPoint/GetDropdownList');
  }
  updateActivated(body:cityActivateViewModel ) {
   
    return this._apiService.update(`/ActiveCityEndpoint/Active`,body);
  }
  updateDeactivated(body:cityActivateViewModel) {
    return this._apiService.update(`/DeactiveCityEndpoint/Deactive`,body);
  }
  bulkDelete(ids: string[]) {
		return this._apiService.remove(`/BulkDeleteCityEndPoint/BulkDeleteCity`, { ids });
	}
	bulkActivate(ids: string[]) {
		return this._apiService.update(`/BulkActivateCityEndPoint/BulkActivateCity`, { ids });
	}
	bulkDeactivate(ids: string[]) {
		return this._apiService.update(`/BulkDeactivateCityEndPoint/BulkDeactivateCity`, { ids });
	}


}
