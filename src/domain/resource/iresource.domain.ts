import { ResourceDTO, Resource } from "..";
export interface IResourceDomain {
    getResource: (id?: number) => Promise<ResourceDTO[]>;
    createResource: ( resource: Resource ) => Promise<Boolean>;
    updateResource: ( resource: Resource ) => Promise<Boolean>;
    deleteResource: ( idResource: number ) => Promise<Boolean>;
}