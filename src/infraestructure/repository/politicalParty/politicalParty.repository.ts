import { PrismaClient } from "@prisma/client";
import { IPoliticalParty,  PoliticalParty  } from "../../../domain";
import { Execute } from "../datasource/querys.execute";
import { PoliticalPartyQuery } from "../query/politicalParty.query";
export class PoliticalPartyRepository implements IPoliticalParty {
    
    constructor( private readonly prisma: PrismaClient ) { }  

    async getPoliticalParties(): Promise<PoliticalParty[]> {
        return Execute.getData(PoliticalPartyQuery.getPoliticalParty())
    }
    async createPoliticalParty(politicalParty: PoliticalParty): Promise<Boolean> {
        try {
            const response = await this.prisma.partido_politico.create({
                data: {
                    nombre: politicalParty.name,
                    abrv: politicalParty.acronym,
                }
            });
            return response.id_partido_politico ? true : false;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async updatePoliticalParty(politicalParty: PoliticalParty): Promise<Boolean> {
        try {
            const response = await this.prisma.partido_politico.update({
                where: {
                    id_partido_politico: politicalParty.id
                },
                data: {
                    nombre: politicalParty.name,
                    abrv: politicalParty.acronym,
                }
            });
            return response.id_partido_politico ? true : false;
        }catch (error) {
            console.log(error);
            throw error;
        }
    }
    async deletePoliticalParty(idPoliticalParty: number): Promise<Boolean> {
        try {
            const response = await this.prisma.partido_politico.update({
                where: {
                    id_partido_politico: idPoliticalParty
                },
                data: {
                    activo: 0,
                }
            });
            return response.id_partido_politico ? true : false;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}