export interface HistoryUser{
    idHistoryUser?: number;
    idUser: number;
    idMethod: number;
    action: 'add' | 'update' | 'delete' ;
    description: string;
    tableName: string;
    createdAt?: Date;
}

export interface HistoryUserFilters {
    idUser?: number;
    idMethod?: number;
    action?: 'add' | 'update' | 'delete';
    tableName?: string;
    createdAt?: Date;
}

export interface HistoryUserDTO {
    idHistoryUser?: number;
    idUser: number;
    idMethod: number;
    action: 'add' | 'update' | 'delete' ;
    description: string;
    tableName: string;
    createdAt?: Date;
}