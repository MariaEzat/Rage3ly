import { Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { WebsiteService } from 'src/app/features/website/services/website.service';
import { LocalizationService } from '../../service/localization.service';
import { DOCUMENT } from '@angular/common';
import { SharedService } from '../../service/shared.service';
import { CSSFilesService } from '../../service/cssFiles.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {

  currentLang = 'en';
  showLangOptions: boolean = false;
  showSidebarMenu = false;
  activeLink: string = '';

  constructor(private router: Router, public websiteService: WebsiteService, private translate: TranslateService, private _localizationService: LocalizationService,
    private _CSSFilesService: CSSFilesService, private localizationService: LocalizationService, @Inject(DOCUMENT) private document: Document
  ) { this.currentLang = this.localizationService.getLanguage(); }
  ngOnInit() {
    this.getUserName();
    this.getRoleIDFromToken();
    this.currentLang = this.localizationService.getLanguage();
    // this.setDirection(this.currentLang);
  }
  

  @ViewChild('langButton', { static: false }) langButton!: ElementRef;
@ViewChild('langDropdown', { static: false }) langDropdown!: ElementRef;
@HostListener('document:click', ['$event'])
onClickOutside(event: MouseEvent): void {
  const target = event.target as HTMLElement;

  const clickedInsideButton = this.langButton?.nativeElement.contains(target);
  const clickedInsideDropdown = this.langDropdown?.nativeElement.contains(target);

  if (!clickedInsideButton && !clickedInsideDropdown) {
    this.showLangOptions = false;
  }
}

  RolesEnum = [
    { id: 1, name: 'SuperAdmin' },
    { id: 2, name: 'Admin' },
    { id: 3, name: 'Company' },
    { id: 4, name: 'Client' },
  ];
  userName = '';
  userRole = '';
  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login'])
  }
  shopHome() {
    this.router.navigate(['/tahwesha/home'])

  }

   getUserName() {
    this.websiteService.userLoading = true;
    this.websiteService.getUserInfo().subscribe((res) => {
      if (res.isSuccess) {
        
        //this._CSSFilesService.changeStyle(this.language.Url);
        this.userName = res.data.name;
        this.websiteService.userInfo = res.data;
        this.getUserFeatures();
      }
    });
  }

  getUserFeatures() {
    this.websiteService.getUserFeatures().subscribe((res) => {
      if (res.isSuccess) {
        SharedService.featureList = res.data.featureIds;
        this.websiteService.userLoading = false;
      } else {
        console.error('Failed to load user features:', res.message);
      }
    });
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


  

  toggleLangOptions() {
    this.showLangOptions = !this.showLangOptions;
    if (this.showLangOptions) {
      this.showSidebarMenu = false; // close sidebar if language menu opens
    }
  }
  
  // Toggle sidebar menu (mobile)
  toggleSidebar() {
    this.showSidebarMenu = !this.showSidebarMenu;
    if (this.showSidebarMenu) {
      this.showLangOptions = false; // close language menu if sidebar opens
    }
  }

  changeLang(lang: string): void {
    this.localizationService.setLanguage(lang); // ده بيعمل translate.use(lang)
    this.currentLang = lang;
    this.setDirection(lang);
    this.showLangOptions = false;
    window.location.reload(); // 👈 reload بعد تغيير اللغة

  }
  setDirection(lang: string): void {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    this.document.documentElement.dir = dir;
    this.document.documentElement.lang = lang;
  }
  sidebarOpen = false;

 
  setActiveLink(link: string) {
    this.activeLink = link;
  }
}
