import { DependencesApplication } from "../../app";
import { DependencesController } from "../http-api";
import { DependencesRepository } from "../repository";
const dependencesRepo = new DependencesRepository();
export const dependencesApp = new DependencesApplication( dependencesRepo );
export const dependencesClt = new DependencesController( dependencesApp );
