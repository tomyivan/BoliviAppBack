import { EventFilters, Events, EventSimpleDTO, IEvent, List } from "../../domain";

 export class EventsApplication {
    constructor( private readonly _events: IEvent ) {}
    getSimpleEvents( q?: EventFilters ): Promise<EventSimpleDTO[]> {
        return this._events.getSimpleEvents( q );
    }
    getCategoryEvents(): Promise<List[]> {
        return this._events.getCategoryEvents();
    }
    createEvent( data: Events, idUserCreate: number ): Promise<Boolean> {        
        return this._events.createEvent( data, idUserCreate );
    }
}