import CurrencyService from "../services/currencyService.js";

export default class CurrencyController {
  private currencyService: CurrencyService;

  constructor(currencyService: CurrencyService) {
    this.currencyService = currencyService;
  }
  
  // TODO: CORRIGIR O TIPO DEVOLVIDO NA PROMISE, PRECISO DEVOLVER O OBJETO PRA PRINTAR O VALOR
  convertCurrency = async (moeda_origem: string, moeda_destino: string, valor_origem: number): Promise<[number, number]> => {
    try {
      const [result_value, conversion_rate] = await this.currencyService.convert(moeda_origem, moeda_destino, valor_origem);
      return [result_value, conversion_rate];
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error("Unknown error occurred");
      }
    }
  }
}
