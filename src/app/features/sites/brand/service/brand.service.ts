import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/service/api.service';
import { brandViewModel } from '../interface/brand';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private _apiService: ApiService) { }


  get( orderBy: string, isAscending: boolean, pageIndex: number=1, pageSize: number = 100) {
      if (pageSize == 0)
        pageSize = environment.pageSize;
      let params = new HttpParams();
  

      return this._apiService.get(`/GetListBrandEndPoint/GetList?orderBy=${orderBy}&isAscending=${isAscending}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
    }


     getById(ID: string) {
        return this._apiService.get(`/GetBrandByIDEndPoint/GetBrandByID?ID=${ID}`,);
      }
      remove(body: brandViewModel) {
        return this._apiService.remove(`/DeleteBrandEndPoint/DeleteBrand`, body);
      }
     
      postOrUpdate(body: brandViewModel) {
        if (body.id) return this._apiService.update(`/EditBrandEndPoint/EditBrand`, body)
        else return this._apiService.post(`/CreateBrandEndPoint/AddBrand`, body)
      }
     
     
      uploadImage(formData: FormData) {
        return this._apiService.postMedia('/UploadMediaEndPoint/UploadMedia', formData, true);
      }
     
      bulkDelete(ids: string[]) {
        return this._apiService.remove(`/BulkDeleteBrandEndPoint/BulkDeleteBrand`, { ids });
      }
  
}
