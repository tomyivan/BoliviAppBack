import { ICity, List } from "../../domain";

export class CityApplication {
    constructor( private cityDomain: ICity ){}
    
    async getCountries () :Promise<List[]> {
        const response = await  this.cityDomain.getCountries();
        return response.map( ( { iso2, name } ) => ( { value: iso2, label: name } ) );
    }
    
    async getStates  ( iso2: string ): Promise<List[]>  {
        const response = await await this.cityDomain.getStates(iso2);
        return response.map( ( { iso2, name } ) => ( { value: iso2, label: name } ) );
    }
}