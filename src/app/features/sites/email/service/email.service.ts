import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/service/api.service';
import { AllEmailsViewModel, EmailSearchViewModel, EmailViewModel } from '../interface/email';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private _apiService: ApiService) { }
  postOrUpdate(body: EmailViewModel) {

    return this._apiService.post(`/SendEmailToClientsEndPoint/Post`, body)
  }




  get(searchViewModel: EmailSearchViewModel, orderBy: string, isAscending: boolean, pageIndex: number, pageSize: number = 0) {
      if (pageSize == 0)
        pageSize = environment.pageSize;
  
      let params = new HttpParams();
    
    
      return this._apiService.get(`/GetAllUsersEndpoint/FilterUsers?orderBy=${orderBy}&pageIndex=${pageIndex}&pageSize=${pageSize}`, params);
    }
    getById(ID: string) {
      return this._apiService.get(`/GetUserByIDEndPoint/GetUserById?ID=${ID}`);
    }
    remove(body:AllEmailsViewModel ) {
      return this._apiService.remove(`/DeleteGovernorateEndPoint/DeleteGovernorate`,body);
    }
}
