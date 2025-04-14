import { Auth, CodeVerify, User, UserDTO } from "./auth";

export interface IAuth {
    refreshToken: ( auth: Auth ) => Promise<Auth>;
    login: ( auth: Auth ) => Promise<UserDTO>;
    loginWithGoogle: ( auth: User ) => Promise<UserDTO>;
    // loginWithFacebook: ( auth: Auth ) => Promise<Boolean>;
    addUser: ( user: User ) => Promise<Boolean>;   
    getByEmail: ( email: string, issuer?: string ) => Promise<UserDTO>;
    createCode: ( data: CodeVerify  ) => Promise<Boolean>;   
    updateCode: ( data: CodeVerify ) => Promise<Boolean>;
    verifyCode: ( data: CodeVerify ) => Promise<Boolean>;
    getCode: ( data: CodeVerify ) => Promise<Boolean>;
    updatePass: ( data: Auth ) => Promise<Boolean>;
}