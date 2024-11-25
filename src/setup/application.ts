import CurrencyController from "../controllers/currencyController.js";
import CurrencyService from "../services/currencyService.js";
import CurrencyView from "../view/currencyView.js";
import ApiClient from "../utils/apiClient.js";
import promptSync from "prompt-sync";

export default class Application {
  private currencyController: CurrencyController;
  private currencyView: CurrencyView;

  constructor() {
    const apiClient = new ApiClient();
    const currencyService = new CurrencyService(apiClient);
    this.currencyController = new CurrencyController(currencyService);

    const prompt = promptSync();
    this.currencyView = new CurrencyView(this.currencyController, prompt);
  }

  public getCurrencyController(): CurrencyController {
    return this.currencyController;
  }

  public getCurrencyView(): CurrencyView {
    return this.currencyView;
  }
}

// Inicializar a aplicação
export function initApplication(): Application {
  return new Application();
}
