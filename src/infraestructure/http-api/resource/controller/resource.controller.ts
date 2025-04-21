import { Request, Response } from "express";
import { ResourceApplication } from "../../../../app";
import { ResponseApi } from "../../../../util";
export class ResourceController {
    constructor( private readonly _resourceApp: ResourceApplication ) {}
    async getResource(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const response = await this._resourceApp.getResource(id ? Number(id) : undefined);            
            return response.length === 0 ? ResponseApi.notFoundResponse(res, 'No hay recursos', response) :
            ResponseApi.successResponse(res, 'Recursos obtenidos', response);
        } catch (error) {
            console.log(error);
            return ResponseApi.errorResponse(res, 'Error en el servidor', error);
        }
    }
    async addResource(req: Request, res: Response): Promise<Response> {
        try {
            const { resource } = req.body;
            const response = await this._resourceApp.createResource(resource);            
            return response ? ResponseApi.successResponse(res, 'Recurso creado', response) :
            ResponseApi.errorResponse(res, 'Recurso no creado', response);
        } catch (error) {
            console.log(error);
            return ResponseApi.errorResponse(res, 'Error en el servidor', error);
        }
    }
    async updateResource(req: Request, res: Response): Promise<Response> {
        try {
            const { resource } = req.body;
            const response = await this._resourceApp.updateResource(resource);            
            return response ? ResponseApi.successResponse(res, 'Recurso actualizado', response) :
            ResponseApi.errorResponse(res, 'Recurso no actualizado', response);
        } catch (error) {
            console.log(error);
            return ResponseApi.errorResponse(res, 'Error en el servidor', error);
        }
    }
    async deleteResource(req: Request, res: Response): Promise<Response> {
        try {
            const { idResource } = req.params;
            const response = await this._resourceApp.deleteResource(Number(idResource));            
            return response ? ResponseApi.successResponse(res, 'Recurso eliminado', response) :
            ResponseApi.errorResponse(res, 'Recurso no eliminado', response);
        } catch (error) {
            console.log(error);
            return ResponseApi.errorResponse(res, 'Error en el servidor', error);
        }
    }
}