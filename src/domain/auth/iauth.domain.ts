import { Auth, User, UserDTO } from "./auth";

export interface IAuth {
    refreshToken: ( auth: Auth ) => Promise<Auth>;
    login: ( auth: Auth ) => Promise<UserDTO>;
    loginWithGoogle: ( auth: User ) => Promise<UserDTO>;
    // loginWithFacebook: ( auth: Auth ) => Promise<Boolean>;
    addUser: ( user: User ) => Promise<Boolean>;   
    getByEmail: ( email: string, issuer?: string ) => Promise<UserDTO>; 
}