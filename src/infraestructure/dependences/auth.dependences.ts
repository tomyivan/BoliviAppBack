import { AuthApplication } from "../../app";
import { AuthController } from "../http-api";
import { AuthRepository } from "../repository";
const authRepo = new AuthRepository();
const authApp = new AuthApplication( authRepo );
export const AuthClt = new AuthController( authApp );