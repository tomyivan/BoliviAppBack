
export {}
declare global {
    namespace Express {
        export interface Request {
            idUser?: number,
            email?: string,
            name?: string,
            nickname?: string,
            gender?: number,
            phoneNumber?: number,
            codPhone?: number,     
            rol?: number,
            isVerify?: number,
        }
    }
}