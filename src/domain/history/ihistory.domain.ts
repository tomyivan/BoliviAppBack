import { History } from "./history";
export interface IHistory {
    createHistory: ( history: History, idUserCreate: number ) => Promise<Boolean>;  
}