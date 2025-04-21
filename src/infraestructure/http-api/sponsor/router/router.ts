import { Router } from "express";
import { validationJWT, validationField } from "../../../../middleware";
import { sponsorClt } from "../../../dependences/sponsor.dependences";
import { check } from "express-validator";
const rSponsor = Router();

rSponsor.get('/', validationJWT, sponsorClt.getSponsors.bind(sponsorClt));
rSponsor.get('/:id', validationJWT, sponsorClt.getSponsors.bind(sponsorClt));
rSponsor.post('/add', validationJWT, [
    check('sponsor.name').notEmpty().withMessage('El nombre es requerido'),
    validationField
], sponsorClt.addSponsor.bind(sponsorClt));
rSponsor.put('/update', validationJWT, [
    check('sponsor.idSponsor').notEmpty().withMessage('El id es requerido'),
    check('sponsor.name').notEmpty().withMessage('El nombre es requerido'),
    validationField
], sponsorClt.updateSponsor.bind(sponsorClt));
export {
    rSponsor
}