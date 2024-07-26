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
const ownerAccount = Account.fromPrivateKey({
  privateKey: ed25519Scheme,
});

let message = "test MSG";

(async (ownerAccount: Account, message: string) => {
  try {
    const transaction = await aptos.transaction.build.simple({
      sender: ownerAccount.accountAddress.toString(),
      data: {
        function:
          "e74e60628c2ed6e9b14edcfd6dca145a42d97a97bec0be30d0938ef17108b31a::message::set_message_with_message_counter", //0x1::aptos_account::transfer
        functionArguments: [message],
      },
    });

    const ownerAuthenticator = aptos.transaction.sign({
      signer: ownerAccount,
      transaction,
    });

    const submitTx = await aptos.transaction.submit.simple({
      transaction,
      senderAuthenticator: ownerAuthenticator,
    });

    const executedTransaction = await aptos.waitForTransaction({
      transactionHash: submitTx.hash,
    });

    console.log(executedTransaction);
  } catch (error) {
    console.error(error);
  }
})(ownerAccount, message);
