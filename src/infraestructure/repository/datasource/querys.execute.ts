import { PrismaClient } from "@prisma/client";

export class Execute {
    static async getData(query: string, transaction?: any): Promise<any[]> {
        try {
            const prisma = transaction ?? new PrismaClient();            
            return await prisma.$queryRawUnsafe(query);            
        } catch (error) {
            console.error(`Error executing query: ${query}`, error);
            return [];
        }
    }
  
}