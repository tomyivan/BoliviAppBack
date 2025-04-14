import { PrismaClient } from "@prisma/client";
import { ILocation, LocationsFilters, Locations, LocationsDTO } from "../../../domain";
import { Execute } from "../datasource/querys.execute";
import { LocationQuery } from "../query/locations.query";
export class LocationsRepository implements ILocation {
    constructor( private readonly prisma: PrismaClient ) {}
    async getLocations(query?: LocationsFilters ): Promise<LocationsDTO[]> {
        return Execute.getData(LocationQuery.getLocations(query))
    }
    async createLocation(location: Locations): Promise<Boolean> {
        try {
            const response = await this.prisma.lugares.create({
                data: {
                    cod_departamento: location.codDepartment,
                    nombre: location.name,
                    latitud: location.latitude,
                    longitud: location.longitude,                    
                }
            });
            return response.id_lugar ? true : false;
        } catch (error) {
            console.error(`Error creating location: ${error}`);
            return false;
        }
    }
    async updateLocation(location: any): Promise<Boolean> {
        try {
            const response = await this.prisma.lugares.update({
                where: { id_lugar: location.idLocation },
                data: {
                    cod_departamento: location.codDepartment,
                    nombre: location.name,
                    latitud: location.latitude,
                    longitud: location.longitude,                    
                }
            });
            return response.id_lugar ? true : false;
        } catch (error) {
            console.error(`Error updating location: ${error}`);
            return false;
        }
    }
    async deleteLocation(idLocation: number): Promise<Boolean> {
        try {
            const response = await this.prisma.lugares.delete({
                where: { id_lugar: idLocation }
            });
            return response.id_lugar ? true : false;
        } catch (error) {
            console.error(`Error deleting location: ${error}`);
            return false;
        }
    }

}