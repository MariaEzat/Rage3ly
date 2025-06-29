import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { TableSkeltonComponent } from 'src/app/shared/components/table-skelton/table-skelton.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'mobile', pathMatch: 'full' },



      {
        path: 'customers',
        loadChildren: () =>
          import('../sites/customers/customers.module').then(
            (m) => m.CustomersModule
          ),
      },

      {
        path: 'ads',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../sites/ads/ads.module').then((m) => m.AdsModule),
      },
      {
        path: 'jobTitle',
        loadChildren: () =>
          import('./job-title/job-title.module').then((m) => m.JobTitleModule),
      },
      {
        path: 'employeeProfile',
        loadChildren: () =>
          import('./employee-profile/employee-profile.module').then(
            (m) => m.EmployeeProfileModule
          ),
      },
      {
        path: 'mobile',
        loadChildren: () =>
          import('./mobile/mobile.module').then(
            (m) => m.MobileModule
          ),
      },
      {
        path: 'requestToTransferAStolenPhone',
        loadChildren: () =>
          import('./request-to-transfer-astolen-phone/request-to-transfer-astolen-phone.module').then(
            (m) => m.RequestToTransferAStolenPhoneModule
          ),
      }, {
        path: 'transferOfOwnership',
        loadChildren: () =>
          import('./transfer-of-ownership/transfer-of-ownership.module').then(
            (m) => m.TransferOfOwnershipModule
          ),
      },
      {
        path: 'roles',
        loadChildren: () =>
          import('./roles/roles.module').then(
            (m) => m.RolesModule
          ),
      },
      {
        path: 'brand',
        loadChildren: () =>
          import('./brand/brand.module').then(
            (m) => m.BrandModule
          ),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./search/search.module').then(
            (m) => m.SearchModule
          ),
      },
      {
        path: 'notification',
        loadChildren: () =>
          import('./notifications/notifications.module').then(
            (m) => m.NotificationsModule
          ),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
       {
        path: 'notifications',
        loadChildren: () =>
          import('./notification/notification.module').then(
            (m) => m.NotificationModule
          ),
      },
      {
        path: 'retrivedPhones',
        loadChildren: () =>
          import('./retrieved-phones/retrieved-phones.module').then(
            (m) => m.RetrievedPhonesModule
          ),
      },
      {
        path: 'email',
        loadChildren: () =>
          import('./email/email.module').then(
            (m) => m.EmailModule
          ),
      },
    ],
  },
];
@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class SitesModule { }
