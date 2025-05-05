import { IModelIA, UserPetition } from "../../domain";
import fs from "fs";
import path from "path";
export class ModelIAApplication {
    constructor( private readonly _modelIA: IModelIA ) {}
    getSchemaDB(): string {
        const schemaPath = path.join(__dirname, "../../../","prisma","schema.prisma"); 
        const schema = fs.readFileSync(schemaPath, "utf-8");
        const lines = schema.split("\n")
        const newSchema = lines.slice(9).join("\n");
        return newSchema;
    }
    async generateText( promp: UserPetition ): Promise<any> {
        const schema = this.getSchemaDB();
        const responseQuery = await this._modelIA.generateSql( promp, schema );   
        if( responseQuery.error ) return responseQuery.error;       
        let responseDB = await this._modelIA.getDataDB( responseQuery );        
        const data = JSON.stringify(responseDB);
        const response = await this._modelIA.generateText( promp, data );
        let newData= response;
        for( let i = 0; i < response.length; i++ ){
            for( const item of responseDB ){
                if( Number(response[i].id) === item.id_presidente || Number(response[i].id) === item.id_historia ){             
                    const dataImg = await this._modelIA.getImg( item );
                    newData[i] = { ...response[i], img:dataImg }; 
                    break;
                }
            }
        }
        return newData;
    }
}
