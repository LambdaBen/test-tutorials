import {
  Account,
  Aptos,
  AptosConfig,
  Ed25519PrivateKey,
} from "@aptos-labs/ts-sdk";

const config = new AptosConfig({
  fullnode:
    "https://aptos-testnet.nodit.io/-K5v1arBZA9ZC-tYoG9rYbwTLCuAHo8a/v1",
  indexer:
    "https://aptos-testnet.nodit.io/-K5v1arBZA9ZC-tYoG9rYbwTLCuAHo8a/v1/graphql",
});

const aptos = new Aptos(config);

const privateKey =
  "0xb56970ba42c1218fd2dc12b34ad7020390a100f24e3aa616c39aba05bcf437bd"; // 0x12345...
const ed25519Scheme = new Ed25519PrivateKey(privateKey);
const senderAccount = Account.fromPrivateKey({
  privateKey: ed25519Scheme,
});
const receiverAddress = Account.generate().accountAddress.toString();

(async (senderAccount: Account, receiverAddress: string, amount: number) => {
  try {
    const transaction = await aptos.transaction.build.simple({
      sender: senderAccount.accountAddress.toString(),
      data: {
        function: "0x1::aptos_account::transfer",
        functionArguments: [receiverAddress, amount],
      },
    });
    const [simulateTransactionResult] = await aptos.transaction.simulate.simple(
      {
        signerPublicKey: senderAccount.publicKey,
        transaction,
      }
    );

    console.log(simulateTransactionResult);
  } catch (error) {
    console.error(error);
  }
})(senderAccount, receiverAddress, 100_000_000);
