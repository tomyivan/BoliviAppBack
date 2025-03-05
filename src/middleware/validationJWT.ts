import { Request, Response } from "express";
import { ResponseApi } from "../util";
import jwt, { JwtPayload }  from "jsonwebtoken";
import "dotenv/config";

const validationJWT = async (req: Request, res: Response, next: any) => {
    const token: string = req.header('x-token') || '';
    if (!token) {
        return ResponseApi.notFoundResponse(res, 'Ingrese sus credenciales', null);
    }
    try {
        const { name, nickname, city, rol, email } = jwt.verify( token, process.env.SECRET_JWT_SEED || '' ) as JwtPayload;       
        req.name = name;
        req.nickname = nickname;
        req.rol = rol;
        req.email = email;   
        req.city = city;
        next();
    } catch (error) {
        console.log(error);
        return ResponseApi.errorResponse(res, 'Error en el servidor', error);
    }
}
export {
    validationJWT
}