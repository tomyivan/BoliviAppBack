import { List2 } from "..";
import { Sponsor } from "./sponsor";

export interface ISponsor {
    getSponsor: () => Promise<List2[]>;
    getSponsorById: (idSponsor: number) => Promise<Sponsor>;
    addSponsor: (sponsor: Sponsor) => Promise<Sponsor>;
    updateSponsor: (sponsor: Sponsor) => Promise<Sponsor>;
    deleteSponsor: (idSponsor: number) => Promise<boolean>;
}