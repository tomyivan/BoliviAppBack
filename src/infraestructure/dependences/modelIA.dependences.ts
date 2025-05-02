import { ModelIARepository } from "../repository";
import { ModelIAApplication } from "../../app";
import { ModelIAController } from "../http-api";
const modelIARepo = new ModelIARepository();
export const modelIAApp = new ModelIAApplication( modelIARepo );
export const modelIAClt = new ModelIAController( modelIAApp );
