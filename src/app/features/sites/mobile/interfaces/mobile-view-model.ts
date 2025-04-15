export interface mobileViewModel {
  id: string;
  username:string
  mobileModel: string;
  IMEI1: string;
  phoneStatus: string;
  IMEI2: string;
  selected?: boolean;
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
    paths?:string[];
  }

export class mobileSearchViewModel {
  SearchText: string;
  PhoneStatus: number;
  
}
export class mobileSelectedViewModel {
  id: string;
  name: string;
}
export class mobileActivateViewModel {
  id: string;
}

