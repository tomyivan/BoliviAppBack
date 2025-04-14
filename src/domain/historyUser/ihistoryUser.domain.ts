import { HistoryUser, HistoryUserDTO } from "./historyUser";
export interface IHistoryUser {
    getHistoryUser: ( ) => Promise<HistoryUserDTO[]>;
    // getHistoryUserById: (idHistoryUser: number) => Promise<HistoryUserDTO>;
    createHistoryUser: (historyUser: HistoryUser) => Promise<Boolean>;
}