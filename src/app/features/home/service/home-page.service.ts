import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(private _apiService: ApiService) { }
  getSatistic() {
    return this._apiService.get(`/ReturnedPhonesAndClientsEndpoint/ReturnedPhonesAndClients`);
  }
}
