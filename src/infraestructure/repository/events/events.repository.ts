import { PrismaClient } from "@prisma/client";
import { Events, EventSimpleDTO, IEvent, List, EventFilters } from "../../../domain";
import { Execute } from "../datasource/querys.execute";
import { EventsQuery } from "../query/events.query";
export class EventRepository implements IEvent {
    constructor( private readonly prisma: PrismaClient ) {}
    async getSimpleEvents(q? : EventFilters): Promise<EventSimpleDTO[]> {
        return await Execute.getData(EventsQuery.getSimpleEvents(q));
    }
    async getEvents(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async getEventById(idEvent: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async getCategoryEvents(): Promise<List[]> {
        return Execute.getData(EventsQuery.getCategoryEvents);
    }
    async createEvent(eventData: Events, idUserCreate: number): Promise<Boolean> {  
        try {
            return await this.prisma.$transaction(async (pr) => {
                const event = await pr.eventos.create({
                    data: {
                        fecha: `${eventData.date}T00:00:00Z`,
                        inicio: `1970-01-01T${eventData.startTime}:00Z`,
                        fin: `1970-01-01T${eventData.endTime}:00Z`,
                        nombre: eventData.name,
                        detalle: eventData.detail,
                        id_categoria: eventData.idCategory,
                    }
                });
                pr.historial_usuario.create({
                    data: {
                        id_usuario: idUserCreate,
                        id_metodo: event.id_evento,
                        accion: "add",
                        descripcion: "Evento creado correctamente",
                        fecha_creacion: new Date(),
                    }
                });
                const locations = await pr.lugares.create({
                    data: {
                        nombre: eventData.location.name,
                        latitud: eventData.location.latitude,
                        longitud: eventData.location.longitude,
                        cod_departamento: eventData.location.codDepartment,
                    }
                });            
                await pr.ubicaciones_eventos.create({
                    data: {
                        id_ubicacion: locations.id_lugar,
                        id_evento: event.id_evento,
                    }
                });
                await pr.recursos_eventos.createMany({
                    data: eventData.resources.map((resource) => ({
                        id_recurso: resource.idResource,
                        id_evento: event.id_evento,
                        cantidad: Number(resource.amount),
                        monto: Number(resource.stock),
                    }))
                });
                // await pr.archivo_eventos.createMany({
                //     data: eventData.file.map((file) => ({
                //         nombre: file.name,
                //         id_evento: event.id_evento,
                //         ext: file.ext,
                //     }))
                // });
                await pr.eventos_patrocinadores.createMany({
                    data: eventData.sponsors.map((sponsor) => ({
                        id_evento: event.id_evento,
                        id_patrocinador: sponsor.idSponsor,
                        producto: sponsor.product,
                        servicio: sponsor?.service,
                        cantidad: sponsor.stock,
                        observacion: sponsor.observation,
                        id_medida: sponsor.idMeasure,
                    }))
                });
                return !!event;
            });
        } catch (error) {
            console.log(error);
            throw error;
        }      
    }
    async updateEvent(data: Events): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
    async deleteEvent(idEvent: number): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
}