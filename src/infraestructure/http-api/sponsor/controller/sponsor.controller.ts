import { Request, Response } from "express";
import { SponsorApplication } from "../../../../app";
import { ResponseApi } from "../../../../util";
export class SponsorController {
    constructor( private readonly _sponsorApplication: SponsorApplication ) {}
    async getSponsors(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const response = await this._sponsorApplication.getSponsor(id ? Number(id) : undefined);            
            return response.length === 0 ? ResponseApi.notFoundResponse(res, 'No hay sponsors', response) :
            ResponseApi.successResponse(res, 'Sponsors obtenidos', response);
        } catch (error) {
            console.log(error);
            return ResponseApi.errorResponse(res, 'Error en el servidor', error);
        }
    }
    async addSponsor(req: Request, res: Response): Promise<Response> {
        try {
            const { sponsor } = req.body;
            const response = await this._sponsorApplication.addSponsor(sponsor);            
            return response ? ResponseApi.successResponse(res, 'Sponsor creado', response) :
            ResponseApi.errorResponse(res, 'Sponsor no creado', response);
        } catch (error) {
            console.log(error);
            return ResponseApi.errorResponse(res, 'Error en el servidor', error);
        }
    }
    async updateSponsor(req: Request, res: Response): Promise<Response> {
        try {
            const { sponsor } = req.body;
            const response = await this._sponsorApplication.updateSponsor(sponsor);            
            return response ? ResponseApi.successResponse(res, 'Sponsor actualizado', response) :
            ResponseApi.errorResponse(res, 'Sponsor no actualizado', response);
        } catch (error) {
            console.log(error);
            return ResponseApi.errorResponse(res, 'Error en el servidor', error);
        }
    }
    async deleteSponsor(req: Request, res: Response): Promise<Response> {
        try {
            const { idSponsor } = req.params;
            const response = await this._sponsorApplication.deleteSponsor(Number(idSponsor));            
            return response ? ResponseApi.successResponse(res, 'Sponsor eliminado', response) :
            ResponseApi.errorResponse(res, 'Sponsor no eliminado', response);
        } catch (error) {
            console.log(error);
            return ResponseApi.errorResponse(res, 'Error en el servidor', error);
        }
    }
}