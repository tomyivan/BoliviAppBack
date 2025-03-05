export {}
declare global {
    namespace Express {
        export interface Request {
            nickname?: string;
            rol?: number;
            email?: number;
            city?: number;
            name?: string;
        }
    }
}