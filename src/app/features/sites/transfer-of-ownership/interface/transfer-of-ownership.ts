export interface TransferOfOwnershipViewModel {
  id: string;
  fromClientId: string
  fromClientName: string;
  toClientId: string
  toClientName: string;
  imeI1: string;
  imeI2: string;
  mobileMode: string;
  serialNumber: string;
  phoneId: string;
  brandId: string;
  brandName: string;
  paths: string[];
  requestStatus: number;
  brandPath: string;
}


export class RejectReasonViewModel {
  id: string;
  rejectReason?: string;
}

export class requestSearchViewModel {
  RequestStatus: number;
  ClientName: string;
}


export class clientMobileViewModel {
  id: string;
  number: string;
  mobileModel: string;
  serialNumber: string;
  dateOfPurchase: Date;
  brandPath: string;
  otherBrand: string;
  brandName: string;
  createdDate: Date;
  imeI1: string;
  imeI2: string;
}

export class ClientDetailsViewModel {
  id: string;
  nationalNumber: string;
  name: string;
  mobile: string;
  email: string;
  governrateName: string;
  cityName: string;
  createdDate: Date;
  phonesDetailsByClientIdDTOs: clientMobileViewModel[];
  path?:string;
}
