import { Request, Response } from "express";
import CurrencyService from "../services/currencyService";
import { ResponseFormat } from "../interfaces/responseFormat";

export class CurrencyController {
  private currencyService: CurrencyService;

  constructor() {
    this.currencyService = new CurrencyService();
  }

  async function convertCurrency(req: Request, res: Response): Promise<void> {
    try {
      const [valor, taxa] = await this.currencyService.convert(req.params.moeda_origem, req.params.moeda_destino, parseFloat(req.params.valor));
      let response: ResponseFormat = { value: valor, rate: taxa};
      res.json(response);
    } catch (err) {
      res.status(500).send("Sigla da moeda não foi encontrada");
    }
  }
}
