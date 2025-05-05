export interface CharacterFilter {
    birthDate?: string;
    type: 'list' | 'all';
}

export interface CharacterDTO {
    id : number;
    name : string;
    lastname : string;
    birthDate : string;
    detail : string;
}