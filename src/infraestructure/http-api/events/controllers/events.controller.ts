import { EventsApplication } from "../../../../app";
import { Response, Request } from "express";
import { ResponseApi } from "../../../../util";

export class EventsController {
    constructor( private readonly _eventsApplication: EventsApplication ) {}
    async getEventById( req: Request, res: Response ) {
        try {
            const { idEvent } = req.params;
            const response = await this._eventsApplication.getEventById( Number(idEvent) );
            return response ? ResponseApi.successResponse( res, 'Evento obtenido', response ) :
            ResponseApi.errorResponse( res, 'No se econtraron eventos', [] );
        } catch ( error ) {
            return ResponseApi.errorResponse( res, 'Error en el servidor', error );
        }
    }
    async getSimpleEvents( req: Request, res: Response ) {
        try {
            const { q } = req.query;
            console.log( q );
            const response = await this._eventsApplication.getSimpleEvents( );
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
    async updateEvent( req: Request, res: Response ) {
        try {
            const { event } = req.body;
            const idUserUpdate = req.name;
            const response = await this._eventsApplication.updateEvent( event, 1 );
            return response ? ResponseApi.successResponse( res, 'Evento actualizado', response ) :
            ResponseApi.errorResponse( res, 'Evento no actualizado', response );
        } catch ( error ) {
            return ResponseApi.errorResponse( res, 'Error en el servidor', error );
        }
    }
    async uploadImage( req: Request, res: Response ) {
        try {
            const { file, params, user } = req;
            const { idEvent } = params;
            const response = await this._eventsApplication.uploadImage( file as Express.Multer.File, Number(idEvent), 1 );
            return response ? ResponseApi.successResponse( res, 'Imagen subida', response ) :
            ResponseApi.errorResponse( res, 'Imagen no subida', response );
        } catch ( error ) {
            console.log( error )
            return ResponseApi.errorResponse( res, 'Error en el servidor', error );
        }
    }
    async getImages( req: Request, res: Response ) {
        try {
            const { idEvent } = req.params;
            const response = await this._eventsApplication.getImages( Number(idEvent) );
            return response.length > 0 ? ResponseApi.successResponse( res, 'Imagenes obtenidas', response ) :
            ResponseApi.errorResponse( res, 'No se econtraron imagenes', [] );
        } catch ( error ) {
            return ResponseApi.errorResponse( res, 'Error en el servidor', error );
        }
    }
    async dropImage( req: Request, res: Response ) {
        try {
            const { eventFile } = req.body;
            const response = await this._eventsApplication.dropImage( Number(eventFile.idFile) );
            return response ? ResponseApi.successResponse( res, 'Imagen eliminada', response ) :
            ResponseApi.errorResponse( res, 'Imagen no eliminada', response );
        } catch ( error ) {
            return ResponseApi.errorResponse( res, 'Error en el servidor', error );
        }
    }
    async getEventInfo( req: Request, res: Response ) {
        try {
            const { idEvent } = req.params;
            const response = await this._eventsApplication.getEventInfo( Number(idEvent) );
            return response.idEvent ? ResponseApi.successResponse( res, 'Evento Obtenido', response ) :
            ResponseApi.errorResponse( res, 'No se econtraron eventos', false );
        } catch ( error ) {
            return ResponseApi.errorResponse( res, 'Error en el servidor', error );
        }
    }
    async deleteEvent( req: Request, res: Response ) {  
        try {
            const { event } = req.body;
            const response = await this._eventsApplication.deleteEvent( Number(event.idEvent) );
            return response ? ResponseApi.successResponse( res, 'Evento eliminado', response ) :
            ResponseApi.errorResponse( res, 'Evento no eliminado', response );
        } catch ( error ) {
            return ResponseApi.errorResponse( res, 'Error en el servidor', error );
        }
    }
}