import { HistoryUserFilters } from "../../../domain";
export class HistoryUserQuery {
    static getHistoryUser = (q?: HistoryUserFilters) => {
        let query = `SELECT id_historial idHistoryUSer, id_usuario idUser, id_metodo idMethod, accion action, descripcion description, table_nom tableName, fecha_creacion createdAt FROM historial_usuario WHERE 1=1`;
        if( !q) return query + ` ORDER BY id_historial DESC`;
        if (q.idUser) {
            query += ` AND id_usuario = ${q.idUser}`;
        }
        if (q.idMethod) {
            query += ` AND id_metodo = ${q.idMethod}`;
        }
        if (q.action) {
            query += ` AND accion = '${q.action}'`;
        }
        if (q.tableName) {
            query += ` AND table_nom = '${q.tableName}'`;
        }
        if (q.createdAt) {
            query += ` AND fecha_creacion = '${q.createdAt.toISOString()}'`;
        }
        query += ` ORDER BY id_historial DESC`;
        return query;
    }

}