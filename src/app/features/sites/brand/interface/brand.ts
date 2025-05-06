export interface brandViewModel {
    id:string;
    name:string;
    // path:string;
    selected?: boolean; 
}

export class brandCreateViewModel {
    id:string;
    name:string;
    paths:string[]; 
}