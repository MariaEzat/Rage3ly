export interface cityViewModel {
    id: string;
    name: string;
    governorateId: string;
    governorateName: string;
    isActive: boolean;
    selected?: boolean;
}

export class cityCreateViewModel {
    id: string;
    name: string;
    governorateId: string;
    isActive: boolean;
}

export class citySearchViewModel {
    CityName: string;
    GovernorateId: string;
}
export class governorateSelectedItem {
    id: string;
    name: string;
    selected: boolean;
}
export class cityActivateViewModel {
    id: string;
}