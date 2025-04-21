import { EventDTO, Events, List } from "..";

export interface IEvent {
    getEvents: () => Promise<EventDTO[]>;
    getEventById: ( idEvent: number ) => Promise<EventDTO>;
    getCategoryEvents: (  ) => Promise<List[]>;
    createEvent: ( event: Events, idUserCreate:number ) => Promise<Boolean>;
    updateEvent: ( event: Events, idUserUpdate:number ) => Promise<Boolean>;
    deleteEvent: ( idEvent: number ) => Promise<Boolean>;
}