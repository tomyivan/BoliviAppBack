import { Router } from "express";
import { validationJWT, validationField } from "../../../../middleware";
import { resourceClt } from "../../../dependences/resource.dependences"; 
import { check } from "express-validator";
const rResource = Router();
rResource.get('/', validationJWT, resourceClt.getResource.bind(resourceClt));
rResource.get('/:id', validationJWT, resourceClt.getResource.bind(resourceClt));
rResource.post('/add', validationJWT, [
    check('resource.name', 'El nombre es obligatorio').not().isEmpty(),  
    check('resource.stock', 'El stock es obligatorio').not().isEmpty(),
    validationField
], resourceClt.addResource.bind(resourceClt));
rResource.put('/update', validationJWT, [
    check('resource.idResource', 'El id es obligatorio').not().isEmpty(),  
    check('resource.name', 'El nombre es obligatorio').not().isEmpty(),  
    check('resource.stock', 'El stock es obligatorio').not().isEmpty(),
    validationField
], resourceClt.updateResource.bind(resourceClt));
export { rResource };