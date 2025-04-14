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

    async sendCode( req:Request, res:Response ) {
        try {
            const { auth } = req.body;
            const code = this._authApplication.generateVerificationCode(auth.email);
            const response = await this._authApplication.sendVerificationCode(auth.email, Number(code));            
            return response? ResponseApi.successResponse(res, 'Codigo enviado', response) :
             ResponseApi.errorResponse(res, 'Codigo no enviado', response);
        } catch (error) {
            console.log(error);
            return ResponseApi.errorResponse(res, 'Error en el servidor', error);
        }
    }

    async existEmail(req:Request, res:Response): Promise<any> {
        try {
            const { auth } = req.body;
            const response = await this._authApplication.getByEmail( auth.email );            
            return response?.idUser ? ResponseApi.successResponse(res, 'Email existente', true) :
            ResponseApi.errorResponse(res, 'Email no existente', false);
        } catch (error) {
            console.log(error);
            return ResponseApi.errorResponse(res, 'Error en el servidor', error);
        }
    }

    async existCode( req:Request, res:Response ): Promise<any> {
        try {
            const { auth } = req.body;
            const response = await this._authApplication.getCode( auth );            
            return response? ResponseApi.successResponse(res, 'Codigo existente', response) :
            ResponseApi.errorResponse(res, 'Codigo no existente', false);
        } catch (error) {
            console.log(error);
            return ResponseApi.errorResponse(res, 'Error en el servidor', error);
        }
    }

    async updatePass( req:Request, res:Response ): Promise<any> {
        try {
            const { auth } = req.body;            
            const response = await this._authApplication.updatePass( auth );            
            return response? ResponseApi.successResponse(res, 'Contraseña actualizada', response) :
            ResponseApi.errorResponse(res, 'Contraseña no actualizada', response);
        } catch (error) {
            console.log(error);
            return ResponseApi.errorResponse(res, 'Error en el servidor', error);
        }
    }

}