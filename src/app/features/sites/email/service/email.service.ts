import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/service/api.service';
import { EmailViewModel } from '../interface/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private _apiService: ApiService) { }
  postOrUpdate(body: EmailViewModel) {

    return this._apiService.post(`/SendEmailToClientsEndPoint/Post`, body)
  }
}
