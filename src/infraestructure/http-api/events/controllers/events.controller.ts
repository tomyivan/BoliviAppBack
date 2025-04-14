import { EventsApplication } from "../../../../app";
import { Response, Request } from "express";
import { ResponseApi } from "../../../../util";
export class EventsController {
    constructor( private readonly _eventsApplication: EventsApplication ) {}
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