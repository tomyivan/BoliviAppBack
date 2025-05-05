import { HistoryApplication } from "../../../../app";
import { HistoryFilter } from "../../../../domain";
import { ResponseApi } from "../../../../util";
import { Request, Response } from "express";

export class HistoryController {
    constructor( private readonly _historyApplication: HistoryApplication ) {}
    async getCategoryHistory( req: Request, res: Response ): Promise<Response> {
        try {
            const response = await this._historyApplication.getCategoryHistory(  );
            return response.length > 0 ? ResponseApi.successResponse(res, "Categorias obtenidas correctamente", response) :
                ResponseApi.notFoundResponse(res, "No se encontraron las categorias", response);
        } catch ( error ) {
            console.error(`Error getting category history: ${error}`);
            return ResponseApi.errorResponse(res, "Error al obtener las historias", error);
        }
    }
    async getHistory( req: Request, res: Response ): Promise<Response> {
        try {
            const q  = req.query as any;
            const response = await this._historyApplication.getHistory( q );
            return response ? ResponseApi.successResponse(res, "Historias obtenidas correctamente", response) :
                ResponseApi.notFoundResponse(res, "Error al obtener las historias", response);
        } catch ( error ) {
            return ResponseApi.errorResponse(res, "Error al obtener las historias", error);
            console.error(`Error getting history: ${error}`);
        }
    }
    async createHistory( req: Request, res: Response ): Promise<Response> {
        try {
            const { history } = req.body;
            const { idUserCreate } = req.params;
            const response = await this._historyApplication.createHistory( history, Number( idUserCreate ) );
            return response ? ResponseApi.successResponse(res, "Historia creada correctamente", response) :
                ResponseApi.notFoundResponse(res, "Error al crear la historia", response);
        } catch ( error ) {
            return ResponseApi.errorResponse(res, "Error al crear la historia", error);
            console.error(`Error creating history: ${error}`);
        }
    }
} 