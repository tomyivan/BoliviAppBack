import { CharacterDTO, CharacterFilter, ICharacter, List } from "../../domain";
export class CharacterApplication {
    constructor( private readonly _character: ICharacter ) {}
    getCharacter( q: CharacterFilter ): Promise<List[] | CharacterDTO[]> {
        return  this._character.getCharacter( q );
    }
}