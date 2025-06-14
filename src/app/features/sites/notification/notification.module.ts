import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './Components/notifications/notifications.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: '', component:NotificationsComponent }, 
];


@NgModule({
  declarations: [NotificationsComponent],
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
export class NotificationModule { }
