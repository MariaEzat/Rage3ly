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
    
     if (searchViewModel.Subject) {
      params = params.set("Subject", searchViewModel.Subject);
    }
    if (searchViewModel.Body) {
      params = params.set("Body", searchViewModel.Body);
    }
    if (searchViewModel.EmailAdress) {
      params = params.set("EmailAdress", searchViewModel.EmailAdress);
    }
      return this._apiService.get(`/GetAllEmailsEndPoint/GetAllEmails?orderBy=${orderBy}&pageIndex=${pageIndex}&pageSize=${pageSize}`, params);
    }
    
}
