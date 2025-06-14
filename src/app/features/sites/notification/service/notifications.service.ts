import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/service/api.service';
import { environment } from 'src/environments/environment';
import { searchOfnotificationViewModel } from '../interface/notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

[x: string]: any;
 
   constructor(private _apiService: ApiService) { }
   private formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
   get(searchViewModel: searchOfnotificationViewModel, orderBy: string, isAscending: boolean, pageIndex: number, pageSize: number = 0) {
     if (pageSize == 0)
       pageSize = environment.pageSize;
 
     let params = new HttpParams();
     if (searchViewModel.UserName) {
       params = params.set("UserName", searchViewModel.UserName);
     }
     if (searchViewModel.UserMobile) {
       params = params.set("UserMobile", searchViewModel.UserMobile);
     }
     if (searchViewModel.Title) {
      params = params.set("Title", searchViewModel.Title);
    }
     if (searchViewModel.MessageStatus) {
       params = params.set("MessageStatus", searchViewModel.MessageStatus);
     }
     if (searchViewModel.From) {
      params = params.set("From", this.formatDate(searchViewModel.From));
    }
    if (searchViewModel.To) {
      params = params.set("To", this.formatDate(searchViewModel.To));
    }
     return this._apiService.get(`/GetAllNotificationMessageEndPoint/GetAllNotificationMessages?orderBy=${orderBy}&pageIndex=${pageIndex}&pageSize=${pageSize}`, params);
   }
 
   getById(ID: string) {
     return this._apiService.get(`/GetClientByIdEndPoint/GetClientById?ID=${ID}`,);
   }
 

   getStatus() {
     return this._apiService.get('/GetVerifyStatusListEndpoint/SelectList');
   }
   getClientGroups() {
     return this._apiService.get('/SelectClientGroupListEndPoint/SelectClientGroupList');
   }
   getGovernorates() {
     return this._apiService.get('/GetDropdownListGovernorateEndPoint/GetDropdownList');
   }
 
   getCities(governorateId?: string) {
     let url: string;
 
     if (governorateId) {
       url = `/SelectCityListEndPoint/SelectCityList?governorateId=${governorateId}`;
     } else {
       url = `/SelectCityListEndPoint/SelectCityList`;
     }
 
     return this._apiService.get(url);
   }
   uploadImage(formData: FormData) {
     return this._apiService.postMedia('/UploadMediaEndPoint/UploadMedia', formData, true);
   }
}
