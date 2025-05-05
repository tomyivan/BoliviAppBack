import { PresidentFilter } from "../../../domain"
export class PresidentQuery {
    static getPresident(q?: PresidentFilter) {        
        let query = `SELECT pr.id_presidente idPresident, pr.biografia biography, pr.nombre name, pr.apellido lastname, fecha_nacimiento dateBirthday, fecha_muerte dateDeath, eventos_importantes importantEvents,
            pp.id_partido_politico idPoliticalParty, pp.nombre politicalParty
            FROM presidentes pr
            INNER JOIN partido_politico pp ON pp.id_partido_politico = pr.id_partido_politico
            WHERE pr.activo = 1`
        if(q?.type === 'simplify') {
            query = `SELECT pr.id_presidente idPresident, pr.nombre name, pr.apellido lastname,
            pp.id_partido_politico idPoliticalParty, pp.nombre politicalParty, ap.nombre picture
            FROM presidentes pr
            INNER JOIN partido_politico pp ON pp.id_partido_politico = pr.id_partido_politico
			LEFT JOIN archivos_presidente ap ON ap.id_presidente = pr.id_presidente and ap.es_portada = 1
            WHERE pr.activo = 1`
        }
        if (q?.idPresident) {
            query += ` AND pr.id_presidente = ${q.idPresident}`
        }
        if (q?.idPoliticalParty) {
            query += ` AND pp.id_partido_politico = ${q.idPoliticalParty}`
        }
        // return query + ` ORDER BY pr.e`;
        return query;
    }
    static getMandates(idPresident: number) {
        return `SELECT id_mandato idMandate, nro_mandato nroMandate, fecha_ini startDate, fecha_fin endDate, observacion observation FROM mandatos_presidente WHERE id_presidente = ${idPresident} ORDER BY fecha_ini DESC`;
    }
    static getImages(idPresident: number, isFrontPage?: boolean) {
        if (isFrontPage) {
            return `SELECT id_archivo idFile, nombre name, es_portada isFrontPage FROM archivos_presidente WHERE id_presidente = ${idPresident} and es_portada = 1`;
        }
        return `SELECT id_archivo idFile, nombre name, es_portada isFrontPage FROM archivos_presidente WHERE id_presidente = ${idPresident}`;
    }
}