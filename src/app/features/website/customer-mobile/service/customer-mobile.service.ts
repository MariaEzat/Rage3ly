import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/service/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerMobileService {

  constructor(private _apiService: ApiService) { }

  get(searchViewModel: any, orderBy: string, isAscending: boolean, pageIndex: number = 1, pageSize: number = 100) {
    if (pageSize == 0)
      pageSize = environment.pageSize;
    let params = new HttpParams();


    return this._apiService.get(`/GetClientPhonesEndPoint/GetClientPhones?orderBy=${orderBy}&isAscending=${isAscending}&pageIndex=${pageIndex}&pageSize=${pageSize}`, params);
  }
}
