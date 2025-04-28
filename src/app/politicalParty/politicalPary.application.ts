import { List, PoliticalParty, IPoliticalParty } from "../../domain";
export class PoliticalPartyApplication {
    constructor( private readonly _politicalParty: IPoliticalParty ) { }  
    
    getPoliticalParties(): Promise<List[]> {
        return this._politicalParty.getPoliticalParties()
    }
    createPoliticalParty( politicalParty: PoliticalParty ): Promise<Boolean> {
        return this._politicalParty.createPoliticalParty( politicalParty )
    }
    updatePoliticalParty( politicalParty: PoliticalParty ): Promise<Boolean> {
        return this._politicalParty.updatePoliticalParty( politicalParty )
    }
    deletePoliticalParty( idPoliticalParty: number ): Promise<Boolean> {
        return this._politicalParty.deletePoliticalParty( idPoliticalParty )
    }

}