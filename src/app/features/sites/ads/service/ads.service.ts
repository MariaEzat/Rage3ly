import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from 'src/app/shared/service/api.service';
import { environment } from 'src/environments/environment';
import { adsSearchViewModel, adsViewModel, adsActivateViewModel } from '../interfaces/ads';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

 constructor(private _apiService: ApiService) { }
 private formatDate(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');
  const dd = date.getDate().toString().padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}
  get(searchViewModel: adsSearchViewModel, orderBy: string, isAscending: boolean, pageIndex: number=1, pageSize: number = 100) {
    if (pageSize == 0)
      pageSize = environment.pageSize;
    let params = new HttpParams();

    if (searchViewModel.Title) {
      params = params.set("Title", searchViewModel.Title);
    }
    if (searchViewModel.StartDate) {
      params = params.set("StartDate", this.formatDate(searchViewModel.StartDate));
    }
    if (searchViewModel.EndDate) {
      params = params.set("EndDate", this.formatDate(searchViewModel.EndDate));
    }
    return this._apiService.get(`/GetAllAdvertisementForAdminEndPoint/GetList?orderBy=${orderBy}&isAscending=${isAscending}&pageIndex=${pageIndex}&pageSize=${pageSize}`,params);
  }
  getById(ID: string) {
    return this._apiService.get(`/GetAdvertisementByIDEndPoint/GetAdvertisementByID?ID=${ID}`,);
  }
  remove(body: adsViewModel) {
    return this._apiService.remove(`/DeleteAdvertisementEndPoint/DeleteAdvertisement`, body);
  }
 
  postOrUpdate(body: adsViewModel) {
    if (body.id) return this._apiService.update(`/EditAdvertisementEndpoint/EditAdvertisement`, body)
    else return this._apiService.post(`/CreateAdvertisementEndPoint/CreateAdvertisement`, body)
  }
 
 
  updateActivated(body: adsActivateViewModel) {
    return this._apiService.update(`/ActiveAdvertisementEndPoint/ActiveAdvertisement`, body);
  }
  updateDeactivated(body: adsActivateViewModel) {
    return this._apiService.update(`/DeactivateAdvertisementEndPoint/DeactivateAdvertisement`, body);
  }
 
  uploadImage(formData: FormData) {
    return this._apiService.postMedia('/UploadMediaEndPoint/UploadMedia', formData, true);
  }
 
  bulkDelete(ids: string[]) {
    return this._apiService.remove(`/BulkDeleteAdvertisementEndpoint/BulkDeletedAdvertisement`, { ids });
  }
  bulkActivate(ids: string[]) {
    return this._apiService.update(`/BulkActivateAdvertisementEndpoint/BulkActivateAdvertisement`, { ids });
  }
  bulkDeactivate(ids: string[]) {
    return this._apiService.update(`/BulkDeactivateAdvertisementEndpoint/BulkDeactivateAdvertisement`, { ids });
  }
 
}
