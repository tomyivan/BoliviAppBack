export class EventsQuery {
    static getCategoryEvents = `SELECT id_categoria id, nombre name FROM categorias WHERE activo = 1`;
}