import { CountryDTO, ICity } from "../../../domain";
import AxiosHelper from "../../../helper/axios.helper";
import 'dotenv/config';

export class CityRepository implements ICity {
    private _axios: AxiosHelper;
    constructor() {
        this._axios = new AxiosHelper(process.env.CITY_API_URL || '');
    }
    async getCountries():Promise<CountryDTO[]>{
        try {
            return await this._axios.get('?country=all');            
        } catch (error) {
            throw error;
        }
    }
    async getStates(iso2: string):Promise<any>{
        try {
            return await this._axios.get(`?country=${iso2}&state=ALL`);
        } catch (error) {
            throw error;
        }
    }
}