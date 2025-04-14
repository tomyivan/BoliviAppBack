import { EventDTO, Events } from "..";

export interface IEvent {
    getEvents: () => Promise<EventDTO[]>;
    getEventById: ( idEvent: number ) => Promise<EventDTO>;
    createEvent: ( event: Events, idUserCreate:number ) => Promise<Boolean>;
    updateEvent: ( event: Events, idUserUpdate:number ) => Promise<Boolean>;
    deleteEvent: ( idEvent: number ) => Promise<Boolean>;
}