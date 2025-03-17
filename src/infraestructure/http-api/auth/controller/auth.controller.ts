import { AuthApplication } from "../../../../app";
import { GoogleDTO } from "../../../../domain";
import { ResponseApi } from "../../../../util";
import { Request, Response } from 'express';
export class AuthController {
    constructor( private readonly _authApplication: AuthApplication ) {}
    async refreshToken(req:Request, res:Response): Promise<Response> {
        const auth = req;              
        try {
            const response = await this._authApplication.refreshToken(auth as any);            
            return ResponseApi.successResponse(res, 'Token actualizado', response);
        } catch (error) {
            console.log(error);
            return ResponseApi.errorResponse(res, 'Error en el servidor', error);
        }
    }
    async auth(req: Request, res: Response) {
        try {
            const { auth } = req.body;
            const response = await this._authApplication.login(auth);                     
            return  response? ResponseApi.successResponse(res, 'Usuario logueado', response) :
            ResponseApi.errorResponse(res, 'Usuario no encontrado', response);
        } catch (error) {
            console.log(error);
            return ResponseApi.errorResponse(res, 'Error en el servidor', error);
        }
    }

    async loginWithGoogle( data: GoogleDTO ): Promise<any> {
        try {
            const response = await this._authApplication.loginWithGoogle(data);         
            return response;
        } catch (error) {
            console.log(error);
            throw error;            
        }
    }

    async addUser(req:Request, res: Response): Promise<any> {
        try {
            const { auth } = req.body;            
            const response = await this._authApplication.addUser( auth );            
            return response? ResponseApi.successResponse(res, 'Usuario registrado', response) :
            ResponseApi.errorResponse(res, 'Usuario no registrado', response);
        } catch (error) {
            console.log(error);
            return ResponseApi.errorResponse(res, 'Error en el servidor', error);
        }
    }

}