import { EventsApplication } from "../../../../app";
import { Response, Request } from "express";
import { ResponseApi } from "../../../../util";
import { EventFilters } from "../../../../domain";
export class EventsController {
    constructor( private readonly _eventsApplication: EventsApplication ) {}
    async getSimpleEvents( req: Request, res: Response ) {
        try {
            const { q } = req.query;
            const response = await this._eventsApplication.getSimpleEvents( q as EventFilters );
            return response.length > 0 ? ResponseApi.successResponse( res, 'Eventos obtenidos', response ) :
            ResponseApi.errorResponse( res, 'No se econtraron eventos', [] );
        } catch ( error ) {
            return ResponseApi.errorResponse( res, 'Error en el servidor', error );
        }
    }
    async getCategoryEvents( req: Request, res: Response ) {
        try {
            const response = await this._eventsApplication.getCategoryEvents();
            return response.length > 0 ? ResponseApi.successResponse( res, 'Eventos obtenidos', response ) :
            ResponseApi.errorResponse( res, 'No se econtraron eventos', [] );
        } catch ( error ) {
            return ResponseApi.errorResponse( res, 'Error en el servidor', error );
        }
    }
    async createEvent( req: Request, res: Response ) {
        try {
            const { event } = req.body;
            const idUserCreate = req.name;
            const response = await this._eventsApplication.createEvent( event, 1 );
            return response ? ResponseApi.successResponse( res, 'Evento creado', response ) :
            ResponseApi.errorResponse( res, 'Evento no creado', response );
        } catch ( error ) {
            return ResponseApi.errorResponse( res, 'Error en el servidor', error );
        }
    }
}