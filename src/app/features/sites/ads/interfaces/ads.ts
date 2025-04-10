import { Title } from 'chart.js';
export interface adsViewModel {
    id: string; 
    title: string; 
    isActive:boolean;
    selected?: boolean; 
    hyperlink?:string;
    startDate:Date;
    endDate:Date;
    path:string;
  }
  
  export class adsCreateViewModel {
    id: string; 
    title: string;
    paths:string[];
    isActive:boolean;
    hyperlink:string;
    startDate:Date;
    endDate:Date;
    path: string;
  }
  export class adsSearchViewModel {
    Title: string;
    StartDate:Date;
    EndDate:Date;
  }
  export class adsActivateViewModel{
    id:string;
  }

  