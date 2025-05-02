import { validationField, validationJWT } from "../../../../middleware";
import { Router } from "express";
import { check } from "express-validator";
import { historyClt } from "../../../dependences/history.dependences";
import { HistoryFieldMiddleware } from "../../../../middleware";
const rHistory = Router();


rHistory.post('/add', validationJWT, [
    check('history.title').notEmpty().withMessage('El titulo es obligatorio'),
    check('history.dateStart').notEmpty().withMessage('La fecha de inicio es obligatoria'),
    check('history.dateEnd').notEmpty().withMessage('La fecha de fin es obligatoria'),
    check('history.summary').notEmpty().withMessage('El resumen es obligatorio'),
    check('history.description').notEmpty().withMessage('La descripcion es obligatoria'),
    check('history.idCategory').notEmpty().withMessage('La categoria es obligatoria'),
    validationField
], HistoryFieldMiddleware.validationCharacters.bind(historyClt),
    HistoryFieldMiddleware.validationLocation.bind(historyClt),
    HistoryFieldMiddleware.validtionReference.bind(historyClt)
, historyClt.createHistory.bind(historyClt));

export {
    rHistory
}