import { Departaments, IDependences, List } from "../../domain";
export class DependencesApplication {
    constructor( private dependencesDomain: IDependences ){}
    
    getDepartments () :Promise<Departaments[]> {
        return this.dependencesDomain.getDepartments();    
    }
    getMeasures () :Promise<List[]> {
        return this.dependencesDomain.getMeasures();    
    }
}