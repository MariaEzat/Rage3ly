import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { WebsiteService } from 'src/app/features/website/services/website.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  cartVisible = false;

  constructor(public websiteService: WebsiteService, private router: Router) { }

  showCartDialog(event: Event) {
    event.preventDefault();
    this.cartVisible = true;
  }

 
  checkout() {
    this.router.navigate(['/tahwesha/checkoput'])
    this.cartVisible = false;
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['/auth/login'])
  }
}
