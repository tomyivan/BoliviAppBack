import { HistoryFilter } from "../../../domain";

export class HistoryQuery {
    static getCategoryHistory = `SELECT id_categoria id, nombre name FROM categorias WHERE id_tipo_categoria = 2 and activo = 1`;    
    static getHistorySimple = `SELECT id_historia idHistory,titulo title, resumen summary, fecha_ini dateStart, fecha_fin dateEnd, ca.nombre category from historias 
    INNER JOIN categorias ca ON ca.id_categoria = historias.id_categoria WHERE historias.activo = 1`;
    static getHistory(q:HistoryFilter) {
        let query ='';
        if(q.type === 'simple') query = HistoryQuery.getHistorySimple;
        return query        
    }
}