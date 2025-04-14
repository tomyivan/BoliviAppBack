import { ResponseApi } from "../../../../util";
import { CityApplication } from "../../../../app";
import { Request, Response } from 'express';
export class CityController {
    constructor( private readonly _cityApplication: CityApplication ) {}
    async getCountries(req:Request, res:Response): Promise<Response> {
        try {
            const response = await this._cityApplication.getCountries();            
            return response.length === 0 ? ResponseApi.notFoundResponse(res, 'No hay paises', response) :
            ResponseApi.successResponse(res, 'Paises obtenidos', response);
        } catch (error) {
            console.log(error);
            return ResponseApi.errorResponse(res, 'Error en el servidor', error);
        }
    }
    async getStates(req:Request, res:Response): Promise<Response> {
        try {
            const { iso2 } = req.params;
            console.log(iso2);
            const response = await this._cityApplication.getStates(iso2);            
            return response.length === 0 ? ResponseApi.notFoundResponse(res, 'No hay estados', response) :
            ResponseApi.successResponse(res, 'Estados obtenidos', response);
        } catch (error) {
            console.log(error);
            return ResponseApi.errorResponse(res, 'Error en el servidor', error);
        }
    }
}