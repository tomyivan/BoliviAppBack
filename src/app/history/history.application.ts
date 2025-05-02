import { IHistory, History } from "../../domain";
export class HistoryApplication {
    constructor( private readonly _history: IHistory ) {}
    async createHistory( history: History, idUserCreate: number ): Promise<Boolean> {
        return await this._history.createHistory( history, idUserCreate );
    }
}