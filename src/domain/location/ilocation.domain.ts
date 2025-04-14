import { Locations, LocationsDTO } from "./location";
export interface ILocation {
    getLocations: () => Promise<LocationsDTO[]>;
    // getLocationById: ( idLocation: number ) => Promise<Boolean>;
    createLocation: ( location: Locations ) => Promise<Boolean>;
    updateLocation: ( location:Locations ) => Promise<Boolean>;
    deleteLocation: ( idLocation: number ) => Promise<Boolean>;
}