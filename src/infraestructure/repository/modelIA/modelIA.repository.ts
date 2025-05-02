import { IModelIA, Promp, ResponseIA } from "../../../domain";
import AxiosHelper from "../../../helper/axios.helper";
import "dotenv/config";
export class ModelIARepository implements IModelIA {
    private readonly _axiosHelper: AxiosHelper;
    private readonly _url: string = process.env.API_IA || "http://localhost:3000/modelIA";
    private readonly token: string; 
    

    constructor() {
        this.token = process.env.AI_API_KEY || "your_token_here"; 
        this._axiosHelper = new AxiosHelper(this._url);
    }

    async generateText(promp: Promp): Promise<string> {
        try {      
            const response = await this._axiosHelper.post(`/?key=${this.token}`, promp) as ResponseIA;            
            return response.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error("Error generating text:", error);
            throw error;
        }
    }
}