import promptSync from "prompt-sync";

export default class CurrencyView {
  private prompt: promptSync;

  constructor(prompt: promptSync) {
    this.prompt = promptSync;
  }

  menuPrincipal = () => {
    let opcao: number;
    while (opcao != 0) {
      console.log("1. Converter moeda");
      console.log("0. Sair");

      opcao = this.prompt("Selecione uma opção: ");
      switch (opcao) {
        case 1: 
          let moeda_origem = this.prompt("Insira a sigla da moeda de origem: ");
          let moeda_destino = this.prompt("Insira a sigla da moeda destino: ");
          let valor_origem = this.prompt("Insira o valor a ser convertido: ");
          const response = axios.get(`${process.env.APP_ENV}:${process.env.PORT}/currency/${moeda_origem}/${moeda_destino}/${valor_origem}`);
          console.log(response);
          break;
        default:
          console.log("Opção inválida");
          break;
      }
    }
  }
}
