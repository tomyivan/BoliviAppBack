export class DependencesQuery {
    static getDepartments = `SELECT cod_departamento id, departamento name, lat, lng FROM departamentos ORDER BY cod_departamento ASC`;
    static getMeasures = `SELECT id_medida id, medida name FROM medidas ORDER BY id_medida ASC`;
}