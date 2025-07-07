import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/service/api.service';
import { mobileActivateViewModel, mobileCreateViewModel, mobileSearchViewModel, mobileViewModel } from '../interfaces/mobile-view-model';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MobileService {
  [x: string]: any;


  constructor(private _apiService:ApiService) { }

  postOrUpdate(body: mobileCreateViewModel) {
    if (body.id) return this._apiService.update(`/EditPhoneEndPoint/EditPhone`, body)
    else return this._apiService.post(`/AddPhoneEndPoint/AddPhone`, body)
  }


  getById(ID: string) {
    return this._apiService.get(`/GetPhoneByIdEndPoint/GetPhoneByID?ID=${ID}`,);
  }

  get(searchViewModel: mobileSearchViewModel, orderBy: string, isAscending: boolean, pageIndex: number, pageSize: number = 0) {
    if (pageSize == 0)
      pageSize = environment.pageSize;

    let params = new HttpParams();
    if (searchViewModel.SearchText) {
      params = params.set("SearchText", searchViewModel.SearchText);
    }
    if (searchViewModel.PhoneStatus) {
      params = params.set("PhoneStatus", searchViewModel.PhoneStatus);
    }
    if (searchViewModel.Deleted) {
      params = params.set("Deleted", searchViewModel.Deleted);
    }

    return this._apiService.get(`/GetPhonesByAdminEndpoint/GetPhones?orderBy=${orderBy}&pageIndex=${pageIndex}&pageSize=${pageSize}`, params);
  }


  // getTodownloadPDF(searchViewModel: mobileSearchViewModel, orderBy: string, isAscending: boolean, pageIndex: number, pageSize: number) {


  //   let params = new HttpParams();
  //   if (searchViewModel.Name) {
  //     params = params.set("Name", searchViewModel.Name);
  //   }
  //   if (searchViewModel.Email) {
  //     params = params.set("Email", searchViewModel.Email);
  //   }

  //   if (searchViewModel.NationalNumber) {
  //     params = params.set("NationalNumber", searchViewModel.NationalNumber);
  //   }
  //   if (searchViewModel.VerifyStatus) {
  //     params = params.set("VerifyStatus", searchViewModel.VerifyStatus);
  //   }
  //   if (searchViewModel.Mobile) {
  //     params = params.set("Mobile", searchViewModel.Mobile);
  //   }


  //   return this._apiService.get(`/GetPhonesByAdminEndpoint/GetPhones?orderBy=${orderBy}&pageIndex=${pageIndex}&pageSize=${pageSize}`, params);
  // }
  


  updateActivated(body: mobileActivateViewModel) {
    return this._apiService.update(`/ActivateClientsEndPoint/ActiveClient`, body);
  }

  updateDeactivated(body: mobileActivateViewModel) {
    return this._apiService.update(`/DeactivateClientsEndPoint/DeactivateClient`, body);
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

  getBrands() {
    return this._apiService.get('/SelectBrandListEndpoint/SelectBrandList');
  }

  // getmobileExcel(searchViewModel: mobileSearchViewModel) {

  //   let params = new HttpParams();
  //   if (searchViewModel.Name) {
  //     params = params.set("Name", searchViewModel.Name);
  //   }
  //   if (searchViewModel.Email) {
  //     params = params.set("Email", searchViewModel.Email);
  //   }
  //   if (searchViewModel.ClientGroupId) {
  //     params = params.set("ClientGroupId", searchViewModel.ClientGroupId);
  //   }
  //   if (searchViewModel.NationalNumber) {
  //     params = params.set("NationalNumber", searchViewModel.NationalNumber);
  //   }
  //   if (searchViewModel.VerifyStatus) {
  //     params = params.set("VerifyStatus", searchViewModel.VerifyStatus);
  //   }
  //   if (searchViewModel.Mobile) {
  //     params = params.set("Mobile", searchViewModel.Mobile);
  //   }
  //   return this._apiService.getExcel(`/ExportClientToExcelEndpoint/AllClients`, params);
  // }
  bulkDelete(ids: string[]) {
    return this._apiService.remove(`/BulkDeletePhonesEndPoint/BulkDeletePhones`, { ids });
  }
  bulkActivate(ids: string[]) {
    return this._apiService.update(`/BulkActivateClientsEndpoint/ActivateClients`, { ids });
  }

  bulkDeactivate(ids: string[]) {
    return this._apiService.update(`/BulkDeactivateClientsEndpoint/DeactivateClients`, { ids });
  }
  remove(body: mobileViewModel) {
    return this._apiService.remove(`/DeletePhoneEndpoint/Delete`, body);

  }
}
