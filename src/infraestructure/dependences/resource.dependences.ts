import { ResourceApplication } from "../../app";
import { ResourceRepository } from "../repository";
import { ResourceController } from "../http-api";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const resourceRepository = new ResourceRepository(prisma);
export const resourceApp = new ResourceApplication(resourceRepository);
export const resourceClt = new ResourceController(resourceApp);