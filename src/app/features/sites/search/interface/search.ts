export interface searchViewModel {
    id:string;
    ip:string;
    port:string;
    searchText:string;
    logType:number;
    latitude:number;
    longitude:number;
    clientId:string;
    clientName:number;
    phoneId:string;
    IMEI1:string;
    phoneNumberOwner :string;
    phoneNumberSearcher :string;
    governrateId:string;
    governrateName:string;
    email :string;
    createdDate :Date;
    selected?: boolean; 
  }
  
  
  export class searchOfSearchViewModel {
    id:string;
    ImeiAndSerial:string;
    EmailAndClinetName:string;
    LogType:number;
    From:Date;
    To:Date;
    PhoneNumber:string;
  }
  export class searchSelectedViewModel {
    id:string;
    name:string;
  }

  