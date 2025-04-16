import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { NotfoundComponent } from './features/not-found/component/notfound/notfound.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'tahwesha',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/website/website.module').then(
            (m) => m.WebsiteModule
          ),
      },
    ],
  },
  {
    path: 'sites',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/sites/sites.module').then((m) => m.SitesModule),
      },
    ],
  },
  {
    path: 'website',
    loadChildren: () =>
      import('../../src/app/features/website/website.module').then((m) => m.WebsiteModule),
  },
  {
    path: '**',
    component: NotfoundComponent,
 
  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
