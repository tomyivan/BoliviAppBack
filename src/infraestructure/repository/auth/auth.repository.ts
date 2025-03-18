import { IAuth, UserDTO } from "../../../domain";
import { sql, connectToDatabase } from "../datasource/connection";
import { Auth, User } from "../../../domain";
import { AuthQuerys } from "../query/auth.query";
export class AuthRepository implements IAuth {
    async refreshToken(auth: Auth): Promise<Auth> {
        throw new Error("Method not implemented.");
    }
    async login(auth: Auth): Promise<UserDTO> {
        try {        
            const pool = await connectToDatabase();
            const result = await pool.request()
                .query(AuthQuerys.getUser({...auth, issuer: 'local'}));
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }
    
    async getByEmail(email: string, issuer?: string): Promise<UserDTO> {
        try {
            const pool = await connectToDatabase();
            const result = await pool.request()
                .query(AuthQuerys.getUser({ email, issuer }));
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    async loginWithGoogle(auth: User): Promise<UserDTO> {
        try {
            const pool = await connectToDatabase();
            const result = await pool.request()
                .query(AuthQuerys.getUser({
                    email: auth.email,
                    issuer: 'google'}));
            const data = result.recordset[0];
            if (!data) {
                this.addUser(auth);
                return this.loginWithGoogle({...auth, verify: 1});
            }
            return data;
        } catch (error) {
            throw error;
        }
    }

    
    async addUser(user: User): Promise<boolean> {
        try {
            const pool = await connectToDatabase();
            const result = await pool.request()
                    .input('email', sql.VarChar, user.email)
                    .input('name', sql.VarChar, user.name)
                    .input('token', sql.VarChar, user.token)
                    .input('lastname', sql.VarChar, user.lastname)
                    .input('nickname', sql.VarChar, user.nickname)
                    .input('phoneNumber', sql.Int, user.phoneNumber)
                    .input('codPhone', sql.Int, 591)
                    .input('pass', sql.VarChar, user.pass)
                    .input('gender', sql.Int, user.gender)
                    .input('isVerify', sql.Int, user.verify ? 1 : 0)
                    .input('issuer', sql.VarChar, user.issuer ?? 'local')
                .query(AuthQuerys.register());
            
            return result.rowsAffected.length > 0;
        } catch (error) {
            throw error;
        }
    }
}   