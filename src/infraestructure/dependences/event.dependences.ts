import { EventsController } from "../http-api";
import { EventsApplication } from "../../app";
import { EventRepository } from "../repository";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const eventRepo = new EventRepository( prisma );
export const eventsApp = new EventsApplication( eventRepo );
export const eventsClt = new EventsController( eventsApp );
