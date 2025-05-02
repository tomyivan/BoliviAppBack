import { HistoryApplication } from "../../../../app";
import { ResponseApi } from "../../../../util";
import { Request, Response } from "express";

export class HistoryController {
    constructor( private readonly _historyApplication: HistoryApplication ) {}

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