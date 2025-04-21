export class ResourceQuery {
    static getResource ( id?: number) {
        let q = `SELECT id_recurso id, nombre name, cantidad stock FROM recursos`;
        if (id) {
            q += ` WHERE id_recurso = ${id}`;
        }
        return q;
    }
}