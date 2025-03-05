export class Auth {
    constructor(
        public email?: number,
        public name?: string,
        public nickname?: string,     
        public city?: number,
        public pass?: string,
        public rol?: number
    ){}
}

export interface User {
    name: string;
    lastName: string;
    nickname: string;
    email: string;
    phoneNumber: string;
    pass: string;
    confirmPass: string;
    gender: 1 | 2;	
    city: string;
}