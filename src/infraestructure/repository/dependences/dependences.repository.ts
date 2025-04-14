import { IDependences, List2 } from "../../../domain";

import { DependencesQuery } from "../query/dependences.query";
import { Execute } from "../datasource/querys.execute";

export class DependencesRepository implements IDependences {
    getDepartments(): Promise<List2[]> {
        return Execute.getData(DependencesQuery.getDepartments);
    }

    getMeasures(): Promise<List2[]> {
        return Execute.getData(DependencesQuery.getMeasures);
    }
}
