export interface AuthQuery{
    email? : string;
    nickname? : string;
    city? : number;
    issuer? : string;   
}
export interface Auth {
    email: string,
    name: string,
    nickname: string,
    gender: number,
    phoneNumber: number,
    codPhone: number,     
    city?: number,
    rol: number,
    isVerify: number,
    pass : string,
}

export interface UserDTO {
    idUser: number;
    name: string;
    token: string;
    lastname: string;
    nickname: string;
    email: string;
    phoneNumber: number;
    codPhone: number;
    pass: string;
    gender: 1 | 2;	
    city: number;
    issuer: string; 
    rol: number;
    isVerify: number;   
}

export interface User {
    name: string;
    token?: string;
    lastname: string;
    nickname: string;
    email: string;
    phoneNumber: number;
    pass: string;
    gender: 1 | 2;	
    city: string;
    issuer: string; 
}

export interface GoogleDTO {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
}