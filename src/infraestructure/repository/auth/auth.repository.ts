import { CodeVerify,  IAuth, UserDTO } from "../../../domain";
import { Auth, User } from "../../../domain";
import { AuthQuerys } from "../query/auth.query";
import { PrismaClient } from "@prisma/client";
import { Execute } from "../datasource/querys.execute";
export class AuthRepository implements IAuth {
    constructor( private readonly _prisma: PrismaClient ) {}
    async refreshToken(auth: Auth): Promise<Auth> {
        throw new Error("Method not implemented.");
    }
    async login(auth: Auth): Promise<UserDTO> {
        return Execute.getSingleData(AuthQuerys.getUser({...auth, issuer: 'local'}), {} as UserDTO, this._prisma);
    }
    
    async getByEmail(email: string, issuer?: string): Promise<UserDTO> {
        return Execute.getSingleData(AuthQuerys.getUser({ email, issuer }), {} as UserDTO, this._prisma);
    }

    async loginWithGoogle(auth: User): Promise<UserDTO> {
        try {
            const response = await Execute.getSingleData(AuthQuerys.getUser({ email: auth.email, issuer: 'google' }), {} as UserDTO, this._prisma);
            if (!response?.idUser) {
                this.addUser(auth);
                return this.loginWithGoogle({ ...auth, verify: 1 });
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    
    async addUser(user: User): Promise<boolean> {
        try {
            return await this._prisma.$transaction(async (pr) => {
                const auth = await pr.usuarios.create({
                    data: {
                        alias: user.nickname,
                        correo: user.email,
                        pass: user.pass,
                        editor: user.issuer ?? 'local',
                        verificado: user.verify ? 1 : 0,
                    }
                });
                await pr.usuario_det.create({
                    data: {
                        id_usuario: auth.id_usuario,
                        nombre: user.name,
                        apellidos: user.lastname,
                        num_cel: Number(user.phoneNumber),
                        cod_celular: 591,
                        genero: user.gender,
                        id_rol: 5,
                        pais: user.city,
                        ciudad: user.state,
                    }
                })
                return Boolean(auth);
            });
        } catch (error) {
            throw error;
        }
    }

    async createCode(code: CodeVerify): Promise<Boolean> {
        try {
            await this._prisma.codigos_ver.create({
                data:{
                    codigo: String(code.code),
                    correo: code.email,
                }
            })
            return true;  
        } catch (error) {
            throw error;            
        }
    }
    
    async updateCode( data: CodeVerify ): Promise<Boolean> {
        try {
            await this._prisma.codigos_ver.updateMany({
                where: { correo: data.email },
                data: { codigo: String(data.code) },
            });
            return true;
        } catch (error) {
            throw error;
        }
    }

    async verifyCode(data: CodeVerify): Promise<Boolean> {
        try {
            await this._prisma.codigos_ver.deleteMany({
                where: { correo: data.email, codigo: String(data.code) },
            });
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getCode(data: CodeVerify): Promise<Boolean> {
        const code = await Execute.getSingleData(AuthQuerys.getCode(String(data.code), data.email), {} as CodeVerify, this._prisma);
        return String(code?.code) === String(data.code);
    }

    async updatePass(data: Auth) : Promise<Boolean> {
        try {
            await this._prisma.usuarios.updateMany({
                where: { correo: String(data.email) },
                data: { pass: data.pass },
            });
            return true;
        } catch (error) {
            throw error;
        }
    }
}   