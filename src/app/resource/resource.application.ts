import { IResourceDomain } from "../../domain";
export class ResourceApplication {
    constructor( private readonly _resourceDomain: IResourceDomain ) {}
    async getResource(id?: number): Promise<any[]> {
        return this._resourceDomain.getResource(id);
    }
    async createResource(resource: any): Promise<Boolean> {
        return this._resourceDomain.createResource(resource);
    }
    async updateResource(resource: any): Promise<Boolean> {
        return this._resourceDomain.updateResource(resource);
    }
    async deleteResource(idResource: number): Promise<Boolean> {
        return this._resourceDomain.deleteResource(idResource);
    }
}