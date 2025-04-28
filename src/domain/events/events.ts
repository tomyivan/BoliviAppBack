import { List, LocationDet, Locations, Sponsor } from ".."
export interface EventDTO {
    idEvent: number;
    dateEvent: string;
    startTime: string;
    endTime: string;
    name: string;
    detail: string;
    idCategory: number;
    category: string;
    latitude: number;
    longitude: number;
    locationEvent: string;
    departament: string;
    codDepartment: string;
    idLocation: number;    
}

export interface EventSimpleDTO {
    idEvent: number;
    date: string;
    startTime: string;
    endTime: string;
    title: string;
}

export interface Events {
    date: string;
    startTime: string;
    endTime: string;
    name: string;
    detail: string;
    idCategory: number;
    idEvent?: number;
    location: Locations;
    sponsors: SponsorEvent[];
    resources: ResourceEvent[];
}

export interface EventInfo {
    idEvent: number;    
    date: string;
    startTime: string;
    endTime: string;
    name: string;
    detail: string;
    category: string;
    location: LocationDet;
    sponsors: Sponsor[];
}

export interface LocationsEvent {
    idLocationEvent?: number;
    idLocation: number;
    idEvent: number;
}

export interface ResourceEvent {
    idResourceEvent?: number;
    idEvent: number;
    idResource: number;
    amount: number;
    stock: number;
}

export interface FileEvent {
    idFile?: number;
    idEvent: number;
    name: string;
    ext: string;
}

export interface SponsorEvent {
    idEventSponsor?: number;
    idEvent: number;
    idSponsor: number;
    product: string;
    service: string;
    stock: number;
    observation: string;
    idMeasure: number;
}



export interface EventFilters {
    date?: string;
    startTime?: string;
    endTime?: string;
    name?: string;
    detail?: string;
    idCategory?: string;    
    from: string;
    to: string;    

}