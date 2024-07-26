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

const ownerAddress = ownerAccount.accountAddress.toString();

(async (address: string) => {
  try {
    const result = await aptos.getAccountResource({
      accountAddress: address,
      resourceType:
        "0xe74e60628c2ed6e9b14edcfd6dca145a42d97a97bec0be30d0938ef17108b31a::message::Message", //0x1::aptos_account::Account
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
})(ownerAddress);
