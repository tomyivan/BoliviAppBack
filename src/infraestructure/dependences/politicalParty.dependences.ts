import { PoliticalPartyApplication } from "../../app";
import { PoliticalPartyRepository } from "../repository";
import { PrismaClient } from "@prisma/client";
import { PoliticalPartyController } from "../http-api";
const prisma = new PrismaClient();
const politicalPartyRepo = new PoliticalPartyRepository( prisma );
export const politicalPartyApp = new PoliticalPartyApplication( politicalPartyRepo );
export const PoliticalPartyClt = new PoliticalPartyController( politicalPartyApp );
