
export {}
declare global {
    namespace Express {
        export interface Request {
            email?: string,
            name?: string,
            nickname?: string,
            gender?: number,
            phoneNumber?: number,
            codPhone?: number,     
            city?: number,
            rol?: number,
            isVerify?: number,
        }
    }
}