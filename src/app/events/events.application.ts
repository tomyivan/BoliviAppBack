import { Events, IEvent } from "../../domain";

 export class EventsApplication {
    constructor( private readonly _events: IEvent ) {}
    createEvent( data: Events, idUserCreate: number ): Promise<Boolean> {        
        return this._events.createEvent( data, idUserCreate );
    }
}