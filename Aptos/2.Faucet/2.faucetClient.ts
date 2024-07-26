import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import {
  AptosFaucetClient,
  FundRequest,
} from "@aptos-labs/aptos-faucet-client";

const config = new AptosConfig({
  fullnode:
    "https://aptos-testnet.nodit.io/-K5v1arBZA9ZC-tYoG9rYbwTLCuAHo8a/v1",
  indexer:
    "https://aptos-testnet.nodit.io/-K5v1arBZA9ZC-tYoG9rYbwTLCuAHo8a/v1/graphql",
});

const aptos = new Aptos(config);
const faucetClient = new AptosFaucetClient({
  BASE: "https://faucet.testnet.aptoslabs.com",
});
const address =
  "0x258520e886bc5a019eb79f9af6ab0c75f0685165bcca4e670f382d5b107804cd";

(async (address: string) => {
  try {
    const request: FundRequest = {
      amount: 100_000_000,
      address,
    };
    const [getFaucet] = (await faucetClient.fund.fund({ requestBody: request }))
      .txn_hashes;

    await aptos.waitForTransaction({
      transactionHash: getFaucet,
    });

    const getBalance = await aptos.getAccountAPTAmount({
      accountAddress: address,
    });
    console.log("My APT Balance :", getBalance);
  } catch (error) {
    console.error(error);
  }
})(address);
