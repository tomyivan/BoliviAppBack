import { EventFilters, EventInfo, Events, EventSimpleDTO, FileEvent, IEvent, List } from "../../domain";
import dayjs from "dayjs";

export class EventsApplication {
    constructor( private readonly _events: IEvent ) {}

    async getEventById( idEvent: number ): Promise<Events> {        
        const result = await this._events.getEventById( idEvent );
        const sponsors = await this._events.getEventSponsors( idEvent );
        const resources = await this._events.getEventResources( idEvent );
        const newData: Events = {
            date: dayjs(result.dateEvent).utc().format("YYYY-MM-DD"),
            startTime: dayjs(result.startTime).utc().format("HH:mm"),
            endTime: dayjs(result.endTime).utc().format("HH:mm"),
            name: result.name,
            detail: result.detail,
            idCategory: result.idCategory,
            idEvent: result.idEvent,
            location: {
                idLocation: result.idLocation,
                name: result.locationEvent,
                latitude: result.latitude,
                longitude: result.longitude,
                codDepartment: result.codDepartment,
            },
            sponsors: sponsors,
            resources: resources,
        }
    return newData
    }
    async getEventInfo( idEvent: number ): Promise<EventInfo> {
        const result = await this._events.getEventById( idEvent );
        const sponsors = await this._events.getSponsorsEventSimple( idEvent );
        return {
            idEvent: result.idEvent,
            date: dayjs(result.dateEvent).utc().format("YYYY-MM-DD"),
            startTime: dayjs(result.startTime).utc().format("HH:mm"),
            endTime: dayjs(result.endTime).utc().format("HH:mm"),
            name: result.name,
            detail: result.detail,
            category: result.category,
            location: {
                idLocation: result.idLocation,
                location: result.name,
                latitude: result.latitude,
                longitude: result.longitude,
                department: result.departament,
            },
            sponsors: sponsors,
        }
    }
    getSimpleEvents( q?: EventFilters ): Promise<EventSimpleDTO[]> {
        return this._events.getSimpleEvents( q );
    }

    getCategoryEvents(): Promise<List[]> {
        return this._events.getCategoryEvents();
    }
    createEvent( data: Events, idUserCreate: number ): Promise<Boolean> {        
        return this._events.createEvent( data, idUserCreate );
    }
    updateEvent( data: Events, idUserUpdate: number ): Promise<Boolean> {
        return this._events.updateEvent( data, idUserUpdate );
    }
    async uploadImage( file: Express.Multer.File, idEvent: number, userAdd:number ): Promise<Boolean> {
        const fileData: FileEvent = {
            idEvent: idEvent,
            name: file.filename,
            ext: file.mimetype.split("/")[1],
        };
        return this._events.uploadImage( fileData, userAdd );
    }
    getImages( idEvent: number ): Promise<FileEvent[]> {
        return this._events.getImages( idEvent );
    }
    dropImage( idFile: number ): Promise<Boolean> {
        return this._events.dropImage( idFile );
    }
}