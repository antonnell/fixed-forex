# Fixed Forex
https://andrecronje.medium.com/fair-launches-decentralized-collaboration-and-fixed-forex-ab327a2e4fc4

IBEUR_ADDRESS = '0x96e61422b6a9ba0e068b6c5add4ffabc6a4aae27'             // -> minted asset
IBEUR_ETH_ADDRESS = '0xa2d81bedf22201a77044cdf3ab4d9dc1ffbc391b'         // -> sushi lp pair
IBFF_ADDRESS = '0xb347132eFf18a3f63426f4988ef626d2CbE274F5'              // -> reward asset (think CRV)
VEIBFF_ADDRESS = '0x4d0518c9136025903751209ddddf6c67067357b1'            // -> vested reward asset  (think veCRV)
FF_FAUCET_ADDRESS = '0x7d254d9adc588126edaee52a1029278180a802e8'         // -> stake sushi lp pair, get reward asset
FF_DISTRIBUTION_ADDRESS = '0x83893c4a42f8654c2dd4ff7b4a7cd0e33ae8c859'   // -> after locking, get protocol fees

## TODO:
- [ ] Home
- [ ] Assets
- [ ] Stake
- [ ] Vesting



## Getting started
- Make sure to have nodejs installed. This app is built using [Next.js](https://nextjs.org/learn/basics/create-nextjs-app) and [react](https://reactjs.org/docs/getting-started.html).
- Run `npm install`
- Create an account on [etherscan](https://etherscan.io/) then go to [your API keys](https://etherscan.io/myapikey) page and add a new API key there.
- Create an account on [infura](https://infura.io/dashboard) and create an [ethereum project](https://infura.io/dashboard/ethereum) there. This will give you an endpoint url that looks like `https://mainnet.infura.io/v3/some_key`. Alternatively, you can also run your own [ethereum rpc server](https://geth.ethereum.org/docs/rpc/server) instead of infura.
- You can now run the nextjs app this way: `NEXT_PUBLIC_ETHERSCAN_KEY=your_etherscan_key NEXT_PUBLIC_PROVIDER=your_infura_endpoint_url npm run dev`
- That's it! You can now start hacking and submit PRs. Some of us are in [discord](http://discord.yearn.finance/) in the #dev channel if you have questions.
