import { Data } from "@angular/router";

export interface NotificationViewModel {
  ip: string;
  port: string;
  latitude: string;
  longitude: string;
  clientIdOwner : string;
  clientNameOwner: string;
  clientNameSearcher: string;
  imeI1: string;
  phoneNumberOwner: string;
  phoneNumberSearcher: string;
  brandName: string;
  createdDate: Date;
  clientIdSearcher :string;

}



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



export class notificationSearchViewModel {
  ClinetName: string;
  PhoneNumber: string;
  From:Data;
  To:Data;
  ImeiAndSerial: string;

}


