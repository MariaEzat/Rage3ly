import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { NgChartsModule } from 'ng2-charts';
import { TranslateModule } from '@ngx-translate/core';
import { SeeAllComponent } from './components/see-all/see-all.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  {path: 'seeAll', component: SeeAllComponent}
];
@NgModule({
  declarations: [
    DashboardComponent,
    SeeAllComponent
  ],
  imports: [
   CommonModule,
      DropdownModule,
      TableModule,
      SharedModule,
      ButtonModule,
      FormsModule,
      NgChartsModule,
      RouterModule.forChild(routes),
      ReactiveFormsModule,
      InputSwitchModule,
      NgChartsModule,
      TranslateModule
  ]
})
export class DashboardModule { }
