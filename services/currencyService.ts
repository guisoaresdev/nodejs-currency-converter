import ApiClient from "../utils/apiClient";

export default class CurrencyService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  convert = async (moeda_origem: string, moeda_destino: string, valor: number): Promise<[number, number]> => {
    try {
      const [value, conversionRate] = await this.apiClient.getFromAPI(moeda_origem, moeda_destino, valor);
      return [value, conversionRate];
    } catch (err) {
      throw new Error(err);
    }
  }
}
