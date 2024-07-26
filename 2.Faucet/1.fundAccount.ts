import { Aptos, AptosConfig } from "@aptos-labs/ts-sdk";

const config = new AptosConfig({
  fullnode:
    "https://aptos-testnet.nodit.io/-K5v1arBZA9ZC-tYoG9rYbwTLCuAHo8a/v1",
  indexer:
    "https://aptos-testnet.nodit.io/-K5v1arBZA9ZC-tYoG9rYbwTLCuAHo8a/v1/graphql",
  faucet: "https://faucet.testnet.aptoslabs.com",
});

const aptos = new Aptos(config);
const address =
  "0x258520e886bc5a019eb79f9af6ab0c75f0685165bcca4e670f382d5b107804cd";

(async (address: string) => {
  try {
    const getFaucet = await aptos.fundAccount({
      accountAddress: address,
      amount: 100_000_000,
    });
    console.log(getFaucet);

    const getBalance = await aptos.getAccountAPTAmount({
      accountAddress: address,
    });
    console.log("My APT Balance :", getBalance);
  } catch (error) {
    console.error(error);
  }
})(address);
