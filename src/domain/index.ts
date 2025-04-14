export interface List {
    value: string | number,
    label: string,
}

export interface List2 {
    id: string | number,
    name: string,
}

export { Auth, User, AuthQuery, UserDTO, GoogleDTO, CodeVerify } from "./auth/auth";
export { IAuth } from "./auth/iauth.domain";
export { CountryDTO, StateDTO } from "./city/city";
export { ICity } from "./city/icity.domain";
export { IDependences } from "./dependences/idependences.domain";
export { Locations, LocationsDTO, LocationsFilters } from "./location/location";
export { ILocation } from "./location/ilocation.domain";
export { HistoryUser, HistoryUserFilters, HistoryUserDTO } from "./historyUser/historyUser";
export { IHistoryUser } from "./historyUser/ihistoryUser.domain";
export { EventDTO, Events, FileEvent, LocationsEvent, ResourceEvent, SponsorEvent } from "./events/eventos";
export { IEvent } from "./events/ieventos.domain";
export { Sponsor } from "./sponsor/sponsor";
export { Resource, ResourceDTO } from "./resource/resource";
