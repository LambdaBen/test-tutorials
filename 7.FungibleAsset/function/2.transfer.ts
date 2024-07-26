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
  "0x0be5d8fbd0838722f4bd5f16019850d1e30d79176f133f3e981220ba3a7823b4"; // 0x12345...
const ed25519Scheme = new Ed25519PrivateKey(privateKey);
const senderAccount = Account.fromPrivateKey({
  privateKey: ed25519Scheme,
});

const receiverAddress = Account.generate().accountAddress.toString();
const amount: number = 1000; // change amount to transfer

(async (senderAccount: Account, receiverAddress: string, amount: number) => {
  try {
    const transaction = await aptos.transaction.build.simple({
      sender: senderAccount.accountAddress.toString(),
      data: {
        function:
          "0xe74e60628c2ed6e9b14edcfd6dca145a42d97a97bec0be30d0938ef17108b31a::fungible_asset::transfer", //0x1::aptos_account::transfer
        functionArguments: [
          senderAccount.accountAddress.toString(),
          receiverAddress,
          amount, // transfer function requires from_address and to_address and amount as arguments
        ],
      },
    });

    const senderAuthenticator = aptos.transaction.sign({
      signer: senderAccount,
      transaction,
    });

    const submitTx = await aptos.transaction.submit.simple({
      transaction,
      senderAuthenticator,
    });

    const executedTransaction = await aptos.waitForTransaction({
      transactionHash: submitTx.hash,
    });

    console.log(executedTransaction);
  } catch (error) {
    console.error(error);
  }
})(senderAccount, receiverAddress, amount);
