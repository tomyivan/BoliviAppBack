import { ResourceDTO } from "..";
export interface IResource {
    getResources: () => Promise<ResourceDTO[]>;
    getResourceById: ( idResource: number ) => Promise<ResourceDTO>;
    createResource: ( resource: ResourceDTO ) => Promise<Boolean>;
    updateResource: ( resource: ResourceDTO ) => Promise<Boolean>;
    deleteResource: ( idResource: number ) => Promise<Boolean>;
}