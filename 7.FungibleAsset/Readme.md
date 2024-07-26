# Aptos Fungible Asset Tutorial

## Let’s deploy your Fungible Asset module and mint your own coin!

Based on what you’ve learned so far, you can deploy the Fungible Asset Module and interact with the deployed module using transactions.

You can learn more details about this tutorial by clicking the link below.

- [Go to Nodit Aptos Account tutorials docs]("https://~~~~")

### Deploy Module

`$ aptos move publish`

### function call

- Mint your Fungible Asset

```
 $ ts-node interaction/1.mint.ts
```

- Transfer your Fungible Asset

```
 $ ts-node interaction/2.transfer.ts
```

- Burn your Fungible Asset

```
 $ ts-node interaction/3.burn.ts
```

There is a Fungible Asset module in the [Aptos repository](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/move-examples/fungible_asset/fa_coin/sources/FACoin.move). You can take a look at the whole code about fungible assets.
