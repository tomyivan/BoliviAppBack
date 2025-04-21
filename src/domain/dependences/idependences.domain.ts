import { Departaments, List } from "..";

export interface IDependences {
    getDepartments: () => Promise<Departaments[]>;
    getMeasures: () => Promise<List[]>;
}