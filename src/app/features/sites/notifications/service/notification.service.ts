import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/service/api.service';
import {  notificationSearchViewModel } from '../interface/notification';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private _apiService: ApiService) { }
  private formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
  get(searchViewModel: notificationSearchViewModel, orderBy: string, isAscending: boolean, pageIndex: number, pageSize: number = 0) {
    if (pageSize == 0)
      pageSize = environment.pageSize;

    let params = new HttpParams();
    if (searchViewModel.ClinetName) {
      params = params.set("ClinetName", searchViewModel.ClinetName);
    }
    if (searchViewModel.From) {
      params = params.set("From", this.formatDate(searchViewModel.From));
    }
    if (searchViewModel.To) {
      params = params.set("To", this.formatDate(searchViewModel.To));
    }
    if (searchViewModel.ImeiAndSerial) {
      params = params.set("ImeiAndSerial", searchViewModel.ImeiAndSerial);
    }
    return this._apiService.get(`/FilterActionLogByStolenStatusEndPoint/FilterActionLogByStolenStatus?orderBy=${orderBy}&pageIndex=${pageIndex}&pageSize=${pageSize}`, params);
  }

  getById(ID: string) {
    return this._apiService.get(`/GetClientWithPhoneDetailsEndpoint/GetClientWithPhoneDetails?ID=${ID}`,);
  }
}
