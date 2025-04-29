import { President, Mandate, PresidentImage, PresidentFilter, PresidentDTO } from "./president";
export interface IPresident {
    getPresidents: ( q?: PresidentFilter) => Promise<PresidentDTO[]>;
    getPresidentById: ( idPresident: number ) => Promise<PresidentDTO>;
    createPresident: ( president: President ) => Promise<Boolean>;
    updatePresident: ( president: President ) => Promise<Boolean>;
    deletePresident: ( idPresident: number ) => Promise<Boolean>;
    getMandates: ( idPresident: number ) => Promise<Mandate[]>;

    getPresidentImagesByIdPresident: ( idPresident: number ) => Promise<PresidentImage[]>;
    createPresidentImage: ( presidentImage: PresidentImage ) => Promise<Boolean>;
    isFacePageImage: ( idFile: number ) => Promise<Boolean>;
    deletePresidentImage: ( idFile: number ) => Promise<Boolean>;
}