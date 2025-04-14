import { Locations } from ".."
export interface EventDTO {
    idEvent: number;
    date: string;
    startTime: string;
    endTime: string;
    name: string;
    detail: string;
    category: number;
    location: string;    

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
    file: FileEvent[];
    sponsors: SponsorEvent[];
    resources: ResourceEvent[];
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

