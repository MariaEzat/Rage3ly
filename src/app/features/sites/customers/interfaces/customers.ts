export interface customerViewModel {
  id:string;
  name:string;
  isActive:boolean;
  email:string;
  verifyStatus:string;
  nationalNumber:string;
  path:string;
  mobile:number;
  ةobilesCount:number;
  selected?: boolean; 
}


export class customerSearchViewModel {
  id:string;
  Name:string;
  Email:string;
  NationalNumber:string;
  ClientGroupId:string;
  VerifyStatus:number;
  From:Date;
  To:Date;
  Mobile:string;
}
export class customerSelectedViewModel {
  id:string;
  name:string;
}
export class customerActivateViewModel{
  id:string;
}
export class customerCreateViewModel {
  id:string;
  name: string;
  nationalNumber?: string;
  password: string;
  mobile: string;
  email: string;
  confirmPassword: string;
  paths?: string[];
  cityId:string;
  governorateId:string;
}
export class changePasswordViewModel {
  password:string;
  confirmPassword: string;
  iD:string
}
