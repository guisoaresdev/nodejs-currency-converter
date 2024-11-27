import promptSync from "prompt-sync";
import CurrencyController from "../controllers/currencyController.js";

export default class CurrencyView {
  private currencyController: CurrencyController;
  private prompt: promptSync.Prompt;

  constructor(
    currencyController: CurrencyController,
    prompt: promptSync.Prompt,
  ) {
    this.currencyController = currencyController;
    this.prompt = promptSync();
  }

  converterMoedaView = async () => {
    let moeda_origem: string = " ";
    let moeda_destino: string;
    let valor_origem: number;
    while (true) {
      moeda_origem = this.capturarMoedaOrigem();
      if (moeda_origem === "") {
        console.log("Encerrando o sistema...");
        break;
      }
      moeda_destino = this.capturarMoedaDestino(moeda_origem);
      valor_origem = this.capturarValorOrigem();

      if (isNaN(valor_origem)) {
        console.log("Valor invalido, insira novamente: ");
        return;
      }
      try {
        const [value, rate] = await this.currencyController.convertCurrency(
          moeda_origem,
          moeda_destino,
          valor_origem,
        );
        console.log(`Taxa de conversão: ${rate} `);
        console.log(`Valor: ${value} ${moeda_destino}`);
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message);
        } else {
          throw new Error("Unknown error occurred");
        }
      }
    }
  };

  capturarValorOrigem = (): number => {
    let valor_origem: number = 0;
    let isValorValido: boolean = false;
    while (!isValorValido) {
      valor_origem = parseFloat(
        this.prompt("Insira o valor a ser convertido: "),
      );
      if (valor_origem <= 0) {
        console.log("Insira somente valores maiores que 0.");
        continue;
      }
      isValorValido = true;
    }
    return valor_origem;
  };

  capturarMoedaOrigem = (): string => {
    let moeda_origem: string = "";
    let isMoedaValida: boolean = false;
    while (!isMoedaValida) {
      moeda_origem = this.prompt("Insira a sigla da moeda de origem: ");
      if (moeda_origem == "") {
        return "";
      }
      if (!this.validaSiglaMoeda(moeda_origem)) {
        console.log("Moeda deve ter apenas 3 caracteres. ex: BRL, USD");
        continue;
      }
      isMoedaValida = true;
    }
    return moeda_origem;
  };

  capturarMoedaDestino = (moeda_origem: string): string => {
    let moeda_destino: string = " ";
    let isMoedaValida: boolean = false;
    while (!isMoedaValida) {
      moeda_destino = this.prompt("Insira a sigla da moeda de destino: ");
      if (moeda_destino == "") {
        console.log("Valor vazio, tente novamente.");
        continue;
      }
      if (!this.validaSiglaMoeda(moeda_destino)) {
        console.log("Moeda deve ter apenas 3 caracteres. ex: BRL, USD");
        continue;
      }
      if (moeda_destino === moeda_origem) {
        console.log("A moeda destino deve ser diferente da moeda de origem.");
        continue;
      }
      isMoedaValida = true;
    }
    return moeda_destino;
  };

  validaSiglaMoeda = (moeda: string): boolean => {
    if (moeda.length != 3) {
      return false;
    } else {
      return true;
    }
  };
}
