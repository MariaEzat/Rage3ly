import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  

];
@NgModule({
  declarations: [
    DashboardComponent
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
  ]
})
export class DashboardModule { }
