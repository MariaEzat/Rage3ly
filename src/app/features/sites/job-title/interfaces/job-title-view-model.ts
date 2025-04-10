export interface employeeViewModel {
  id: string; 
  name: string; 
  mobile:string;
  roleId:number;
  isActive:boolean;
 selected?:boolean;
}

export class employeeCreateViewModel {
  id: string; 
  name: string; 
  email:string;
  mobile:string;
  roleId:number;
  password:string;
  confirmPassword:string;
  verifyStatus :number;
}
export class employeeSearchViewModel {
  Mobile:string
}
export class changePasswordViewModel {
  password:string;
  confirmPassword: string;
  iD:string
}
