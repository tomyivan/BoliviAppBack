import { Request, Response } from "express";
import { ResponseApi } from "../../util";
import jwt, { JwtPayload }  from "jsonwebtoken";
import "dotenv/config";

const validationJWT = async (req: Request, res: Response, next: any) => {
    const token: string = req.header('x-token') || '';
    if ( !token ) return ResponseApi.notFoundResponse(res, 'Ingrese sus credenciales', null);
    try {       
        const {  email,
            name,
            nickname, 
            gender,
            phoneNumber,
            codPhone,     
            city,
            rol,
            isVerify } = jwt.verify( token, process.env.SECRET_JWT_SEED || '' ) as JwtPayload;       
        req.email = email;
        req.name = name;
        req.nickname = nickname;
        req.gender = gender;
        req.phoneNumber = phoneNumber;
        req.codPhone = codPhone;
        req.city = city;
        req.rol = rol;
        req.isVerify = isVerify;        
        next();
    } catch (error) {
        console.log(error);
        return ResponseApi.errorResponse(res, 'Error en el servidor', error);
    }
}
export {
    validationJWT
}