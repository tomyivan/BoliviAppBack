import { modelIAClt } from "../../../dependences/modelIA.dependences";
import { Router } from "express";
import { check } from "express-validator";
import { validationField, validationJWT } from "../../../../middleware";
const rModelIA = Router();
rModelIA.post('/question', validationJWT, [
    check('promp.text').notEmpty().withMessage('La pregunta es obligatoria'),    
    validationField
], modelIAClt.generateText.bind(modelIAClt));
export {
    rModelIA
}