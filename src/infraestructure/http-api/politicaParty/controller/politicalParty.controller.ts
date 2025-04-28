import { PoliticalPartyApplication } from "../../../../app";
import { Response, Request } from "express";
import { ResponseApi } from "../../../../util";
export class PoliticalPartyController {
    constructor( private readonly _politicalPartyApplication: PoliticalPartyApplication ) {}
    async getPoliticalParties( req: Request, res: Response ) {
        try {
            const response = await this._politicalPartyApplication.getPoliticalParties();
            return response.length > 0 ? ResponseApi.successResponse( res, 'Partidos Politicos obtenidos', response ) :
            ResponseApi.errorResponse( res, 'No se econtraron partidos politicos', [] );
        } catch ( error ) {
            return ResponseApi.errorResponse( res, 'Error en el servidor', error );
        }
    }
    async createPoliticalParty( req: Request, res: Response ) {
        try {
            const { politicalParty } = req.body;
            const response = await this._politicalPartyApplication.createPoliticalParty( politicalParty );
            return response ? ResponseApi.successResponse( res, 'Partido Politico creado', response ) :
            ResponseApi.errorResponse( res, 'Partido Politico no creado', response );
        } catch ( error ) {
            return ResponseApi.errorResponse( res, 'Error en el servidor', error );
        }
    }
    async updatePoliticalParty( req: Request, res: Response ) {
        try {
            const { politicalParty } = req.body;
            const response = await this._politicalPartyApplication.updatePoliticalParty( politicalParty );
            return response ? ResponseApi.successResponse( res, 'Partido Politico actualizado', response ) :
            ResponseApi.errorResponse( res, 'Partido Politico no actualizado', response );
        } catch ( error ) {
            return ResponseApi.errorResponse( res, 'Error en el servidor', error );
        }
    }
    async deletePoliticalParty( req: Request, res: Response ) {
        try {
            const { idPoliticalParty } = req.params;
            const response = await this._politicalPartyApplication.deletePoliticalParty( Number(idPoliticalParty) );
            return response ? ResponseApi.successResponse( res, 'Partido Politico eliminado', response ) :
            ResponseApi.errorResponse( res, 'Partido Politico no eliminado', response );
        } catch ( error ) {
            return ResponseApi.errorResponse( res, 'Error en el servidor', error );
        }
    }
}