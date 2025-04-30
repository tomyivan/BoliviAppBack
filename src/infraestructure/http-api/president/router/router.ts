import { presidentClt } from "../../../dependences/president.dependences";
import { Router } from "express";
import { check } from "express-validator";
import { validationField, validationJWT } from "../../../../middleware";
import multer from "multer";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/presidents/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
    }
  });
  
  /* end config multer */
const upload = multer({ storage: storage });
const rPresident = Router();
rPresident.get('/', validationJWT, presidentClt.getPresidents.bind(presidentClt) );
rPresident.get('/:idPresident', validationJWT,  presidentClt.getPresidentById.bind(presidentClt) );
rPresident.post('/add', [
    check('president.name', 'El nombre es obligatorio').not().isEmpty(),
    check('president.lastname', 'El apellido es obligatorio').not().isEmpty(),
    check('president.idPoliticalParty', 'El id del partido es obligatorio').not().isEmpty(),
    check('president.dateBirthday', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
    
    validationField ], presidentClt.createPresident.bind(presidentClt) );
rPresident.put('/update', validationJWT, [
    check('president.idPresident', 'El id del presidente es obligatorio').not().isEmpty(),
    check('president.name', 'El nombre es obligatorio').not().isEmpty(),
    check('president.lastname', 'El apellido es obligatorio').not().isEmpty(),
    check('president.idPoliticalParty', 'El id del partido es obligatorio').not().isEmpty(),
    check('president.dateBirthday', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
    validationField ], presidentClt.updatePresident.bind(presidentClt) );
rPresident.post('/delete', validationJWT, [
    check('president.idPresident', 'El id del presidente es obligatorio').not().isEmpty(),
    validationField ], presidentClt.deletePresident.bind(presidentClt) );

rPresident.post('/upload/:idPresident', validationJWT, upload.single('file'), presidentClt.createPresidentImage.bind(presidentClt) );   
rPresident.get('/images/:idPresident', validationJWT , presidentClt.getPresidentImages.bind(presidentClt) );
rPresident.post('/file/drop', validationJWT,[
    check('president.idFile', 'El id del archivo es obligatorio').not().isEmpty(),
    validationField
  ], presidentClt.deletePresidentImage.bind(presidentClt) );
rPresident.put('/file/isFrontPage', validationJWT,[
    check('president.idFile', 'El id del archivo es obligatorio').not().isEmpty(),
    check('president.idPresident', 'El id del presidente es obligatorio').not().isEmpty(),  
    validationField
  ], presidentClt.isFacePageImage.bind(presidentClt) );
  rPresident
export {
    rPresident
}