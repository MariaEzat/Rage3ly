import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { TableSkeltonComponent } from 'src/app/shared/components/table-skelton/table-skelton.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'governorate', pathMatch: 'full' },
      {
        path: 'governorates',
        loadChildren: () =>
          import('./governorates/governorates.module').then(
            (m) => m.GovernoratesModule
          ),
      },
      { path: "customers", loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },

      {
        path: 'cities',
        loadChildren: () =>
          import('./city/city.module').then((m) => m.CityModule),
      },
      {
        path: 'company',
        loadChildren: () =>
          import('./company/company.module').then((m) => m.CompanyModule),
      },
      {
        path: 'brand',
        loadChildren: () =>
          import('./brand/brand.module').then((m) => m.BrandModule),
      },
      {
        path: 'discount',
        loadChildren: () =>
          import('./discount/discount.module').then((m) => m.DiscountModule),
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./Product/product.module').then((m) => m.ProductModule),
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./category/category.module').then((m) => m.CategoryModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'customergroup',
        loadChildren: () =>
          import('../sales-flow/customer-group/customer-group.module').then(
            (m) => m.CustomerGroupModule
          ),
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('../sites/customers/customers.module').then(
            (m) => m.CustomersModule
          ),
      },
      {
        path: 'order',
        loadChildren: () =>
          import('../sales-flow/order/order.module').then((m) => m.OrderModule),
      },
      {
        path: 'email',
        loadChildren: () =>
          import('../sales-flow/email/email.module').then((m) => m.EmailModule),
      },
      {
        path: 'role',
        loadChildren: () =>
          import('../sales-flow/roles/roles.module').then((m) => m.RolesModule),
      },
      {
        path: 'signUpRequest',
        loadChildren: () =>
          import('../sites/sign-up-request/sign-up-request.module').then(
            (m) => m.SignUpRequestModule
          ),
      },
      {
        path: 'ads',
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
      
    ],
  },
];
@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class SitesModule {}
