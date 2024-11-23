import ApiClient from "../utils/apiClient";
export class CurrencyService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = new ApiClient();
  }

  async convert(moeda_origem: string, moeda_destino: string, valor: number): Promise<[number, number]> {
    const [valor, conversionRate] = await this.apiClient.getFromAPI(moeda_origem, moeda_destino, valor);
    return [valor, conversionRate];
  }
}
