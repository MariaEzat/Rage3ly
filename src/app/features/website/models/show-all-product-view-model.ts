export interface ShowAllProductViewModel {
  id: number;
  productName: string;
  price: number;
  path?:string;
  numberOfPoints:number;
  quantity:number;
  productQuantity:number;

}
export interface SearchshowAllProductViewModel {
  BrandsId:string[];
  CategoriesId:string[];
  FromPrice:number;
  ToPrice:number;
}

