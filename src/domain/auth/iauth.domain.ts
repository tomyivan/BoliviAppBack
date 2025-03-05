import { Auth, User } from "./auth";

export interface IAuth {
    refreshToken: ( auth: Auth ) => Promise<Auth>;
    login: ( auth: Auth ) => Promise<Boolean>;
    addUser: ( user: User ) => Promise<Boolean>;
}