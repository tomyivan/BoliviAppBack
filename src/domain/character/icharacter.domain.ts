import { List } from "..";
import { CharacterDTO, CharacterFilter } from "./character";
export interface ICharacter {
    getCharacter: ( q: CharacterFilter ) => Promise<List[] | CharacterDTO[]>;
}