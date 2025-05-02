import { History } from "../../domain";
import { Response, Request } from "express";
import { ResponseApi } from "../../util";
export class HistoryFieldMiddleware {
    static validationLocation( req: Request, res: Response, next: Function ) {
        const  { history }  = req.body ;        
        if ( !history.locations || history?.locations.length === 0 ) {
            return ResponseApi.errorResponse( res, "El campo 'locations' es obligatorio y no puede estar vacío.", {} );
        }
        next();
    }
    static validationCharacters( req: Request, res: Response, next: Function ) {
        const  { history }   = req.body ;        
        if ( !history.characters || history?.characters.length === 0 ) {
            return ResponseApi.errorResponse( res, "El campo 'characters' es obligatorio y no puede estar vacío.", {} );
        }
        next();
    }
    static validtionReference( req: Request, res: Response, next: Function ) {
        const  { history }  = req.body;        
        if ( !history.referencesHistory || history?.referencesHistory.length === 0 ) {
            return ResponseApi.errorResponse( res, "El campo 'referencesHistory' es obligatorio y no puede estar vacío.", {} );
        }
        next();
    }
}