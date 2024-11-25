import ApiClient from "../utils/apiClient.js";

export default class CurrencyService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  convert = async (origin_currency: string, target_currency: string, base_value: number): Promise<[number, number]> => {
    try {
      const [target_currency_value, conversion_rate] = await this.apiClient.getFromAPI(origin_currency, target_currency, base_value);
      return [target_currency_value, conversion_rate];
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error("Unknown error occurred");
      }
    }
  }
}
