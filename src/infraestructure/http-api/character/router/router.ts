import { characterClt } from "../../../dependences/character.dependences";
import { validationJWT } from "../../../../middleware";
import { Router } from "express";
import { check } from "express-validator";
import { validationField } from "../../../../middleware";
const rCharacter = Router();
rCharacter.get('/', validationJWT, characterClt.getCharacter.bind(characterClt));
export {
    rCharacter
}
