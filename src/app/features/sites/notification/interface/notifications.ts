export interface notificationViewModel {
    id:string;
    userId :string;
    userName :string;
    userMobile :string;
    title :string;
    body :string;
    createdDate :Date;
    messageStatus: number; 
  }
  
  
  export class searchOfnotificationViewModel {
    id:string;
    UserName:string;
    UserMobile:string;
    Title:string;
    From:Date;
    To:Date;
    MessageStatus:number;
  }
  export class searchSelectedViewModel {
    id:string;
    name:string;
  }

  export class sendNotificationViewModel {
    id: string;
     userId: string[];
    title: string;
    body: string;
  }

  export interface Client {
  id: string;
  name: string;
}
