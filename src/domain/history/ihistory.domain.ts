import { List } from "..";
import { History, HistoryFilter, HistorySimpleDTO } from "./history";
export interface IHistory {
    createHistory: ( history: History, idUserCreate: number ) => Promise<Boolean>;  
    getHistory: ( q: HistoryFilter )=> Promise<HistorySimpleDTO[]>;
    getCategoryHistory: (  )=> Promise<List[]>;
}