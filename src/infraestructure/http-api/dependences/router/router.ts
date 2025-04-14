import express from 'express';
import { dependencesClt } from '../../../dependences/dependences.dependences';
const rDependences = express.Router();
rDependences.get('/departaments', dependencesClt.getDepartments.bind(dependencesClt) );

export { rDependences };