import { CharacterApplication } from "../../app";
import { CharacterController } from "../http-api";
import { CharacterRepository } from "../repository";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const characterRep = new CharacterRepository( prisma );
const characterApp = new CharacterApplication( characterRep );
const characterClt = new CharacterController( characterApp );
export { characterClt, characterApp };