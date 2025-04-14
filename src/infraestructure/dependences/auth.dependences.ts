import { AuthApplication } from "../../app";
import { AuthController } from "../http-api";
import { AuthRepository } from "../repository";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const authRepo = new AuthRepository( prisma );
export const authApp = new AuthApplication( authRepo );
export const AuthClt = new AuthController( authApp );