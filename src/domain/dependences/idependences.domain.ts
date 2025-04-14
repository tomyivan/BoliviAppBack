import { List2 } from "..";

export interface IDependences {
    getDepartments: () => Promise<List2[]>;
    getMeasures: () => Promise<List2[]>;
}