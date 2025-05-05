import { CharacterApplication } from "../../../../app";
import { Response, Request } from "express";
import { ResponseApi } from "../../../../util";
export class CharacterController {  
    constructor( private readonly _character: CharacterApplication ) {}
    async getCharacter( req: Request, res: Response ): Promise<any> {
        try {
            const q  = req.query as any;
            const response = await this._character.getCharacter( q  );
            return response.length === 0 ? ResponseApi.notFoundResponse( res, 'No se encontraron personajes', response ) :
                ResponseApi.successResponse( res, 'Personajes obtenidos correctamente', response );
        } catch ( error ) {
            console.error( `Error al obtener los personajes: ${error}` );
            return ResponseApi.errorResponse( res, 'Error al obtener los personajes', error );
        }
    }
}