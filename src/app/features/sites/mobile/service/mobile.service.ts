import { Injectable } from '@angular/core';
import { mobileCreateViewModel } from '../interfaces/mobile-view-model';
import { ApiService } from 'src/app/shared/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  constructor(private _apiService:ApiService) { }

  postOrUpdate(body: mobileCreateViewModel) {
    if (body.id) return this._apiService.update(`/EditPhoneEndPoint/EditPhone`, body)
    else return this._apiService.post(`/AddPhoneEndPoint/AddPhone`, body)
  }


  getById(ID: string) {
    return this._apiService.get(`/GetPhoneByIdEndPoint/GetPhoneByID?ID=${ID}`,);
  }
  uploadImage(formData: FormData) {
    return this._apiService.postMedia('/UploadMediaEndPoint/UploadMedia', formData, true);
  }
  getBrands() {
    return this._apiService.get('/SelectBrandListEndpoint/SelectBrandList');
  }
}
