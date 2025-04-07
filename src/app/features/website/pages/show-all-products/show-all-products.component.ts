import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SearchshowAllProductViewModel, ShowAllProductViewModel } from '../../models/show-all-product-view-model';
import { WebsiteService } from '../../services/website.service';
import { forkJoin } from 'rxjs';  // Import forkJoin for parallel requests
import { environment } from 'src/environments/environment';
import { OrderViewModel } from '../../models/order.model';

@Component({
  selector: 'app-show-all-products',
  templateUrl: './show-all-products.component.html',
  styleUrls: ['./show-all-products.component.css']
})
export class ShowAllProductsComponent implements OnInit {
  // Products and Filters
  products: ShowAllProductViewModel[] = [];
  brands: any[] = [];
  categories: any[] = [];
  enviroment = environment
  filterTimeout: any;
  filteredBrands: any[] = [];  // To hold the filtered brands
  searchBrand: string = '';     // To hold the search query for brands
  filteredCategories: any[] = [];  // To hold the filtered brands
  searchCategory: string = '';     // To hold the search query for brands
  filters: SearchshowAllProductViewModel = {
    BrandsId: [],
    CategoriesId: [],
    FromPrice: null,
    ToPrice: null
  };

  // Pagination
  pageIndex = 1;
  pageSize = 50;

  constructor(private _websiteService: WebsiteService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Initial load of products and filters
    this.loadFilters();
    //this.loadCartFromLocalStorage();

  }

  loadProducts(): void {
    const filters = {
      BrandsId: this.filters.BrandsId.length > 0 ? this.filters.BrandsId : undefined,
      CategoriesId: this.filters.CategoriesId.length > 0 ? this.filters.CategoriesId : undefined,
      FromPrice: this.filters.FromPrice,
      ToPrice: this.filters.ToPrice
    };
  
    this._websiteService.getAllProducts(filters, 'price', true, this.pageIndex, this.pageSize).subscribe({
      next: (response) => {
        if (response?.isSuccess && response.data?.items) {
          this.products = response.data.items.map(product => ({
            ...product,
            quantity: 0
          }));
        } else {
          this.products = [];
        }
      },
      error: () => {
        this.products = [];
      }
    });
  }
  

  loadFilters(): void {
    forkJoin({
      brands: this._websiteService.getAllBrands(),
      categories: this._websiteService.getAllCategories()
    }).subscribe({
      next: (responses) => {
        if (responses?.brands?.isSuccess && responses.brands.data) {
          this.brands = Array.isArray(responses.brands.data)
            ? responses.brands.data
            : Object.values(responses.brands.data);
          this.filteredBrands = [...this.brands];  // Initialize filtered brands
        }
        if (responses?.categories?.isSuccess && responses.categories.data) {
          this.categories = Array.isArray(responses.categories.data)
            ? responses.categories.data
            : Object.values(responses.categories.data);
          this.filteredCategories = [...this.categories]; // Initialize filtered categories
        }

        // Load products after filters are loaded
        this.loadProducts();
      },
      error: (err) => {
      }
    });
  }


  // saveCartToLocalStorage() {
  //   localStorage.setItem('cart', JSON.stringify(this._websiteService.productsInCart));
  // }
  
  isProductInWishList(productId: string): boolean {
    return this._websiteService.wishListProduct.some((product) => product.id.toString() === productId);
  }



  filterBrands(): void {
    if (this.searchBrand) {
      this.filteredBrands = this.brands.filter(brand =>
        brand.name.toLowerCase().includes(this.searchBrand.toLowerCase())
      );
    } else {
      this.filteredBrands = [...this.brands]; // Show all brands if no search term
    }

    this.applyFilters(); // Automatically reload products
  }

  filterCategories(): void {
    if (this.searchCategory.trim()) {
      this.filteredCategories = this.categories.filter(category =>
        category.name.toLowerCase().includes(this.searchCategory.toLowerCase())
      );
    } else {
      this.filteredCategories = [...this.categories]; // Show all categories if no search term
    }

    this.applyFilters(); // Automatically reload products
  }



