import { Locations } from "../location/location";

export interface HistoryFilter {
    idHistory?: number;
    title?: string;
    date: string;
    from?: string;
    to?: string;
    summary?: string;
    idCategory?: string;
    type: 'simple' | 'full';
}

export interface HistorySimpleDTO {
    idHistory: number;
    title: string;
    dateStart: string;
    dateEnd: string;
    summary: string;
    category: string;
}

export interface History {
    idHistory?: number;
    title: string;
    dateStart: string;
    dateEnd: string;
    summary: string;
    description: string;
    idCategory: number;
    locations: Locations[];
    characters: charactersHistory[];
    referencesHistory: ReferencesHistory[];
}



export interface HistoryLocation {
    idHistoryLocation?: number;
    idHistory: number;
    idLocation: number;
}

export interface charactersHistory {
    idHistory: number;
    idCharacter: number;
}

export interface ReferencesHistory {
    idReference: number;
    reference: string;
    idHistory: number;
    active?: boolean;
}


