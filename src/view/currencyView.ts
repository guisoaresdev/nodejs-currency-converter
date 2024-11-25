import promptSync from "prompt-sync";
import CurrencyController from "../controllers/currencyController.js";

export default class CurrencyView {
  private currencyController: CurrencyController;
  private prompt: promptSync.Prompt;

  constructor(currencyController: CurrencyController, prompt: promptSync.Prompt) {
    this.currencyController = currencyController;
    this.prompt = promptSync();
  }

  // TODO: Estudar o material de estudo da iUUL pra ver como tratar essas chamadas assíncronas.
  menu = () => {
    let opcao: string = "";
    while (opcao != "0") {
      console.log("1. Converter moeda");
      console.log("0. Sair");
      opcao = this.prompt("Selecione uma opção: ");

      switch (opcao) {
        case "1":
          this.converterMoeda();
          break;
        case "0":
          console.log("Saindo...");
          break;
        default:
          console.log("Opção inválida");
          break;
      }
    }
  };

  converterMoeda = async () => {
    let moeda_origem = this.prompt("Insira a sigla da moeda de origem: ");
    let moeda_destino = this.prompt("Insira a sigla da moeda destino: ");
    let valor_origem: number = parseFloat(this.prompt("Insira o valor a ser convertido: "));

    if (isNaN(valor_origem)) {
      console.log("Valor invalido, insira novamente: ");
      return;
    }
    try {
      const [value, rate] = await this.currencyController.convertCurrency(moeda_origem, moeda_destino, valor_origem);
      if (!isNaN(value) && !isNaN(rate)) {
        console.log(`Taxa de conversão: ${rate} `);
        console.log(`Valor: ${value}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error("Unknown error occurred");
      }
    }
  };
}
