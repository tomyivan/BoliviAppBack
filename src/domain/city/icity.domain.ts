import { CountryDTO, StateDTO } from "./city";

export interface ICity {
    getCountries: () => Promise<CountryDTO[]>;
    getStates: ( iso2: string ) => Promise<StateDTO[]>;
}