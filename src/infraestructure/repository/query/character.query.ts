import { CharacterFilter } from "../../../domain";
export class CharacterQuery {
    static getCharacter( q: CharacterFilter ): string {
        let query = '';
        if ( q.type === 'list' ) {
            query = `select id_personaje id, CONCAT(nombres ,' ',apellidos) name from personajes_h where 1=1`;
        } else if ( q.type === 'all' ) {
            query = 'select id_personaje id, nombres name, apellidos lastname, fecha_nacimiento birthDate,detalle detail from personajes_h where 1=1 ';
        } 
        if ( q.birthDate ) query += ` AND fecha_nacimiento = '${q.birthDate}'`;
        return query;
    }
}