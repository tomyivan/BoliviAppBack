import { IAResponseQuery, UserPetition, IAResponseModel } from "./modelIA";
export interface IModelIA {
    generateSql: ( promp: UserPetition, schema: string ) => Promise<IAResponseQuery>;
    generateText: ( promp: UserPetition, data:string ) => Promise<IAResponseModel[]>;
    getDataDB: ( query: IAResponseQuery ) => Promise<any[]>;
    getImg: ( data: any ) => Promise<any[]>;
}