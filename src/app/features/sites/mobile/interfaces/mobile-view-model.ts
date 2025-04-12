export interface mobileViewModel {
  id: string;
  username:string
  mobileModel: string;
  IMEI1: string;
  phoneStatus: string;
  IMEI2: string;
  selected?: boolean;
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
export class mobileCreateViewModel {
  id: string;
  name: string;
  nationalNumber?: string;
  password: string;
  mobile: string;
  email?: string;
  confirmPassword: string;
  paths?: string[];
}

