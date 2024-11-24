import { Request, Response } from "express";
import CurrencyService from "../services/currencyService";
import { ResponseFormat } from "../interfaces/responseFormat";

export default class CurrencyController {
  private currencyService: CurrencyService;

  constructor(currencyService: CurrencyService) {
    this.currencyService = currencyService;
  }

  convertCurrency = async (req: Request, res: Response): Promise<void> => {
    try {
      const moeda_origem = req.params.moeda_origem;
      const moeda_destino = req.params.moeda_destino;
      const valor_origem = parseFloat(req.params.valor);
      const [valor_resultante, taxa_conversao] = await this.currencyService.convert(moeda_origem, moeda_destino, valor_origem);
      const response: ResponseFormat = { value: valor_resultante, rate: taxa_conversao };
      res.json(response);
    } catch (err) {
      res.status(500).send(err);
      throw new Error(err);
    }
  }
}
