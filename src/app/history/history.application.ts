import { IHistory, History, HistorySimpleDTO, HistoryFilter, List } from "../../domain";
export class HistoryApplication {
    constructor( private readonly _history: IHistory ) {}
    getCategoryHistory( ): Promise<List[]> {
        return  this._history.getCategoryHistory( );
    }
    getHistory( q: HistoryFilter ): Promise<HistorySimpleDTO[]> {
        return  this._history.getHistory( q );
    }
    async createHistory( history: History, idUserCreate: number ): Promise<Boolean> {
        return await this._history.createHistory( history, idUserCreate );
    }
}