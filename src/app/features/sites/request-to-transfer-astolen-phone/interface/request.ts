export interface requestToStolenPhone {
    id:string;
    phoneId:string;
    phoneNumber:string;
    paths:string[];
    imeI1:string;
    imeI2:string;
    mobileModel:string;
    serialNumber:string;
    clientName:string;
    clientId:string;
    email:string;
    requestStatus:number;
    street:string;
    cityId:string;
    cityName:string;
    governorateId:string;
    governorateName:string;
    brandName:string;
    brandPath:string; 
    reportNumber :string;
    policeDepartment :string;
}

export class RejectReasonViewModel {
    id: string;
    rejectReason?: string;
  }
  
  export class requestSearchViewModel {
    RequestStatus:number;
  }