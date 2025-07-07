export class EmailViewModel {
  subject: string;
  body:string;
  toEmails:string[]
}
export class AllEmailsViewModel {
id:string
subject :string;
body :string;
emailAdresses  :string[];
selected?:boolean
}


export class EmailSearchViewModel {
  Subject: string;
  Body: string;
  EmailAdress: string;
}