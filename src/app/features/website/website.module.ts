import { createComponent, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { CarOilNdComponent } from './components/car-oil-nd/car-oil-nd.component';
import { CarOilComponent } from './components/car-oil/car-oil.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { DetailsComponent } from './pages/details/details.component';
import { CartCardComponent } from './components/cart-card/cart-card.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

import { ShowAllProductsComponent } from './pages/show-all-products/show-all-products.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'order-details', component: OrderDetailsComponent },
  {path: 'details', component: DetailsComponent},
  {path: 'wishlist', component: WishlistComponent},

  {path: 'showAllProductsComponent', component: ShowAllProductsComponent},

];
@NgModule({
  declarations: [
  
  
       ShowAllProductsComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    SharedModule,
    DropdownModule,
    RouterModule.forChild(routes),
    HomeComponent,
    CarOilComponent,
    CarOilNdComponent,
    ConfirmationComponent,
    CartCardComponent,
    WishlistComponent,
  ]

})
export class WebsiteModule { }
