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
    static async getSingleData<T>(query: string, defaultData: T, transaction?: any): Promise<T> {
        try {
            const prisma = transaction ?? new PrismaClient();            
            const result = await prisma.$queryRawUnsafe(query);            
            return result[0] || defaultData; // Return the first record or defaultData if none found
        } catch (error) {
            console.error(`Error executing query: ${query}`, error);
            return defaultData;
        }
    }
}