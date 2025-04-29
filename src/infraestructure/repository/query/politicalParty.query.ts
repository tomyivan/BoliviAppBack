export class PoliticalPartyQuery {
    static getPoliticalParty(id?:number, isActivo?: 1 | 0) {
        let q = `SELECT id_partido_politico id, nombre name, abrv acronym FROM partido_politico WHERE 1=1`;
        if (id) {
            q += ` AND id_partido_politico = ${id}`;
        }
        if (isActivo) {
            q += ` AND activo = ${isActivo}`;
        }
        return q + ` ORDER BY activo DESC`;
    }
}