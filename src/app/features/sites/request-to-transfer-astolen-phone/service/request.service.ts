import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/service/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private _apiService:ApiService) { }

  get( orderBy: string, isAscending: boolean, pageIndex: number, pageSize: number = 0) {
      if (pageSize == 0)
        pageSize = environment.pageSize;
  
      return this._apiService.get(`/GetAllMobileStatusChangeRequestsEndPoint/GetAllMobileRequests?orderBy=${orderBy}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
    }
}
