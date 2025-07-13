export interface mobileViewModel {
  id: string;
  username:string
  mobileModel: string;
  imeI1: string;
  phoneStatus: string;
  imeI2: string;
  selected?: boolean;
  deleted: boolean;
}

export class mobileCreateViewModel {
    id:string;
    imeI1: string;
    imeI2?: string;  
    number: string;
    mobileModel: string;
    serialNumber: string;
    brandId:string;
    clientId:string;
    dateOfPurchase:Date;
    otherBrand?:string;
  }

export class mobileSearchViewModel {
  SearchText: string;
  PhoneStatus: number;
  Deleted: number;
}
export class mobileSelectedViewModel {
  id: string;
  name: string;
}
export class mobileActivateViewModel {
  id: string;
}

