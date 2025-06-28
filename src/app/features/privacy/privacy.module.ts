import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyComponent } from './privacy/privacy.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component:PrivacyComponent },
  

];

@NgModule({
  declarations: [
    PrivacyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PrivacyModule { }
