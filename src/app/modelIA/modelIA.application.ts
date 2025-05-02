import { IModelIA, Promp } from "../../domain";
export class ModelIAApplication {
    constructor( private readonly _modelIA: IModelIA ) {}
    async generateText( promp: Promp ): Promise<any> {
        return await this._modelIA.generateText( promp );
    }
}