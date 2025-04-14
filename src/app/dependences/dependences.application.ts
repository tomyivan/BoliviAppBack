import { IDependences, List2 } from "../../domain";
export class DependencesApplication {
    constructor( private dependencesDomain: IDependences ){}
    
    getDepartments () :Promise<List2[]> {
        return this.dependencesDomain.getDepartments();    
    }
}