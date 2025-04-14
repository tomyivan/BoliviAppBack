import express from 'express';
import { cityClt } from '../../../dependences/city.dependences';
const rCity = express.Router();
rCity.get('/all', cityClt.getCountries.bind(cityClt) ); 
rCity.get('/state/:iso2', cityClt.getStates.bind(cityClt) );
export { rCity };