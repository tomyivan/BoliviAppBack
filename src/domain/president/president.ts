export interface President {
    idPresident?: number;
    biography: string;
    name: string;   
    lastName: string;   
    politicalParty: string;
    dateBirthday: string;
    dateDeath: string;
    importantEvents: string;

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