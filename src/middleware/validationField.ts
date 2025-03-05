import { Response } from "express";
import { validationResult } from "express-validator";
import { ResponseApi } from "../util";
export const validationField = (req: any, res: Response, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return ResponseApi.errorResponse(res, 'Error en los campos', errors.mapped());
    }
    next();
}