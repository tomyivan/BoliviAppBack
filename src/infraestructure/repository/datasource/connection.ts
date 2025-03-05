import { databaseConfig } from "./database.config";
import sql from 'mssql';


let pool: sql.ConnectionPool | null = null;
const connectToDatabase = async (): Promise<sql.ConnectionPool> => {
    if (pool && pool.connected) {
        return pool;
    }
    try {
        pool = await sql.connect(databaseConfig);
        console.log('Database connected successfully');
        return pool;
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;        
    }
};

export {
    sql,
    connectToDatabase
}