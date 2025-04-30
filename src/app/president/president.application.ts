import { IPresident, President, PresidentFilter, PresidentImage, Mandate, PresidentDTO } from "../../domain";
export class PresidentApplication {
    constructor( private readonly _president: IPresident ) { }
    getPresidents( q?: PresidentFilter ): Promise<PresidentDTO[]> {
        return this._president.getPresidents( q )
    }
    async getPresidentById( idPresident: number ): Promise<PresidentDTO> {
        const president = await this._president.getPresidentById( idPresident )
        const mandates = await this._president.getMandates( idPresident )
        return {
            ...president,
            mandates
        }
    }
    createPresident( president: President ): Promise<Boolean> {
        return this._president.createPresident( president )
    }
    updatePresident( president: President ): Promise<Boolean> {
        return this._president.updatePresident( president )
    }
    deletePresident( idPresident: number ): Promise<Boolean> {
        return this._president.deletePresident( idPresident )
    }

    getPresidentImagesByIdPresident( idPresident: number ): Promise<PresidentImage[]> {
        return this._president.getPresidentImagesByIdPresident( idPresident )
    }
    createPresidentImage( file: Express.Multer.File, idPresident: number, userAdd:number  ): Promise<Boolean> {
        const presidentImage: PresidentImage = {
            idPresident: idPresident,
            name: file.filename,
            isFrontPage: false
        }
        return this._president.createPresidentImage( presidentImage )
    }
    isFacePageImage( idFile: number, idPresident:number ): Promise<Boolean> {
        return this._president.isFacePageImage( idFile, idPresident )
    }
    deletePresidentImage( idFile: number ): Promise<Boolean> {
        return this._president.deletePresidentImage( idFile )
    }

}