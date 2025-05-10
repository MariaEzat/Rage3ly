export interface dashboardStatisticsViewModel {
    clientCount:number;
    governorateCount:number;
    phoneCount:number;
    returnedPhones:number;
}


export interface phoneBrandViewModel {
    brandName:string;
    phoneCount:number;
}

export interface governoratePhoneRatioViewModel {
    governorateName:string;
    phoneCount:number;
}

export interface stolenPhoneViewModel {
    numberOfRegisteredPhones:number
    NumberOfStolenPhone:number;
    PercentageOfStolenPhone:number;
}

export interface mostSearchClientsViewModel {
    ip:string;
    port:string;
    latitude:number;
    longitude:number;
    clientId:string;
    clientName:string;
    searchCount :number;
}

export interface MostUsedGovernoratesRatioViewModel {
    governorateName :string;
    clientCount :number;
}


export interface MostUsedGovernoratesViewModel {
    totalNumberOfClients :number;
    mostUsedGovernoratesRatio :MostUsedGovernoratesRatioViewModel[];
}