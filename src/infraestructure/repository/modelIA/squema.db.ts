export class  SchemaQuery  {
    static schema = `
        -TABLA DE INFORMACION DE LOS PRESIDENTES SELECT pr.id_presidente idPresident, pr.biografia biography, pr.nombre name, pr.apellido lastname, fecha_nacimiento dateBirthday, fecha_muerte dateDeath, eventos_importantes importantEvents,
            pp.id_partido_politico idPoliticalParty, pp.nombre politicalParty
            FROM presidentes pr
            INNER JOIN partido_politico pp ON pp.id_partido_politico = pr.id_partido_politico
            WHERE pr.activo = 1
        -TABLA DE INFORMACION DE LA HISTORIA DE BOLIVIA SELECT id_historia idHistory,titulo title, resumen summary, fecha_ini dateStart, fecha_fin dateEnd, ca.nombre category from historias 
    INNER JOIN categorias ca ON ca.id_categoria = historias.id_categoria WHERE historias.activo = 1`;
    static president= `SELECT pr.id_presidente idPresident, pr.biografia biography, pr.nombre name, pr.apellido lastname, fecha_nacimiento dateBirthday, fecha_muerte dateDeath, eventos_importantes importantEvents,
            pp.id_partido_politico idPoliticalParty, pp.nombre politicalParty
            FROM presidentes pr
            INNER JOIN partido_politico pp ON pp.id_partido_politico = pr.id_partido_politico
            WHERE pr.activo = 1`;
    static history= `SELECT id_historia idHistory,titulo title, resumen summary, fecha_ini dateStart, fecha_fin dateEnd, ca.nombre category from historias 
    INNER JOIN categorias ca ON ca.id_categoria = historias.id_categoria WHERE historias.activo = 1`;
}