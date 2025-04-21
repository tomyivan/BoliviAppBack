import { List } from "..";
import { Sponsor } from "./sponsor";

export interface ISponsorDomain {
    getSponsor: (id?: number) => Promise<List[]>;
    addSponsor: (sponsor: Sponsor) => Promise<boolean>;
    updateSponsor: (sponsor: Sponsor) => Promise<boolean>;
    deleteSponsor: (idSponsor: number) => Promise<boolean>;
}