  applyFilters(): void {
    if (this.filterTimeout) {
      clearTimeout(this.filterTimeout);
    }

    this.filterTimeout = setTimeout(() => {
      this.pageIndex = 1; // Reset to first page when filters change
      this.loadProducts(); // Reload products
    }, 500); // 500ms debounce time
  }
  // Automatically apply filters when a brand or category is selected
  onBrandOrCategoryChange(id: string, type: 'brand' | 'category'): void {
    if (type === 'brand') {
      if (this.filters.BrandsId.includes(id)) {
        this.filters.BrandsId = this.filters.BrandsId.filter(brandId => brandId !== id);
      } else {
        this.filters.BrandsId.push(id);
      }
    } else if (type === 'category') {
      if (this.filters.CategoriesId.includes(id)) {
        this.filters.CategoriesId = this.filters.CategoriesId.filter(categoryId => categoryId !== id);
      } else {
        this.filters.CategoriesId.push(id);
      }
    }

    this.pageIndex = 1;  // Reset to first page when filters change
    this.loadProducts();  // Reload products based on updated filters
    this.applyFilters(); // Auto-reload products

  }



  onBrandOrCategoryChange2() {
    this.pageIndex = 1;  // Reset to first page when filters change
    this.loadProducts();  // Reload products based on updated filters
  }
  // Handle page navigation (Next/Previous)
  changePage(next: boolean): void {
    this.pageIndex += next ? 1 : -1;
    this.loadProducts();
  }

  addToWishList(product: ShowAllProductViewModel) {
    this._websiteService.addToWishList(product.id).subscribe((res) => {
      if (res.isSuccess) {
        this._websiteService.wishListProduct.push({
          id: product.id.toString(),
          name: product.productName,
          path: product.path,
          price: product.price
        });
      }
    });
  }

  removeFromWishList(product: ShowAllProductViewModel) {
    this._websiteService.removeFromWishList(product.id).subscribe((res) => {
      if (res.isSuccess) {

        this._websiteService.wishListProduct = this._websiteService.wishListProduct.filter((x) => x.id !== product.id.toString());
      }
    });
  }

  addToCart(product: ShowAllProductViewModel) {
    this._websiteService.addToSellCart(product.id, 1).subscribe((res) => {
      if (res.isSuccess) {
        const cartItem = {
          productId: product.id.toString(),
          quantity: 1,
          price: product.price,
          path: product.path,
          productName: product.productName,
          productQuantity: product.productQuantity
        };
  
        // Add to cart array and save in localStorage
        this._websiteService.productsInCart.push(cartItem);
       // this.saveCartToLocalStorage();
        
        product.quantity = 1;
      }
    });
  }
  

  removeFromCart(product: ShowAllProductViewModel) {
    this._websiteService.removeFromSellCart(product.id).subscribe((res) => {
      if (res.isSuccess) {
        this._websiteService.productsInCart = this._websiteService.productsInCart.filter((x) => x.productId !== product.id.toString());
      }
    });
  }

  updateQuantity(product: ShowAllProductViewModel, increment: boolean) {
    const newQuantity = increment ? (product.quantity + 1) : (product.quantity - 1);
    if (newQuantity < 1) return; // Prevent negative quantities
  
    product.quantity = newQuantity;
  
    this._websiteService.addToSellCart(product.id, newQuantity).subscribe((res) => {
      if (res.isSuccess) {
        const productInCart = this._websiteService.productsInCart.find((x) => x.productId === product.id.toString());
        if (productInCart) {
          productInCart.quantity = newQuantity;
        }
  
        // Save updated cart data
        //this.saveCartToLocalStorage();
      }
    });
  }
  // loadCartFromLocalStorage() {
  //   const cartData = localStorage.getItem('cart');
  //   if (cartData) {
  //     this._websiteService.productsInCart = JSON.parse(cartData);
  //   }
  // }
    

  increaseQuantity(product: ShowAllProductViewModel) {
    this.updateQuantity(product, true);
  }

  decreaseQuantity(product: ShowAllProductViewModel) {
    this.updateQuantity(product, false);
  }

  isProductInSellCart(product: ShowAllProductViewModel) {
    return this._websiteService.productsInCart.some((x) => x.productId === product.id.toString());
  }


}
