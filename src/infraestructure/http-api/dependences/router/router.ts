import express from 'express';
import { dependencesClt } from '../../../dependences/dependences.dependences';
import { validationJWT } from '../../../../middleware';
const rDependences = express.Router();
rDependences.get('/departaments', validationJWT, dependencesClt.getDepartments.bind(dependencesClt) );
rDependences.get('/measures', validationJWT , dependencesClt.getMeasures.bind(dependencesClt) );
export { rDependences };