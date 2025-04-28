import { validationJWT, validationField } from "../../../../middleware";
import { Router } from "express";
import { PoliticalPartyClt } from "../../../dependences/politicalParty.dependences";
import { check } from "express-validator";
const rPoliticalParty = Router();
rPoliticalParty.post('/add', [
    check('politicalParty.name', 'El nombre es obligatorio').not().isEmpty(),
    check('politicalParty.acronym', 'El detalle es obligatorio').not().isEmpty(),
    validationField ], PoliticalPartyClt.createPoliticalParty.bind(PoliticalPartyClt) );
rPoliticalParty.put('/update', validationJWT, [
    check('politicalParty.idPoliticalParty', 'El id del partido es obligatorio').not().isEmpty(),
    check('politicalParty.name', 'El nombre es obligatorio').not().isEmpty(),
    check('politicalParty.acronym', 'El detalle es obligatorio').not().isEmpty(),
    validationField ], PoliticalPartyClt.updatePoliticalParty.bind(PoliticalPartyClt) );
rPoliticalParty.delete('/delete/:idPoliticalParty', validationJWT, [
    check('idPoliticalParty', 'El id del partido es obligatorio').not().isEmpty(),
    validationField ], PoliticalPartyClt.deletePoliticalParty.bind(PoliticalPartyClt) );
rPoliticalParty.get('/', validationJWT, PoliticalPartyClt.getPoliticalParties.bind(PoliticalPartyClt) );
export { rPoliticalParty };
    