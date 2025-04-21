import { Router } from "express";
import { validationField, validationJWT } from "../../../../middleware";
import { check } from "express-validator";
import { eventsClt } from "../../../dependences/event.dependences";
const rEvent = Router();

rEvent.post('/add', [
    check('event.name', 'El nombre es obligatorio').not().isEmpty(),
    check('event.detail', 'El detalle es obligatorio').not().isEmpty(),
    check('event.date', 'La fecha es obligatoria').not().isEmpty(),
    check('event.startTime', 'La hora de inicio es obligatoria').not().isEmpty(),
    check('event.endTime', 'La hora de fin es obligatoria').not().isEmpty(),
    check('event.idCategory', 'La categoria es obligatoria').not().isEmpty(),
    check('event.location.name', 'La ubicacion es obligatoria').not().isEmpty(),
    check('event.location.latitude', 'La latitud es obligatoria').not().isEmpty(),
    check('event.location.longitude', 'La longitud es obligatoria').not().isEmpty(),
    check('event.location.codDepartment', 'El departamento es obligatorio').not().isEmpty(),
    validationField ], eventsClt.createEvent.bind(eventsClt) );
rEvent.get('/type/categories', validationJWT , eventsClt.getCategoryEvents.bind(eventsClt));
export { rEvent };