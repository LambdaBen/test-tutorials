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
  "0xa5457876a6a1c4ad54aa28e0b9d95cd271a9dc93a752d0629b3fcac76533af50"; // 0x12345...
const ed25519Scheme = new Ed25519PrivateKey(privateKey);
const ownerAccount = Account.fromPrivateKey({
  privateKey: ed25519Scheme,
});

let message = "view_Message";

(async (ownerAccount: Account, message: string) => {
  try {
    const transaction = await aptos.transaction.build.simple({
      sender: ownerAccount.accountAddress.toString(),
      data: {
        function:
          "4cf159f0a4d58f7650423ad0cd65b8f80cd8ee0931a85c08754c8dfd8045e331::message::set_message", //0x1::aptos_account::transfer
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
