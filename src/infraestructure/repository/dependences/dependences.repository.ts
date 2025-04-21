import { Departaments, IDependences, List } from "../../../domain";

import { DependencesQuery } from "../query/dependences.query";
import { Execute } from "../datasource/querys.execute";

export class DependencesRepository implements IDependences {
    getDepartments(): Promise<Departaments[]> {
        return Execute.getData(DependencesQuery.getDepartments);
    }

    getMeasures(): Promise<List[]> {
        return Execute.getData(DependencesQuery.getMeasures);
    }
}
