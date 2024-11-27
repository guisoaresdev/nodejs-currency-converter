import Application from "./setup/application.js";
/*
 *  TODO: Aparentemente não preciso de um servidor que nem eu estava fazendo com express, somente consumir a api e devolver corretamente os dados inseridos no prompt do console.
 * 1. A aplicação consome uma API de conversor de moeda, /pair/:moeda_origem/:moeda_destino
 * 2. A aplicação deve capturar os dados do usuário pelo console
 * 3. O usuário insere: A moeda origem, a moeda destino, valor de origem.
 * 4. Retornamos no console a taxa de conversão e o valor após a conversão na moeda destino.
 *
 */

async function main() {
  const app = new Application();
  const view = app.getCurrencyView();
  await view.converterMoedaView();
}

main().catch((error) => {
  console.error("Erro durante a execução da aplicação:", error);
});
