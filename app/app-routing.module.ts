import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'sites', loadChildren: () => import('../src/app/features/sites/sites.module').then(m => m.SitesModule)
  },
  {
    path: 'website', loadChildren: () => import('../src/app/features/website/website.module').then(m => m.WebsiteModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
