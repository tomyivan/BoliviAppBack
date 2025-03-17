import { IAuth, Auth, User, GoogleDTO } from "../../domain";
import bcrypt from 'bcryptjs';
import { generateJWT } from "../../helper/jwt";
export class AuthApplication {
    constructor(private auth: IAuth){}
    
    refreshToken(auth: Auth):Promise<Auth>{
        return this.auth.refreshToken(auth);
    }
    
    async login(auth: Auth): Promise<any> {
        if (!auth?.nickname && !auth?.email) return false;
        const response = await this.auth.login(auth);
        if (!response) return false;
        
        const isPasswordValid = bcrypt.compareSync(auth.pass ?? "", response.pass);
        if (!isPasswordValid) return false;

        const payload = {
            email: response.email,
            name: response.name,
            nickname: response.nickname,
            gender: response.gender,
            phoneNumber: response.phoneNumber,
            codPhone: response.codPhone,
            city: response.city,
            rol: response.rol,
            isVerify: response.isVerify,
        };

        const token = await generateJWT(payload);
        return {
            token,
            ...payload,
        };
    }
    
    async loginWithGoogle(data: GoogleDTO):Promise<any>{
        const auth:User = {
            email: data.email,
            name: data.given_name,
            nickname: data?.email?.split('@')[0],
            phoneNumber: 0,
            pass:  this.generatePass(data.sub),
            city: "",
            gender: 1,
            lastname: data.family_name,
            issuer: "google",
        }
        const response = await this.auth.loginWithGoogle(auth);
        if (!response) return false;        
        const isPasswordValid = bcrypt.compareSync(data.sub ?? "", response.pass);
        if (!isPasswordValid) return false;
        const payload = {
            email: response.email,
            name: response.name,
            nickname: response.nickname,
            gender: response.gender,
            phoneNumber: response.phoneNumber,
            codPhone: response.codPhone,
            city: response.city,
            rol: response.rol,
            isVerify: response.isVerify,
        };
        const token = await generateJWT(payload);
        return {
            token,
            ...payload,
        };            
    }
    
    async addUser(user: User):Promise<Boolean>{
        const pass = this.generatePass(user.pass);
        return await this.auth.addUser({...user, pass});
    }
    
    generatePass( pass:string ): string {      
        const salt = bcrypt.genSaltSync(5);
        return bcrypt.hashSync(pass, salt);
    }

}