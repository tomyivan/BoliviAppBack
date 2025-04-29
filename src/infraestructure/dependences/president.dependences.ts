import { PresidentApplication } from "../../app";
import { PresidentRepository } from "../repository";
import { PrismaClient } from "@prisma/client";
import { PresidentController } from "../http-api";
const prisma = new PrismaClient();
const presidentRep = new PresidentRepository(prisma);
const presidentApp = new PresidentApplication(presidentRep);
const presidentClt = new PresidentController( presidentApp );
export { presidentClt };