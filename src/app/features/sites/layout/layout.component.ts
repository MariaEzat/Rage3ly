import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  openDropdown: string | null = null;
  activeLink: string = '';
  sidebarVisible: boolean = false;

  constructor(private router: Router) {}

  toggleDropdown(menu: string) {
    this.openDropdown = this.openDropdown === menu ? null : menu;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.dropdown')) {
      this.openDropdown = null;
    }
  }
  logout() {
    localStorage.clear(); // أو localStorage.removeItem('eToken');
    this.router.navigate(['/auth/login']);
  }
  setActiveLink(link: string) {
    this.activeLink = link;
  }
  
}
