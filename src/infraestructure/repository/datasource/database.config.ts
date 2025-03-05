import 'dotenv/config';
import sql from 'mssql';
export const databaseConfig:sql.config = {
    server: process.env.HOSTBDRH || 'locahost',
    user: process.env.DBRHUSER || 'sa',
    password: process.env.DBRHPASS || '123456',
    database: process.env.DBRHNAME || 'db',
    options: {
        encrypt: true, 
        enableArithAbort: true,
        trustServerCertificate: true,
        dateFormat: 'dmy',
        useUTC: true
    }
}