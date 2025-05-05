import { ModelIAApplication } from "../../../../app";
import { Response, Request } from "express";
import { ResponseApi } from "../../../../util";
import { UserPetition } from "../../../../domain";
export class ModelIAController {
    constructor( private readonly _modelIA: ModelIAApplication ) {}
    async generateText( req: Request, res: Response ): Promise<any> {
        try {
            const { promp } = req.body ;
            const response = await this._modelIA.generateText( promp );
            return ResponseApi.successResponse( res, 'La ia dice', response );
        } catch ( error ) {
            console.error( `Error al obtener la respuesta: ${error}` );
            return ResponseApi.errorResponse( res, 'Error al crear el promp', error );
        }
    }
}