import { Promp } from "./modelIA";
export interface IModelIA {
    generateText: ( promp: Promp ) => Promise<any>;
}