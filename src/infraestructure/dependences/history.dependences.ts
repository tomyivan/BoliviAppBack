import { HistoryRepository } from "../repository";
import { HistoryApplication } from "../../app";
import { PrismaClient } from "@prisma/client";
import { HistoryController } from "../http-api";
const prisma = new PrismaClient();
const historyRep = new HistoryRepository( prisma );
const historyApp = new HistoryApplication( historyRep );
const historyClt = new HistoryController( historyApp );

export  {
    historyApp,
    historyClt
};