export interface Locations {
    idLocation?: number;
    codDepartment: string;
    name: string;
    latitude: number;
    longitude: number;
}

export interface LocationsFilters {
    codDepartment?: string;
    name?: string;
}

export interface LocationsDTO {
    idLocation: number;
    codDepartment: string;
    name: string;
    latitude: string;
    longitude: string;
}