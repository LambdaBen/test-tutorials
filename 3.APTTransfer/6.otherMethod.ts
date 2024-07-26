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

(async (senderAccount: Account, recipientAddress: string, amount: number) => {
  try {
    const senderAddress = senderAccount.accountAddress.toString();
    const transaction = await aptos.transferCoinTransaction({
      sender: senderAddress,
      recipient: recipientAddress,
      amount: amount,
    });

    const signAndSubmit = await aptos.signAndSubmitTransaction({
      signer: senderAccount,
      transaction,
    });

    const executedTransaction = await aptos.waitForTransaction({
      transactionHash: signAndSubmit.hash,
    });

    console.log(executedTransaction);
  } catch (error) {
    console.error(error);
  }
})(senderAccount, receiverAddress, 100_000_000);
