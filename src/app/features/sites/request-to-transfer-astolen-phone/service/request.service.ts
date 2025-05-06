import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/service/api.service';
import { environment } from 'src/environments/environment';
import { RejectReasonViewModel, requestSearchViewModel } from '../interface/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private _apiService:ApiService) { }

  get(searchViewModel: requestSearchViewModel, orderBy: string, isAscending: boolean, pageIndex: number, pageSize: number = 0) {
      if (pageSize == 0)
        pageSize = environment.pageSize;

      let params = new HttpParams();
      if (searchViewModel.RequestStatus) {
        params = params.set("RequestStatus", searchViewModel.RequestStatus);
      }
     
  
      return this._apiService.get(`/GetAllMobileStatusChangeRequestsEndPoint/GetAllMobileRequests?orderBy=${orderBy}&pageIndex=${pageIndex}&pageSize=${pageSize}`, params);
    }


    Approved(iD:string) {
      return this._apiService.update(`/ApproveMobileStatusChangeRequestsEndPoint/ApproveMobileStatusChangeRequests`, {iD});
    }
    Rejected(body:RejectReasonViewModel) {
      console.log(body)
      return this._apiService.update(`/RejectMobileStatusChangeRequestsEndPoint/RejectMobileStatusChangeRequests`, body);
    }

    editImageRequest(iD:string) {
      return this._apiService.update(`/EditImageRequestStatusEndPoint/EditImageRequestStatus`, {iD});
    
    }
}
