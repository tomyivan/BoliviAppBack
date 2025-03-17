import jwt from 'jsonwebtoken';
import 'dotenv/config';

interface Payload {
    email?: string,
    name: string,
    nickname: string,
    gender: number,
    phoneNumber: number,
    codPhone: number,     
    city?: number,
    rol: number,
    isVerify: number, 
}

export const generateJWT = ( payload:Payload ): Promise<string> => {
    return new Promise(( resolve, reject ) => {
        jwt.sign(
            payload,
            process.env.SECRET_JWT_SEED as string,
            {
                expiresIn: '5h',
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el token');
                }
                resolve(token as string);
            }
        );
    });
};
