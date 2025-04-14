import { CityApplication } from "../../app";
import { CityController } from "../http-api";
import { CityRepository } from "../repository";
const cityRepository = new CityRepository();
export const cityApp = new CityApplication(cityRepository);
export const cityClt = new CityController(cityApp);
