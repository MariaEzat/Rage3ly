import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';

const routes: Routes = [
  { path: '', component:HomeComponent }, 


];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
     DropdownModule,
        TableModule,
        SharedModule,
        ButtonModule,
        TranslateModule,
        FormsModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        InputSwitchModule,
        TranslateModule
  ]
})
export class RequestToTransferAStolenPhoneModule { }
