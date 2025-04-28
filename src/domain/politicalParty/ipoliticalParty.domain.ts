import { List, PoliticalParty } from "..";
export interface IPoliticalParty {
    getPoliticalParties: () => Promise<List[]>;
    createPoliticalParty: ( politicalParty: PoliticalParty ) => Promise<Boolean>;
    updatePoliticalParty: ( politicalParty: PoliticalParty ) => Promise<Boolean>;
    deletePoliticalParty: ( idPoliticalParty: number ) => Promise<Boolean>;
}