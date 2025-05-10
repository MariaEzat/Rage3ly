import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { NgProgressModule } from 'ngx-progressbar';
import { AnimationLoader, LottieModule } from 'ngx-lottie';

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import player from 'lottie-web';
export function playerFactory() {
    return player;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgChartsModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgProgressModule.withConfig({
      spinnerPosition: 'right',
      color: '#f71cff',
    }),
    ToastrModule.forRoot(),
    LottieModule.forRoot({player: playerFactory}),
  ],
  providers: [TranslateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
