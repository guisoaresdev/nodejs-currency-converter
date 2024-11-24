import CurrencyController from "../controllers/currencyController";
import CurrencyService from "../services/currencyService";
import CurrencyView from "../view/currencyView";
import ApiClient from "../utils/apiClient";
import promptSync from "prompt-sync";

export function initApplication(): CurrencyController {
  const apiClient = new ApiClient();
  const currencyService = new CurrencyService(apiClient);
  const currencyController = new CurrencyController(currencyService);

  return currencyController;
}

export function initView(): CurrencyView {
  const prompt = promptSync();
  const currencyView = new CurrencyView(prompt);
  return currencyView;
}
