import { createComponent, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },



];
@NgModule({
  declarations: [
  
  
  ],
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    SharedModule,
    DropdownModule,
    RouterModule.forChild(routes),

  ]

})
export class WebsiteModule { }
