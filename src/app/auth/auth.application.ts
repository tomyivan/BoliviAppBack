import { IAuth, Auth, User } from "../../domain";
export class AuthApplication {
    constructor(private auth: IAuth){}
    refreshToken(auth: Auth):Promise<Auth>{
        return this.auth.refreshToken(auth);
    }
    login(auth: Auth):Promise<Boolean>{
        return this.auth.login(auth);
    }
    addUser(user: User):Promise<Boolean>{
        return this.auth.addUser(user);
    }
}