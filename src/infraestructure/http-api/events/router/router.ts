import { Router } from "express";
import { validationField, validationJWT } from "../../../../middleware";
import { check } from "express-validator";
import { eventsClt } from "../../../dependences/event.dependences";
import multer from "multer";
import { EventFileMiddleware } from "../../../../middleware";
import path from "path";
import fs from "fs";
/* config multer */

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/events/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
    }
  });
  
  /* end config multer */
const upload = multer({ storage: storage });

const rEvent = Router();

rEvent.get('/simple', validationJWT , eventsClt.getSimpleEvents.bind(eventsClt) );
rEvent.get('/byId/:idEvent', validationJWT , eventsClt.getEventById.bind(eventsClt) );
rEvent.post('/add', [
    check('event.name', 'El nombre es obligatorio').not().isEmpty(),
    check('event.detail', 'El detalle es obligatorio').not().isEmpty(),
    check('event.date', 'La fecha es obligatoria').not().isEmpty(),
    check('event.startTime', 'La hora de inicio es obligatoria').not().isEmpty(),
    check('event.endTime', 'La hora de fin es obligatoria').not().isEmpty(),
    check('event.idCategory', 'La categoria es obligatoria').not().isEmpty(),
    check('event.location.name', 'La ubicacion es obligatoria').not().isEmpty(),
    check('event.location.codDepartment', 'El departamento es obligatorio').not().isEmpty(),
    validationField ], eventsClt.createEvent.bind(eventsClt) );
rEvent.put('/update', validationJWT, [
    check('event.idEvent', 'El id del evento es obligatorio').not().isEmpty(),
    check('event.name', 'El nombre es obligatorio').not().isEmpty(),
    check('event.detail', 'El detalle es obligatorio').not().isEmpty(),
    check('event.date', 'La fecha es obligatoria').not().isEmpty(),
    check('event.startTime', 'La hora de inicio es obligatoria').not().isEmpty(),
    check('event.endTime', 'La hora de fin es obligatoria').not().isEmpty(),
    check('event.idCategory', 'La categoria es obligatoria').not().isEmpty(),
    check('event.location.name', 'La ubicacion es obligatoria').not().isEmpty(),
    check('event.location.codDepartment', 'El departamento es obligatorio').not().isEmpty(),
    validationField ], eventsClt.updateEvent.bind(eventsClt) );
    
rEvent.get('/type/categories', validationJWT , eventsClt.getCategoryEvents.bind(eventsClt));
rEvent.post('/upload/:idEvent', validationJWT, upload.single('file'), eventsClt.uploadImage.bind(eventsClt) );
rEvent.get('/images/:idEvent', validationJWT , eventsClt.getImages.bind(eventsClt) );
rEvent.delete('/file/drop', validationJWT, 
    check('eventFile.idFile', 'El id del archivo es obligatorio').not().isEmpty(),
    check('eventFile.name', 'El nombre del archivo es obligatorio').not().isEmpty(),
    validationField
  ,EventFileMiddleware.dropFile.bind(EventFileMiddleware),
eventsClt.dropImage.bind(eventsClt) );

rEvent.get('/info/:idEvent', validationJWT , eventsClt.getEventInfo.bind(eventsClt) );
export { rEvent };