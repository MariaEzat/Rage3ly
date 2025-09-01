import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/service/api.service';
import { changePasswordViewModel, profileSettingViewModel, setDefaultShippingAddressViewModel, UserViewModel } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WebsiteService {
 
  totalPrice: number;
  userInfo: UserViewModel;
  userLoading: boolean = true;
  constructor(private _apiService: ApiService) { }

  getUserInfo() {
    return this._apiService.get('/UserDataEndpoint/GetUserData');
  }





 
  changePassword(body: changePasswordViewModel) {
    return this._apiService.update(`/ChangePasswordEndPoint/ChangePassword`, body);
  }
  profileSetting(body: profileSettingViewModel) {
    return this._apiService.update(`/EditClientEndpoint/Put`, body);
  }

  getClientById(id: string) {
    return this._apiService.get(`/GetClientByIdEndPoint/GetClientById?ID=${id}`);
  }




  setDefaultShippingAddress(body: setDefaultShippingAddressViewModel) {
    return this._apiService.update(`/SetDefaultShippingAddressEndPoint/SetDefaultShippingAddress`, body);
  }
 
 
  

  getAds() {
    return this._apiService.get('/GetAllAdvertisementEndpoint/GetList');
  }

  getUserFeatures() {
    return this._apiService.get('/GetFeaturesByRoleIdEndPoint/GetModulesByRoleId');
  }
}
