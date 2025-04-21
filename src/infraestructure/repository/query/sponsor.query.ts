export class SponsorQuery {
    static getSponsor(id?: number){
        let query = `SELECT id_patrocinador id, patrocinador name FROM patrocinadores`;
        if (id) {
            query += ` WHERE id_patrocinador = ${id}`;
        }
        return query;
    }
}