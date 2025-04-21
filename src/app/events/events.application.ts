import { Events, IEvent, List } from "../../domain";

 export class EventsApplication {
    constructor( private readonly _events: IEvent ) {}
    getCategoryEvents(): Promise<List[]> {
        return this._events.getCategoryEvents();
    }
    createEvent( data: Events, idUserCreate: number ): Promise<Boolean> {        
        return this._events.createEvent( data, idUserCreate );
    }
}