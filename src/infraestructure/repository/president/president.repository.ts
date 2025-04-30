import { PresidentFilter, IPresident, President, PresidentImage, Mandate, PresidentDTO } from "../../../domain";
import { PresidentQuery } from "../query/president.query";
import { Execute } from "../datasource/querys.execute";
import { PrismaClient } from "@prisma/client";
export class PresidentRepository implements IPresident {
    constructor( private readonly prisma: PrismaClient ) { }  
    getPresidents(q?: PresidentFilter):Promise<PresidentDTO[]>{
        return  Execute.getData( PresidentQuery.getPresident( q ) )
    }  
    async getPresidentById( idPresident: number ):Promise<PresidentDTO> {
        const response = await Execute.getData( PresidentQuery.getPresident( { idPresident: idPresident } ) )
        return response[0];
    }
    
    createPresident( president: President ): Promise<Boolean> {
        return this.prisma.$transaction(async (tx) => {
            try {
                const response = await tx.presidentes.create({
                    data: {
                        nombre: president.name,
                        apellido: president.lastname,
                        biografia: president.biography,
                        fecha_nacimiento: `${president.dateBirthday}T00:00:00Z`,
                        fecha_muerte: president.dateDeath ? `${president.dateDeath}T00:00:00Z` : undefined,
                        eventos_importantes: president.importantEvents,
                        id_partido_politico: president.idPoliticalParty
                    }
                });
                await tx.mandatos_presidente.createMany({
                    data: president.mandates.map((mandate) => ({
                        id_presidente: response.id_presidente,
                        nro_mandato: Number(mandate.nroMandate),
                        fecha_ini: `${mandate.startDate}T00:00:00Z`,
                        fecha_fin: `${mandate.endDate}T00:00:00Z`,
                        observacion: mandate.observation
                    }))
                });
                await tx.historial_usuario.create({
                    data: {
                        table_nom: 'presidentes',
                        id_usuario: 1,
                        id_metodo: response.id_presidente,
                        fecha_creacion: new Date(),
                        accion: 'add',
                        descripcion: `Se ha creado el presidente ${president.name} ${president.lastname}`,
                    }
                })
                return response.id_presidente ? true : false;
            } catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    updatePresident( president: President ): Promise<Boolean> {
        return this.prisma.$transaction(async (tx) => {
            try {
                const response = await tx.presidentes.update({
                    where: {
                        id_presidente: president.idPresident
                    },
                    data: {
                        nombre: president.name,
                        apellido: president.lastname,
                        biografia: president.biography,
                        fecha_nacimiento: `${president.dateBirthday}T00:00:00Z`,
                        fecha_muerte: president.dateDeath ? `${president.dateDeath}T00:00:00Z` : undefined,
                        eventos_importantes: president.importantEvents,
                        id_partido_politico: president.idPoliticalParty
                    }
                });
                await tx.mandatos_presidente.deleteMany({
                    where: {
                        id_presidente: president.idPresident
                    }
                });
                await tx.mandatos_presidente.createMany({
                    data: president.mandates.map((mandate) => ({
                        id_presidente: response.id_presidente,
                        nro_mandato: Number(mandate.nroMandate),
                        fecha_ini: `${mandate.startDate}T00:00:00Z`,
                        fecha_fin: `${mandate.endDate}T00:00:00Z`,
                        observacion: mandate.observation
                    }))
                });
                await tx.historial_usuario.create({
                    data: {
                        id_usuario: 1,
                        table_nom: 'presidentes',
                        id_metodo: response.id_presidente,
                        fecha_creacion: new Date(),
                        accion: 'update',
                        descripcion: `Se ha actualizado el presidente ${president.name} ${president.lastname}`,
                    }
                })
                return response.id_presidente ? true : false;
            } catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    deletePresident( idPresident: number ): Promise<Boolean> {
        return this.prisma.$transaction(async (tx) => {
            try {
                const response = await tx.presidentes.update({
                    where: {
                        id_presidente: idPresident
                    },
                    data: {
                        activo: 0,
                    }
                });
                await tx.historial_usuario.create({
                    data: {
                        id_usuario: 1,
                        table_nom: 'presidentes',
                        id_metodo: response.id_presidente,
                        fecha_creacion: new Date(),
                        accion: 'update',
                        descripcion: `Se ha eliminado el presidente ${response.nombre} ${response.apellido}`,
                    }
                })
                await tx.archivos_presidente.updateMany({
                    where: {
                        id_presidente: idPresident
                    },
                    data: {
                        activo: 0,
                    }
                });
                return response.id_presidente ? true : false;
            } catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getPresidentImagesByIdPresident( idPresident: number ): Promise<PresidentImage[]> {
        return Execute.getData( PresidentQuery.getImages( idPresident ) )
    }
    createPresidentImage( presidentImage: PresidentImage ): Promise<Boolean> {
        try {
            return this.prisma.$transaction(async (tx) => {
                const response = await tx.archivos_presidente.create({
                    data: {
                        id_presidente: presidentImage.idPresident,
                        nombre: presidentImage.name,                        
                    }
                });
                await tx.historial_usuario.create({
                    data: {
                        id_usuario: 1,
                        id_metodo: response.id_archivo,
                        fecha_creacion: new Date(),
                        accion: 'add',
                        table_nom: 'archivos_presidente',
                        descripcion: `Se ha creado una imagen de un presidente`,
                    }
                })
                return response.id_archivo ? true : false;
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    isFacePageImage( idFile: number, idPresident:number ): Promise<Boolean> {
        return this.prisma.$transaction(async (tx) => {
            try {
                await tx.archivos_presidente.updateMany({
                    where: {
                        id_presidente: idPresident,
                        es_portada: 1
                    },
                    data: {
                        es_portada: 0
                    }
                });
                const response = await tx.archivos_presidente.update({
                    where: {
                        id_archivo: idFile
                    },
                    data: {
                        es_portada: 1
                    }
                });
                return response.id_archivo ? true : false;
            } catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    deletePresidentImage( idFile: number ): Promise<Boolean> {
        return this.prisma.$transaction(async (tx) => {
            try {
                const response = await tx.archivos_presidente.delete({
                    where: {
                        id_archivo: idFile
                    }
                });
                await tx.historial_usuario.create({
                    data: {
                        id_usuario: 1,
                        id_metodo: response.id_archivo,
                        fecha_creacion: new Date(),
                        accion: 'delete',
                        table_nom: 'archivos_presidente',
                        descripcion: `Se ha eliminado una imagen de un presidente`,
                    }
                })
                return response.id_archivo ? true : false;
            } catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getMandates( idPresident: number ): Promise<Mandate[]> {
        return Execute.getData( PresidentQuery.getMandates( idPresident ) )
    }

}