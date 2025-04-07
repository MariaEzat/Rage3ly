import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebsiteService } from 'src/app/features/website/services/website.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
   constructor( private router: Router ,  public websiteService: WebsiteService) { }
   ngOnInit() {
    this.getUserName(); 
    this.getRoleIDFromToken();
  }
  RolesEnum = [
    { id: 1, name: 'SuperAdmin' },
    { id: 2, name: 'Admin' },
    { id: 3, name: 'Company' },
    { id: 4, name: 'Client' },
  ];
  userName= '';
  userRole = '';
  signOut() {
    localStorage.clear();
    this.router.navigate(['/auth/login'])
  }
  shopHome(){
    this.router.navigate(['/tahwesha/home'])

  }

  getUserName() {
    this.websiteService.userLoading = true
    this.websiteService.getUserInfo().subscribe((res) => {
      if (res.isSuccess) {
        this.userName= res.data.name;
        this.websiteService.userInfo = res.data
        this.websiteService.userLoading = false
      }
    })
  }


  getRoleIDFromToken(): string | null {
    const token = localStorage.getItem('eToken');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userRole = payload.RoleID;
      return payload.RoleID;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

  
  
}
