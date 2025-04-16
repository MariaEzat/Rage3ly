import { createComponent, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from '../sites/layout/layout.component';



const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'customer-mobile', pathMatch: 'full' },
      
      
     
      {
        path: 'customer-mobile',
        loadChildren: () =>
          import('../website/customer-mobile/customer-mobile.module').then(
            (m) => m.CustomerMobileModule
          ),
      },
      
    ],
  },
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
