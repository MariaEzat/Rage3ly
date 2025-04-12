export interface MobileViewModel {
}


export class mobileCreateViewModel {
    id:string;
    name: string;
    imeI1: string;
    imeI2: string;  
    number: string;
    mobileModel: string;
    serialNumber: string;
    brandId:string;
    clientId:string;
    dateOfPurchase:Date;
  }
  export class mobileSelectedItem {
    id: string;
    name: string;
    selected:boolean;
  }