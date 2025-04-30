export interface PresidentFilter {
    idPresident?: number;
    idPoliticalParty?: number;    
    type?: 'simplify' | 'full'; // 'simplify' | 'full'
}
export interface President {
    idPresident?: number;
    biography: string;
    name: string;   
    lastname: string;   
    idPoliticalParty: number;
    politicalParty: string;    
    dateBirthday: string;
    dateDeath: string;
    importantEvents: string;
    mandates: Mandate[];
}

export interface PresidentDTO {
    idPresident: number;
    biography: string;
    name: string;   
    lastname: string;   
    idPoliticalParty: number;
    politicalParty: string;    
    dateBirthday?: string;
    dateDeath?: string;
    importantEvents?: string;
    picture?: string;
    mandates?: Mandate[];
    images?: PresidentImage[];
}

export interface PresidentImage {
    idFile?: number;
    idPresident: number;
    name: string;
    isFrontPage: boolean;
}


export interface Mandate {
    idMandate?: number;
    nroMandate: number;
    startDate: string;
    endDate: string;
    observation: string;
}