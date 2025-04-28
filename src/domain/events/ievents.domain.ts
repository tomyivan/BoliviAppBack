import { EventDTO, Events, List, EventFilters, EventSimpleDTO, FileEvent, SponsorEvent, Sponsor } from "..";


export interface IEvent {
    getSimpleEvents: (q?: EventFilters) => Promise<EventSimpleDTO[]>;
    getEvents: () => Promise<EventDTO[]>;
    getEventById: ( idEvent: number ) => Promise<EventDTO>;
    getCategoryEvents: (  ) => Promise<List[]>;
    createEvent: ( event: Events, idUserCreate:number ) => Promise<Boolean>;
    updateEvent: ( event: Events, idUserUpdate:number ) => Promise<Boolean>;
    deleteEvent: ( idEvent: number ) => Promise<Boolean>;
    uploadImage: ( file: FileEvent, idUser: number ) => Promise<Boolean>;
    getImages: ( idEvent: number ) => Promise<FileEvent[]>;
    dropImage: ( idFile: number ) => Promise<Boolean>;
    getEventSponsors: ( idEvent: number ) => Promise<SponsorEvent[]>;
    getEventResources: ( idEvent: number ) => Promise<any[]>;
    getSponsorsEventSimple: ( idEvent: number ) => Promise<Sponsor[]>;
    // deleteEvents: ( idEvent: number ) => Promise<Boolean>;
}