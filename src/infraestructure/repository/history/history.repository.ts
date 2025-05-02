import { IHistory, History } from "../../../domain";
import { PrismaClient } from "@prisma/client";
export class HistoryRepository implements IHistory {
    constructor( private readonly _prisma: PrismaClient ) {}
    async createHistory( history: History, idUserCreate: number ): Promise<Boolean> {
        try {
            return await this._prisma.$transaction(async (prisma) => {
                const response = await prisma.historias.create({
                    data: {
                        titulo: history.title,
                        fecha_ini: `${history.dateStart}T00:00:00.000Z`,
                        fecha_fin: `${history.dateEnd}T00:00:00.000Z`,
                        resumen: history.summary,
                        descripcion: history.description,
                        id_categoria: history.idCategory
                    }
                });
                for (const location of history.locations){
                    const resLocation = await prisma.lugares.create({
                        data: {
                            nombre: location.name,
                            latitud: location.latitude,
                            longitud: location.longitude,
                            cod_departamento: location.codDepartment,
                            
                        }
                    });
                    await prisma.historias_ubicaciones.create({
                        data: {
                            id_historia: response.id_historia,
                            id_ubicacion: resLocation.id_lugar
                        }
                    });
                }
                await prisma.historia_personajes.createMany({
                    data: history.characters.map((character) => ({
                        id_historia: response.id_historia,
                        id_personaje: character.idCharacter
                    }))
                });
                
                await prisma.referencias.createMany({
                    data: history.referencesHistory.map((reference) => ({
                        id_historia: response.id_historia,
                        referencia: reference.reference,

                    }))
                });
                prisma.historial_usuario.create({
                    data: {
                        id_usuario: idUserCreate,
                        id_metodo: response.id_historia,
                        table_nom: "eventos",
                        accion: "add",
                        descripcion: "Evento creado correctamente",
                        fecha_creacion: new Date(),
                    }
                });
                return response.id_historia ? true : false;
            });
        } catch (error) {
            console.error(`Error creating history: ${error}`);
            return false;
        }
    }
}
