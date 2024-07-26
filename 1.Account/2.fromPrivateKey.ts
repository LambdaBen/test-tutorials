import {
  Account,
  Ed25519PrivateKey,
  Secp256k1PrivateKey,
} from "@aptos-labs/ts-sdk";

const myPrivateKey =
  "0xb56970ba42c1218fd2dc12b34ad7020390a100f24e3aa616c39aba05bcf437bd"; // 0x12345...
const ed25519PrivateKey = new Ed25519PrivateKey(myPrivateKey);
const ed25519Account = Account.fromPrivateKey({
  privateKey: ed25519PrivateKey,
});

const secp256k1PrivateKey = new Secp256k1PrivateKey(myPrivateKey);
const secp256k1Account = Account.fromPrivateKey({
  privateKey: secp256k1PrivateKey,
});

console.log(ed25519Account);
console.log(secp256k1Account);
