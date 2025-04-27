import { ISponsorDomain, Sponsor } from "../../domain";

export class SponsorApplication {
    constructor( private readonly _sponsorDomain: ISponsorDomain ) {}
    async getSponsor(id?: number): Promise<any[]> {
        return this._sponsorDomain.getSponsor(id);
    }
    async addSponsor(sponsor: any): Promise<Boolean> {
        return this._sponsorDomain.addSponsor(sponsor);
    }
    async updateSponsor(sponsor: any): Promise<Boolean> {
        return this._sponsorDomain.updateSponsor(sponsor);
    }
    async deleteSponsor(idSponsor: number): Promise<Boolean> {
        return this._sponsorDomain.deleteSponsor(idSponsor);
    }

}