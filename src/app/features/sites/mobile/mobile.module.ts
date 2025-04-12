import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './components/create/create.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';

import { HomeComponent } from './components/home/home.component';



const routes: Routes = [
  { path: '', component:HomeComponent }, 
  { path:'create/:id', component: CreateComponent },
  { path:'edit/:id', component: CreateComponent },


];
@NgModule({
  declarations: [
    HomeComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    TableModule,
    SharedModule,
    ButtonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    InputSwitchModule,
    TranslateModule

  ]
})

export class MobileModule { }
