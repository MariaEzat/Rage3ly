import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChipsModule } from 'primeng/chips';
import { GetAllEmailsComponent } from './components/get-all-emails/get-all-emails.component';

const routes: Routes = [
  { path: '', component:GetAllEmailsComponent }, 
  { path: 'sendEmail', component: HomeComponent }, 


]

@NgModule({
  declarations: [
    HomeComponent,
    GetAllEmailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule ,
    ReactiveFormsModule,
    ChipsModule,
    RouterModule.forChild(routes),
    


    
  ]
})
export class EmailModule { }
