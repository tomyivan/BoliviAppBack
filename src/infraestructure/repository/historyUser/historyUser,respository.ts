import { PrismaClient } from "@prisma/client";
import { HistoryUser, HistoryUserFilters, IHistoryUser } from "../../../domain";
import { Execute } from "../datasource/querys.execute";
import { HistoryUserQuery } from "../query/historyUser.query";
export class HistoryUserRepository implements IHistoryUser {
        constructor ( private readonly prisma: PrismaClient ) {}
        async getHistoryUser(query?: HistoryUserFilters): Promise<HistoryUser[]> {
            const queryString = HistoryUserQuery.getHistoryUser(query);
            return Execute.getData(queryString);            
        }
        async createHistoryUser(historyUser: HistoryUser): Promise<Boolean> {
            try {
                const response = await this.prisma.historial_usuario.create({
                    data: {
                        id_metodo : historyUser.idMethod,
                        id_usuario : historyUser.idUser,
                        accion : historyUser.action,
                        descripcion : historyUser.description,
                        table_nom : historyUser.tableName,
                        fecha_creacion : historyUser.createdAt,                        
                    }
                });
                return response.id_historial ? true : false;
            } catch (error) {
                console.error(`Error creating history user: ${error}`);
                return false;
            }
        }
}