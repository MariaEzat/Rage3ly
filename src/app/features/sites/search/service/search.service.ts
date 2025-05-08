import { Injectable } from '@angular/core';
import { searchOfSearchViewModel } from '../interface/search';
import { ApiService } from 'src/app/shared/service/api.service';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  [x: string]: any;
 
   constructor(private _apiService: ApiService) { }
   private formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
   get(searchViewModel: searchOfSearchViewModel, orderBy: string, isAscending: boolean, pageIndex: number, pageSize: number = 0) {
     if (pageSize == 0)
       pageSize = environment.pageSize;
 
     let params = new HttpParams();
     if (searchViewModel.EmailAndClinetName) {
       params = params.set("EmailAndClinetName", searchViewModel.EmailAndClinetName);
     }
     if (searchViewModel.ImeiAndSerial) {
       params = params.set("ImeiAndSerial", searchViewModel.ImeiAndSerial);
     }
     if (searchViewModel.LogType) {
      params = params.set("LogType", searchViewModel.LogType.toString());
    }
     if (searchViewModel.PhoneNumber) {
       params = params.set("PhoneNumber", searchViewModel.PhoneNumber);
     }
     if (searchViewModel.From) {
      params = params.set("From", this.formatDate(searchViewModel.From));
    }
    if (searchViewModel.To) {
      params = params.set("To", this.formatDate(searchViewModel.To));
    }
     return this._apiService.get(`/GetAllActionLogEndPoint/GetAllActionLog?orderBy=${orderBy}&pageIndex=${pageIndex}&pageSize=${pageSize}`, params);
   }
 
 
   getTodownloadPDF(searchViewModel: searchOfSearchViewModel, orderBy: string, isAscending: boolean, pageIndex: number, pageSize: number) {
 
 
    let params = new HttpParams();
    if (searchViewModel.EmailAndClinetName) {
      params = params.set("EmailAndClinetName", searchViewModel.EmailAndClinetName);
    }
    if (searchViewModel.ImeiAndSerial) {
      params = params.set("ImeiAndSerial", searchViewModel.ImeiAndSerial);
    }
    if (searchViewModel.LogType) {
      params = params.set("LogType", searchViewModel.LogType);
    }
    if (searchViewModel.PhoneNumber) {
      params = params.set("PhoneNumber", searchViewModel.PhoneNumber);
    }
    if (searchViewModel.From) {
      params = params.set("From", this.formatDate(searchViewModel.From));
    }
    if (searchViewModel.To) {
      params = params.set("To", this.formatDate(searchViewModel.To));
    }
 
     return this._apiService.get(`/GetAllOrdersEndpoint/GetAllOrders?orderBy=${orderBy}&pageIndex=${pageIndex}&pageSize=${pageSize}`, params);
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
 
   getCustomerExcel(searchViewModel: searchOfSearchViewModel) {
 
     let params = new HttpParams();
     if (searchViewModel.EmailAndClinetName) {
       params = params.set("EmailAndClinetName", searchViewModel.EmailAndClinetName);
     }
     if (searchViewModel.ImeiAndSerial) {
       params = params.set("ImeiAndSerial", searchViewModel.ImeiAndSerial);
     }
     if (searchViewModel.LogType) {
       params = params.set("LogType", searchViewModel.LogType);
     }
     if (searchViewModel.PhoneNumber) {
       params = params.set("PhoneNumber", searchViewModel.PhoneNumber);
     }
     if (searchViewModel.From) {
      params = params.set("From", this.formatDate(searchViewModel.From));
    }
    if (searchViewModel.To) {
      params = params.set("To", this.formatDate(searchViewModel.To));
    }
     return this._apiService.getExcel(`/ExportClientToExcelEndpoint/AllClients`, params);
   }

  
}
