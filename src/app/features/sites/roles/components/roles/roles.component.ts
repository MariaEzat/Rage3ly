import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CRUDIndexPage } from 'src/app/shared/models/crud-index.model';
import { RoleService } from '../../service/role.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
 page: CRUDIndexPage = new CRUDIndexPage();

constructor(private _router:Router,private _roleService:RoleService,private translate: TranslateService){}

 RolesEnum = [
  { id: 1, name: 'sites.roles.superAdmin' },
  { id: 2, name: 'sites.roles.admin' },
  { id: 3, name: 'sites.roles.client' },
];

viewRoleDetails(id: string){

  this._router.navigate(['/sites/roles/roleDetails',id]);

  // this._roleService.getRoleById(id).subscribe({
  //   next: (res) => {
  //     if (res.isSuccess) {

  //       //this.item = res.data;
  //       //this.item.id = this.id;
  //       //this.editeform();
  //       console.log(res.data);
  //       this.page.isPageLoaded = true;
  //      // this._router.navigate(['/salesflow/roles/roleDetails',id]);

  //     }
  //   },
  //   error: (err) => {
  //    // this._sharedService.showToastr(err);
  //     this.page.isPageLoaded = true;
  //   }
  // });
  // this._router.navigate(['/salesflow/roles/roleDetails',id]);
}

currentLang: string;



  ngOnInit(): void {
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang();
  }
}
