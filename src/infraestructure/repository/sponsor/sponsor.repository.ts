import { PrismaClient } from "@prisma/client";
import { ISponsorDomain, List, Sponsor } from "../../../domain";
import { SponsorQuery } from "../query/sponsor.query";
import { Execute } from "../datasource/querys.execute";
export class SponsorRepository implements ISponsorDomain {
    constructor( private readonly prisma: PrismaClient ) {}
    async getSponsor(idSponsor?: number): Promise<List[]> {
        return Execute.getData(SponsorQuery.getSponsor(idSponsor))
    }
    async addSponsor( data: Sponsor ) {
        try {
            const response = await this.prisma.patrocinadores.create({
                data: {
                    patrocinador: data.name,
                }
            });
            return response.id_patrocinador ? true : false;
        } catch (error) {
            console.error(`Error creating sponsor: ${error}`);
            return false;
        }
    }

    async updateSponsor( data: Sponsor ) {
        try {
            const response = await this.prisma.patrocinadores.update({
                where: { id_patrocinador: data.idSponsor },
                data: {
                    patrocinador: data.name,
                }
            });
            return response.id_patrocinador ? true : false;
        } catch (error) {
            console.error(`Error updating sponsor: ${error}`);
            return false;
        }
    }
    async deleteSponsor( idSponsor: number ) {
        try {
            const response = await this.prisma.patrocinadores.delete({
                where: { id_patrocinador: idSponsor }
            });
            return response.id_patrocinador ? true : false;
        } catch (error) {
            console.error(`Error deleting sponsor: ${error}`);
            return false;
        }
    }
}