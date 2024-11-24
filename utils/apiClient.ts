import axios from "axios";
import "dotenv/config";

export default class ApiClient {
  private apiUri: string;

  constructor(apiUri: string) {
    this.setApiURI(apiUri);
  }

  setApiURI() {
    this.apiUri = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}`;
  }

  getApiURI() {
    return this.apiUri;
  }

  getFromAPI = async (moeda_origem: string, moeda_destino: string, quantia: number): Promise<[number, number]> => {
    try {
      const response = await axios.get(`${this.getApiURI()}/pair/${moeda_origem}/${moeda_destino}`);
      const conversionRate: number = response.data.conversion_rate;
      const valorConvertido: number = quantia*conversionRate;
      return [valorConvertido, conversionRate];
    } catch (err) {
      throw new Error(err); 
    }
  }
}
