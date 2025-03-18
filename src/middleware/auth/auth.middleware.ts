import { NextFunction, Request, Response } from "express";
import { ResponseApi } from "../../util";
import { AuthRepository } from "../../infraestructure/repository";
import { AuthApplication } from "../../app";

export class AuthMiddleware {
    static async existEmail(req:Request, res:Response, next:NextFunction) {
        const { auth } = req.body;
        try {
            const _authRepo = new AuthRepository();
            const _authApplication = new AuthApplication(_authRepo);
            const response = await _authApplication.getByEmail(auth.email);
            if (response) return ResponseApi.errorResponse(res, 'Ya existe un usuario con ese correo', null);
            next();
        } catch (error) {
            console.log(error);
            return ResponseApi.errorResponse(res, 'Error al verifcar', error);
        }        
    }
    static async verifyCode(req:Request, res:Response, next:NextFunction) {
        const { auth } = req.body;
        try {
            const _authRepo = new AuthRepository();
            const _authApplication = new AuthApplication(_authRepo);
            const response = await _authApplication.verifyCode(auth);
            if (!response) return ResponseApi.errorResponse(res, 'Codigo invalido', null);
            next();
        } catch (error) {
            console.log(error);
            return ResponseApi.errorResponse(res, 'Error al verifcar', error);
        }
    }
}