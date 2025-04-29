import { PrismaClient } from "@prisma/client";
import { Events, EventSimpleDTO, IEvent, List, EventFilters, FileEvent, EventDTO } from "../../../domain";
import { Execute } from "../datasource/querys.execute";
import { EventsQuery } from "../query/events.query";
export class EventRepository implements IEvent {
    constructor( private readonly prisma: PrismaClient ) {}
    async getSimpleEvents(q? : EventFilters): Promise<EventSimpleDTO[]> {
        return await Execute.getData(EventsQuery.getSimpleEvents(q));
    }
    async getEventSponsors(idEvent: number): Promise<any> {
        return await Execute.getData(EventsQuery.getSponsorsEvent(idEvent));
    }
    async getEventResources(idEvent: number): Promise<any[]> {
        return await Execute.getData(EventsQuery.getResourcesEvent(idEvent));
    }
    async getImages(idEvent: number): Promise<FileEvent[]> {
        return await Execute.getData(EventsQuery.getImageEvent(idEvent));
    }
    async getEvents(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async getEventById(idEvent: number): Promise<EventDTO> {
        const response = await Execute.getData(EventsQuery.getEventById(idEvent));
        return response[0];
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
                        table_nom: "eventos",
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
                await pr.eventos_patrocinadores.createMany({
                    data: eventData.sponsors.map((sponsor) => ({
                        id_evento: event.id_evento,
                        id_patrocinador: sponsor.idSponsor,
                        producto: sponsor.product,
                        servicio: sponsor?.service,
                        cantidad: Number(sponsor.stock),
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
    async updateEvent(eventData: Events, idUserUpdate: number): Promise<Boolean> {
        try {
            return await this.prisma.$transaction(async (pr) => {
                if (!eventData.idEvent) {
                    return false;
                }
                const event = await pr.eventos.update({
                    where: {
                        id_evento: eventData.idEvent,
                    },
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
                        id_usuario: idUserUpdate,
                        id_metodo: eventData.idEvent,
                        table_nom: "eventos",
                        accion: "update",
                        descripcion: "Evento actualizado correctamente",
                        fecha_creacion: new Date(),
                    }
                });
                await pr.ubicaciones_eventos.deleteMany({
                    where: {
                        id_evento: eventData.idEvent,
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
                        id_evento: eventData.idEvent,
                    }
                });
                await pr.recursos_eventos.deleteMany({
                    where: {
                        id_evento: eventData.idEvent,
                    }
                });
                await pr.eventos_patrocinadores.deleteMany({
                    where: {
                        id_evento: eventData.idEvent,
                    }
                });
                await pr.recursos_eventos.createMany({
                    data: eventData.resources.map((resource) => ({
                        id_recurso: resource.idResource,
                        id_evento: Number(eventData.idEvent),
                        cantidad: Number(resource.amount),
                        monto: Number(resource.stock),
                    }))
                });
                await pr.eventos_patrocinadores.createMany({
                    data: eventData.sponsors.map((sponsor) => ({
                        id_evento: Number(eventData.idEvent),
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
    async deleteEvent(idEvent: number): Promise<Boolean> {
        try {
            return await this.prisma.$transaction(async (pr) => {
                const event = await pr.eventos.update({
                    where: {
                        id_evento: idEvent,
                    },
                    data: {
                        activo: 0,
                    }
                });
                pr.historial_usuario.create({
                    data: {
                        table_nom: "eventos",
                        id_usuario: 1,
                        id_metodo: idEvent,
                        accion: "delete",
                        descripcion: "Evento eliminado correctamente",
                        fecha_creacion: new Date(),
                    }
                });
                return !!event;
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async uploadImage( file: FileEvent, userAdd:number ): Promise<Boolean> {
        try {
            return await this.prisma.$transaction(async (pr) => {
                const response = await pr.archivo_eventos.create({
                    data: {
                        nombre: file.name,
                        id_evento: file.idEvent,
                        ext: file.ext,
                    }
                });
                pr.historial_usuario.create({
                    data: {
                        table_nom: "archivo_eventos",
                        id_usuario: userAdd,
                        id_metodo: file.idEvent,
                        accion: "add",
                        descripcion: "Archivo creado correctamente",
                        fecha_creacion: new Date(),
                    }
                });
                return !!response;
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async dropImage(idFile: number): Promise<Boolean> {
        try {
            return await this.prisma.$transaction(async (pr) => {
                const response = await pr.archivo_eventos.delete({
                    where: {
                        id_archivo: idFile,
                    }
                });
                pr.historial_usuario.create({
                    data: {
                        table_nom: "archivo_eventos",
                        id_usuario: 1,
                        id_metodo: idFile,
                        accion: "delete",
                        descripcion: "Archivo eliminado correctamente",
                        fecha_creacion: new Date(),
                    }
                });
                return !!response;
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getSponsorsEventSimple(idEvent: number): Promise<any[]> {
        return await Execute.getData(EventsQuery.getSponsorNameEvent(idEvent));
    }
}