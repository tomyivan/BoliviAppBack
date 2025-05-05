import { President, Mandate, PresidentImage, PresidentFilter, PresidentDTO } from "./president";
export interface IPresident {
    getPresidents: ( q?: PresidentFilter) => Promise<PresidentDTO[]>;
    getPresidentById: ( idPresident: number ) => Promise<PresidentDTO>;
    createPresident: ( president: President, userAdd:number ) => Promise<Boolean>;
    updatePresident: ( president: President, userEdit:number ) => Promise<Boolean>;
    deletePresident: ( idPresident: number, userDel:number ) => Promise<Boolean>;
    getMandates: ( idPresident: number ) => Promise<Mandate[]>;

    getPresidentImagesByIdPresident: ( idPresident: number ) => Promise<PresidentImage[]>;
    createPresidentImage: ( presidentImage: PresidentImage, userAdd:number ) => Promise<Boolean>;
    isFacePageImage: ( idFile: number, idPresident:number ) => Promise<Boolean>;
    deletePresidentImage: ( idFile: number, userDel: number ) => Promise<Boolean>;
}