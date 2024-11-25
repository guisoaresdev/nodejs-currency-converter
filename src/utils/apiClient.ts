import axios from "axios";
import "dotenv/config";

interface ApiResponse {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  target_code: string;
  conversion_rate: number;
  conversion_result: number;
}

export default class ApiClient {
  private apiUri: string;

  constructor() {
    this.apiUri = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}`;
  }

  getApiURI() {
    return this.apiUri;
  }

  getFromAPI = async (origin_currency: string, target_currency: string, amount: number): Promise<[number, number]> => {
    try {
      const response = await axios.get<ApiResponse>(`${this.getApiURI()}/pair/${origin_currency}/${target_currency}/${amount}`);
      
      const conversion_rate: number = response.data.conversion_rate;
      const target_value: number = response.data.conversion_result;

      return [target_value, conversion_rate];
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error("Unknown error occurred");
      }
    }
  }
}
