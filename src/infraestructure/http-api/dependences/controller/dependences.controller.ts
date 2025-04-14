import { DependencesApplication } from "../../../../app";
import { ResponseApi } from "../../../../util";
import { Response, Request } from "express";
export class DependencesController {
    constructor ( private readonly _dependencesApplication: DependencesApplication ) {}
    
    async getDepartments (req: Request, res: Response): Promise<Response> {
        try {
            const response = await this._dependencesApplication.getDepartments();            
            return response.length === 0 ? ResponseApi.notFoundResponse(res, 'No hay departamentos', response) :
            ResponseApi.successResponse(res, 'Departamentos obtenidos', response);
        } catch (error) {
            console.log(error);
            return ResponseApi.errorResponse(res, 'Error en el servidor', error);
        }
    }
}