export interface requestToStolenPhone {
    iD:string;
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
}

export interface acceptRequest {
    id:string;
}

export interface rejectRequest {
    id:string;
    rejectReason:string;
}