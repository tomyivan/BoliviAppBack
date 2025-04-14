import { LocationsFilters } from "../../../domain";

export class LocationQuery {
    static getLocations( q? : LocationsFilters) {
        let query = `SELECT id_lugar idLocation, cod_departamento codDepartment, nombre name, latitud latitude, longitud longitude FROM lugares WHERE 1=1`;
        if( !q) return query + ` ORDER BY id_lugar DESC`;
        if (q.codDepartment) {
            query += ` AND cod_departamento = '${q.codDepartment}'`;
        }
        if (q.name) {
            query += ` AND nombre = '${q.name}'`;
        }
        return query + ` ORDER BY id_lugar DESC`;
    }

}