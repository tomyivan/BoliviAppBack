export interface List {
    id: string | number,
    name: string,
}



export { Auth, User, AuthQuery, UserDTO, GoogleDTO, CodeVerify } from "./auth/auth";
export { IAuth } from "./auth/iauth.domain";
export { CountryDTO, StateDTO } from "./city/city";
export { ICity } from "./city/icity.domain";
export { Departaments } from "./dependences/dependences";
export { IDependences } from "./dependences/idependences.domain";
export { Locations, LocationsDTO, LocationsFilters, LocationDet } from "./location/location";
export { ILocation } from "./location/ilocation.domain";
export { HistoryUser, HistoryUserFilters, HistoryUserDTO } from "./historyUser/historyUser";
export { IHistoryUser } from "./historyUser/ihistoryUser.domain";
export { EventDTO, Events, FileEvent, LocationsEvent, ResourceEvent, EventSimpleDTO, SponsorEvent, EventFilters, EventInfo } from "./events/events";
export { IEvent } from "./events/ievents.domain";
export { Sponsor } from "./sponsor/sponsor";
export { Resource, ResourceDTO } from "./resource/resource";
export { ISponsorDomain } from "./sponsor/isponsor.domain";
export { IResourceDomain } from "./resource/iresource.domain";
export { President, PresidentImage, Mandate, PresidentFilter, PresidentDTO } from "./president/president";
export { IPresident } from "./president/ipresident.domain";
export { IPoliticalParty } from "./politicalParty/ipoliticalParty.domain";
export { PoliticalParty } from "./politicalParty/politicalParty";
export { History, HistorySimpleDTO, HistoryFilter } from "./history/history";
export { IHistory } from "./history/ihistory.domain";
export { Promp, ResponseIA, UserPetition, IAResponseQuery, IAResponseModel } from "./modelIA/modelIA";
export { IModelIA } from "./modelIA/imodelIA.domain";
export { CharacterFilter, CharacterDTO } from "./character/character";
export { ICharacter } from "./character/icharacter.domain";