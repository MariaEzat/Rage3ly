import { Component, OnInit } from '@angular/core';
import { CarOilComponent } from '../../components/car-oil/car-oil.component';
import { CarOilNdComponent } from '../../components/car-oil-nd/car-oil-nd.component';
import { CommonModule } from '@angular/common';
import { WebsiteService } from '../../services/website.service';
import { WishListProduct } from '../../models/product-cart';
import { CompanyViewModel, OrderViewModel } from '../../models/order.model';
import { CategoryEnum } from '../../models/enum/category';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AdsViewModel } from '../../models/ads.model';
import { forkJoin } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, CarOilComponent, CarOilNdComponent],
})
export class HomeComponent implements OnInit {
  newProducts: OrderViewModel[] = [];
  bestSellerProducts: OrderViewModel[] = [];
  favoriteProducts: OrderViewModel[] = [];
  companies: CompanyViewModel[] = [];
  ads: AdsViewModel[] = [];
  enviroment = environment;

  newProductsLoading = true;
  bestSellerProductsLoading = true;
  favoriteProductsLoading = true;
  companiesLoading = true;
  adsLoading = true;
  pageLoading = true;

  constructor(public websiteService: WebsiteService, private _router: Router) {}
  ngOnInit(): void {
    forkJoin([
      this.websiteService.getProductsByCategory(CategoryEnum.NewProducts),
      this.websiteService.getProductsByCategory(
        CategoryEnum.BestSellerProducts
      ),
      this.websiteService.getProductsByCategory(CategoryEnum.FavoriteProducts),
      this.websiteService.getCompaniesOfProduct(),
      this.websiteService.getAds(),
    ]).subscribe((res) => {
      this.newProducts = res[0].data;
      this.bestSellerProducts = res[1].data;
      this.favoriteProducts = res[2].data;
      this.companies = res[3].data;
      this.ads = res[4].data.items.filter((x) => x.isActive);
      this.newProducts.forEach((product) => {
        product.quantity =
          this.websiteService.productsInCart.find(
            (x) => x.productId === product.id
          )?.quantity || 0;
      });
      this.bestSellerProducts.forEach((product) => {
        product.quantity =
          this.websiteService.productsInCart.find(
            (x) => x.productId === product.id
          )?.quantity || 0;
      });
      this.favoriteProducts.forEach((product) => {
        product.quantity =
          this.websiteService.productsInCart.find(
            (x) => x.productId === product.id
          )?.quantity || 0;
      });
      this.pageLoading = false;
    });
  }

  getProductsByCategory(
    category: CategoryEnum,
    targetArray: OrderViewModel[],
    loadingFlag:
      | 'newProductsLoading'
      | 'bestSellerProductsLoading'
      | 'favoriteProductsLoading'
      | 'companiesLoading'
  ) {
    this[loadingFlag] = true;

    this.websiteService.getProductsByCategory(category).subscribe((res) => {
      if (res.isSuccess) {
        this[loadingFlag] = false;
        targetArray.length = 0;
        targetArray.push(...res.data);
        targetArray.forEach((product) => {
          product.quantity =
            this.websiteService.productsInCart.find(
              (x) => x.productId === product.id
            )?.quantity || 0;
        });
      }
    });
  }

  getNewProducts() {
    this.getProductsByCategory(
      CategoryEnum.NewProducts,
      this.newProducts,
      'newProductsLoading'
    );
  }

  getBestSellerProducts() {
    this.getProductsByCategory(
      CategoryEnum.BestSellerProducts,
      this.bestSellerProducts,
      'bestSellerProductsLoading'
    );
  }

  getFavoriteProducts() {
    this.getProductsByCategory(
      CategoryEnum.FavoriteProducts,
      this.favoriteProducts,
      'favoriteProductsLoading'
    );
  }

  getCompaniesOfProduct() {
    this.websiteService.getCompaniesOfProduct().subscribe((res) => {
      if (res.isSuccess) {
        this.companies = res.data;
        this.companiesLoading = false;
      }
    });
  }
  showProducts() {
    this._router.navigate(['/tahwesha/showAllProductsComponent']);
  }

  getAllAds() {
    this.adsLoading = true;
    this.websiteService.getAds().subscribe((res) => {
      if (res.isSuccess) {
        this.ads = res.data.items.filter((x) => x.isActive);
      }
    });
  }
}
