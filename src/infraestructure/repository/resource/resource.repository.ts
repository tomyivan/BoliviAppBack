import { PrismaClient } from "@prisma/client";
import { IResourceDomain, Resource, ResourceDTO } from "../../../domain";
import { Execute } from "../datasource/querys.execute";
import { ResourceQuery } from "../query/resource.query";
export class ResourceRepository implements IResourceDomain {
    constructor( private readonly prisma: PrismaClient ) {}
    async getResource(id?:number):Promise<ResourceDTO[]>  {
        return Execute.getData(ResourceQuery.getResource(id))        
    }
    async createResource(resource: Resource):Promise<Boolean> {
        try {
            const response = await this.prisma.recursos.create({
                data: {
                    nombre: resource.name,
                    cantidad: resource.stock,
                }
            });
            return response.id_recurso ? true : false;
        } catch (error) {
            console.error(`Error creating resource: ${error}`);
            return false;
        }
    }
    async updateResource(resource: Resource):Promise<Boolean> {
        try {
            const response = await this.prisma.recursos.update({
                where: { id_recurso: resource.idResource },
                data: {
                    nombre: resource.name,
                    cantidad: resource.stock,
                }
            });
            return response.id_recurso ? true : false;
        } catch (error) {
            console.error(`Error updating resource: ${error}`);
            return false;
        }
    }
    async deleteResource(idResource: number):Promise<Boolean> {
        try {
            const response = await this.prisma.recursos.delete({
                where: { id_recurso: idResource }
            });
            return response.id_recurso ? true : false;
        } catch (error) {
            console.error(`Error deleting resource: ${error}`);
            return false;
        }
    }
}