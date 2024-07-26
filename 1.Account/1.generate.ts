import { Account, SigningSchemeInput } from "@aptos-labs/ts-sdk";

const account = Account.generate();
const Secp256k1EcdsaAccount = Account.generate({
  scheme: SigningSchemeInput.Secp256k1Ecdsa,
});

console.log(account);
console.log(Secp256k1EcdsaAccount);
