import { EventFilters } from "../../../domain";
export class EventsQuery {
    static getCategoryEvents = `SELECT id_categoria id, nombre name FROM categorias WHERE activo = 1`;
    static getSimpleEvents ( q?: EventFilters ): string {
        let query = `SELECT id_evento idEvent, fecha date, inicio startTime, fin endTime, nombre title FROM eventos WHERE activo = 1`;
        if ( q?.date ) {
            query += `${query} AND fecha = '${q.date}'`;
        }
        if ( q?.startTime ) {
            query += `${query} AND inicio = '${q.startTime}'`;
        }
        if ( q?.endTime ) {
            query + `${query} AND fin = '${q.endTime}'`;
        }
        if ( q?.name ) {
            query += `${query} AND nombre like '%${q.name}%'`;
        }
        if ( q?.detail ) {
            query += `${query} AND detalle like '%${q.detail}%'`;
        }
        if ( q?.idCategory ) {
            query += `${query} AND id_categoria = ${q.idCategory}`;
        }
        if ( q?.from && q?.to ) {
            query += `${query} AND fecha BETWEEN '${q.from}' AND '${q.to}'`;
        }
        return query;
    }
}