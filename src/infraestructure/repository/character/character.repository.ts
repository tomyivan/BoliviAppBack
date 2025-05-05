import { CharacterDTO, CharacterFilter, ICharacter, List } from "../../../domain";
import { CharacterQuery } from "../query/character.query";
import { Execute } from "../datasource/querys.execute";
import { PrismaClient } from "@prisma/client";
export class CharacterRepository implements ICharacter {
    constructor(private readonly prisma: PrismaClient) {}
    getCharacter( q: CharacterFilter ): Promise<List[] | CharacterDTO[]> {
        return Execute.getData( CharacterQuery.getCharacter( q ) );
    }
}   