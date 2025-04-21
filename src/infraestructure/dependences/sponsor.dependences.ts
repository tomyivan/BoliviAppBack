import { SponsorApplication } from "../../app";
import { SponsorRepository } from "../repository";
import { SponsorController } from "../http-api";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const sponsorRepository = new SponsorRepository(prisma);
export const sponsorApp = new SponsorApplication(sponsorRepository);
export const sponsorClt = new SponsorController(sponsorApp);
