import { Inject, NgModule } from '@angular/core';
import { CommonModule, DatePipe, DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgPaginationComponent } from './components/ng-pagination/ng-pagination.component';
import { NgControlComponent } from './components/ng-control/ng-control.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LocalizationService } from './service/localization.service';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { PropertyFilterPipe } from './pipes/prop-filter.pipe';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { NavbarNdComponent } from './components/layout/navbar-nd/navbar-nd.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { TableSkeltonComponent } from './components/table-skelton/table-skelton.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ExtendDatePipe } from './pipes/date.pipe';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { LottieModule } from 'ngx-lottie';
import { Dropdown, DropdownModule } from 'primeng/dropdown';

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    NgPaginationComponent,
    NgControlComponent,
    MainLayoutComponent,
    PropertyFilterPipe,
    LayoutComponent,
    NavbarComponent,
    NavbarNdComponent,
    FooterComponent,
    TableSkeltonComponent,
    ExtendDatePipe,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    DropdownModule,
    RouterModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgxPaginationModule,
    NgOtpInputModule,
    NgxSkeletonLoaderModule,
    BsDatepickerModule.forRoot(),
    DatePipe,
    DialogModule,
    ButtonModule,
    BadgeModule,
    LottieModule,
  ],
  exports: [
    NgPaginationComponent,
    NgControlComponent,
    DropdownModule,
    MainLayoutComponent,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule,
    PropertyFilterPipe,
    NgOtpInputModule,
    TableSkeltonComponent,
    DatePipe,
    ExtendDatePipe,
    DialogModule,
    ButtonModule,
    BadgeModule,
    BsDatepickerModule,
    LottieModule,
  ],
})
export class SharedModule {
  constructor(
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document,

    private localizationService: LocalizationService
  ) {
    //this.translate.use(localizationService.getLanguage());
    //localizationService.setLanguage(localizationService.getLanguage());

    const lang = localizationService.getLanguage();
this.translate.use(lang);
this.setDirection(lang);
    // const lang = 'en';
    // this.translate.use(lang);
    // localizationService.setLanguage(lang);
    // this.setDirection(lang);

  }
  setDirection(lang: string) {
    const dir = lang === 'ar' || lang === 'he' ? 'rtl' : 'ltr';
    this.document.documentElement.dir = dir;
    this.document.documentElement.lang = lang;
  }
}
