import { NextFunction, Request, Response } from "express";
import { ResponseApi } from "../../util";
import { AuthRepository } from "../../infraestructure/repository";
import { authApp } from "../../infraestructure/dependences/auth.dependences";

export class AuthMiddleware {
    static async existEmail(req:Request, res:Response, next:NextFunction) {
        const { auth } = req.body;
        try {
            const response = await authApp.getByEmail(auth.email);
            if (response?.idUser) return ResponseApi.errorResponse(res, 'Ya existe un usuario con ese correo', null);
            next();
        } catch (error) {
            console.log(error);
            return ResponseApi.errorResponse(res, 'Error al verifcar', error);
        }        
    }
    static async verifyCode(req:Request, res:Response, next:NextFunction) {
        const { auth } = req.body;
        try {
            const response = await authApp.verifyCode(auth);
            if (!response) return ResponseApi.errorResponse(res, 'Codigo invalido', null);
            auth.isVerify = 1;
            next();
        } catch (error) {
            console.log(error);
            return ResponseApi.errorResponse(res, 'Error al verifcar', error);
        }
    }
    static async noExistEmail(req:Request, res:Response, next:NextFunction) {
        const { auth } = req.body;
        try {
            const response = await authApp.getByEmail(auth.email, 'local');
            if (!response) return ResponseApi.errorResponse(res, 'No existe un usuario con ese correo', null);
            next();
        } catch (error) {
            console.log(error);
            return ResponseApi.errorResponse(res, 'Error al verifcar', error);
        }
    }
}