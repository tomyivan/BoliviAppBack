import { EventFilters } from "../../../domain";
export class EventsQuery {
    static getCategoryEvents = `SELECT id_categoria id, nombre name FROM categorias WHERE activo = 1`;
    static getSimpleEvents(q?: EventFilters): string {
        let query = `SELECT id_evento idEvent, fecha date, inicio startTime, fin endTime, nombre title FROM eventos WHERE activo = 1`;
        if (q?.date) {
            query += `${query} AND fecha = '${q.date}'`;
        }
        if (q?.startTime) {
            query += `${query} AND inicio
             = '${q.startTime}'`;
        }
        if (q?.endTime) {
            query + `${query} AND fin = '${q.endTime}'`;
        }
        if (q?.name) {
            query += `${query} AND nombre like '%${q.name}%'`;
        }
        if (q?.detail) {
            query += `${query} AND detalle like '%${q.detail}%'`;
        }
        if (q?.idCategory) {
            query += `${query} AND id_categoria = ${q.idCategory}`;
        }
        if (q?.from && q?.to) {
            query += `${query} AND fecha BETWEEN '${q.from}' AND '${q.to}'`;
        }
        return query;
    }
    static getEventById = (idEvent: number) => `SELECT 
	ev.id_evento idEvent, ev.fecha dateEvent, ev.inicio startTime, ev.fin endTime, ev.nombre name, ev.detalle detail, ca.id_categoria idCategory, ca.nombre category,
	lg.latitud latitude, lg.longitud longitude, lg.nombre locationEvent, dp.departamento departament, lg.cod_departamento codDepartment, lg.id_lugar idLocation
FROM eventos ev
INNER JOIN categorias ca ON ca.id_categoria = ev.id_categoria
INNER JOIN ubicaciones_eventos ue ON ue.id_evento = ev.id_evento
INNER JOIN lugares lg ON lg.id_lugar = ue.id_ubicacion
INNER JOIN departamentos dp ON dp.cod_departamento = lg.cod_departamento
 WHERE ev.id_evento = ${idEvent}`;
    static getImageEvent = (idEvent: number) => `SELECT id_archivo idFile, nombre name, ext, id_evento idEvent FROM archivo_eventos WHERE id_evento = ${idEvent}`;
    static getSponsorsEvent = (idEvent: number) => `
SELECT ep.id_evento_patrocinador idEventSponsor, ep.id_evento idEvent, p.id_patrocinador idSponsor, ep.producto product, ep.servicio service, ep.cantidad stock, ep.observacion observation, ep.id_medida idMeasure FROM patrocinadores p
INNER JOIN eventos_patrocinadores ep ON ep.id_patrocinador = p.id_patrocinador
WHERE ep.id_evento = ${idEvent}`;
    static getResourcesEvent = (idEvent: number) => `SELECT re.id_recurso_evento idResourceEvent, re.id_evento idEvent, re.id_recurso idResource, re.monto amount, re.cantidad stock FROM recursos_eventos re
WHERE re.id_evento = ${idEvent}`;
    static getSponsorNameEvent = (idEvent: number) => `SELECT p.id_patrocinador idSponsor, p.patrocinador name FROM patrocinadores p
INNER JOIN eventos_patrocinadores ep ON ep.id_patrocinador = p.id_patrocinador
WHERE ep.id_evento= ${idEvent}`;
}