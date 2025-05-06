import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/service/api.service';
import { RejectReasonViewModel, requestSearchViewModel } from '../interface/transfer-of-ownership';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferOfOwnershipService {

  constructor(private _apiService: ApiService) { }

  get(searchViewModel: requestSearchViewModel, orderBy: string, isAscending: boolean, pageIndex: number, pageSize: number = 0) {
    if (pageSize == 0)
      pageSize = environment.pageSize;

    let params = new HttpParams();
    if (searchViewModel.RequestStatus) {
      params = params.set("RequestStatus", searchViewModel.RequestStatus);
    }
    if (searchViewModel.ClientName) {
      params = params.set("ClientName", searchViewModel.ClientName);
    }

    return this._apiService.get(`/GetAllTransferOwnershipRequestsEndpoint/GetAllTransferOwnershipRequests?orderBy=${orderBy}&pageIndex=${pageIndex}&pageSize=${pageSize}`, params);
  }


  Approved(RequestId: string) {
    return this._apiService.update(`/AcceptTransferOwnershipRequestEndPoint/AcceptTransferOwnershipRequest`, { RequestId });
  }
  Rejected(body: RejectReasonViewModel) {
    return this._apiService.update(`/RejectTransferOwnershipRequestEndPoint/RejectTransferOwnershipRequest
`, body);
  }

  editImageRequest(ID: string) {
    return this._apiService.update(`/EditImageStatusTransferOwnershipRequestsEndpoint/EditImageRequestStatus`, { ID });

  }
}
