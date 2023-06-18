# Abstractii
Abstractii was a generative abstract art experience that was free for anyone to inscribe before block 783098 to be considered valid. It uses the inscriptionId to generate each unique abstractii.

A total of 17 abstractii were inscribed during that time and were index. This can be seen in the 
`abstractii.json` file.

[Abstractii Gallery](https://abstractii.vercel.app/)

What defines a valid Abstractii:
https://ordinals.com/content/25a89ffc653e825964a6fdf0a8b4bab101d24293b4bec3266b39783a641c25b5i0

# Abstractii Evolved
Abstractii Evolved is a generative abstract art experience that is free for anyone to inscribe before block 797536. It uses the block height to generate each Abstractii Evolved. Every Abstractii Evolved is the same however they all evolve together with each passing block of the Bitcoin blockchain. Once the block height reaches 797536 the Abstractii Evolved will be considered complete and will be indexed. 

What defines a valid Abstractii Evolved:
https://ordinals.com/content/c5619839420c6b298658726bfe5b5bd0180fae11c4b8113d638c9f44fbc44133i0

# How to do your own project like Abstractii

## How Generation works
See both the `Abstractii.html` and the `AbstractiiEvolved.html` to see how to do generative inscriptions. 

## InscriptionId RNG
The `Abstractii.html` uses the `inscriptionId` by parsing out the url from the browser. You can also do this in an SVG inscription as well. The `inscriptionId` is what is used to seed the RNG of the rendering. 
## Blockheight RNG
The `AbstractiiEvolved.html` uses the endpoint in ord `/blockheight` to seed the generation which means they will all look the same. If you wanted to have them all be uniuqe you can combine both `inscriptionId` and `/blockheight` together. You also have acess to `/blockhash` and `/blocktime`
>Note: this will change RNG everyblock

## Making it open for anyone to inscribe.

You can inscribe them yourself and then sell them. Or you can make them free to inscribe by anyone. The way to do this is have everyone inscribe the same file. Then you simply take the hash of the `/content/inscriptionId` to validate it.

See `validateAbstractii.js` and `validateAbstractiiEvolved.js`

This is a way to find what is in the collection without needing to know who is  inscribing them.

## Block Cut Off

In order to have an end to the mint you need to specify a block height where you no longer consider people inscribing them part of the collection. 

## Inscribing the rules
Also you should inscribe the rules onchain so that its clear what they are and they can't be disputed. See `validationAbstractii.html` and `validationAbstractiiEvolved.html`

The rules inscriptions can be seen [here](https://ordinals.com/content/25a89ffc653e825964a6fdf0a8b4bab101d24293b4bec3266b39783a641c25b5i0) and [here](https://ordinals.com/content/c5619839420c6b298658726bfe5b5bd0180fae11c4b8113d638c9f44fbc44133i0)

## Indexing the collection

Once the block cut off has pased you need to find out what makes up the collection. See the `indexInscriptions.js` to do this. modify the paramaters of your collection. This will output a json file with the collection.

## Using Regtest To Test it.

You should test everything in regtest. You can run Ord in regtest. This way you can get your `validation.html` prepared and inscribe the rules before you release the project. Here is how you run regtest you need to have [ord](https://github.com/ordinals/ord) on your machine with bitcoin core. You don't need to have the full bitcoin blockchain to run regtest.

Here are the commands to run regtest
```
bitcoind -regtest -txindex
ord -r wallet create
ord -r wallet receive
bitcoin-cli -regtest generatetoaddress 101 <receiveAddress>
ord -r wallet balance
ord -r wallet inscribe <file> --fee-rate 1
bitcoin-cli -regtest generatetoaddress 1 <receiveAddress>
ord -r server --http-port 8080
```
navigate to `localhost:8080` in your browser.

