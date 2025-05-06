export interface TransferOfOwnershipViewModel {
    id:string;
    fromClientId:string
    fromClientName :string;
    toClientId:string
    toClientName:string;
    imeI1:string;
    imeI2:string;
    mobileMode:string;
    serialNumber:string;
    phoneId:string;
    brandId:string;
    brandName:string;
    paths:string[];
    requestStatus:number;
    brandPath:string;
}


export class RejectReasonViewModel {
    id: string;
    rejectReason?: string;
  }
  
  export class requestSearchViewModel {
    RequestStatus:number;
    ClientName:string;
  }