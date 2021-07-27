import async from 'async';
import {
  MAX_UINT256,
  IBKRW_ADDRESS,
  IBEUR_ADDRESS,
  IBEUR_ETH_ADDRESS,
  IBFF_ADDRESS,
  VEIBFF_ADDRESS,
  FF_FAUCET_ADDRESS,
  FF_DISTRIBUTION_ADDRESS,
  ERROR,
  TX_SUBMITTED,
  STORE_UPDATED,
  FIXED_FOREX_UPDATED,
  CONFIGURE_FIXED_FOREX,
  FIXED_FOREX_CONFIGURED,
  GET_FIXED_FOREX_BALANCES,
  FIXED_FOREX_BALANCES_RETURNED,
} from './constants';

import * as moment from 'moment';

import stores from './';
import abis from './abis';
import { bnDec } from '../utils';

import BigNumber from 'bignumber.js';
const fetch = require('node-fetch');

class Store {
  constructor(dispatcher, emitter) {
    this.dispatcher = dispatcher;
    this.emitter = emitter;

    this.store = {
      assets: [],
      ibff: null,
      veIBFF: null,
      rewards: null
    };

    dispatcher.register(
      function (payload) {
        switch (payload.type) {
          case CONFIGURE_FIXED_FOREX:
            this.configure(payload);
            break;
          case GET_FIXED_FOREX_BALANCES:
            this.getFFBalances(payload);
            break;
          default: {
          }
        }
      }.bind(this),
    );
  }

  getStore = (index) => {
    return this.store[index];
  };

  setStore = (obj) => {
    this.store = { ...this.store, ...obj };
    console.log(this.store);
    return this.emitter.emit(STORE_UPDATED);
  };

  configure = async (payload) => {
    const web3 = await stores.accountStore.getWeb3Provider();
    if (!web3) {
      return null;
    }

    const account = await stores.accountStore.getStore('account');
    if (!account) {
      return null;
    }

    try {

      const assets = this._getAssets(web3)
      async.map(assets, async (asset, callback) => {
        asset = await this._getAssetInfo(web3, asset)
        callback(null, asset)
      }, (err, data) => {

        if(err) {
          this.emitter.emit(ERROR, err);
          return
        }

        this.setStore({ assets: data })

        this.emitter.emit(FIXED_FOREX_UPDATED);
        this.emitter.emit(FIXED_FOREX_CONFIGURED);
        this.dispatcher.dispatch({ type: GET_FIXED_FOREX_BALANCES });
      })


    } catch(ex) {
      console.log(ex)
      this.emitter.emit(ERROR, ex)
    }
  };

  _getAssets = (web3) => {
    const assets = [
      {
        address: IBEUR_ADDRESS
      },
      {
        address: IBKRW_ADDRESS
      }
    ]

    return assets
  }

  _getAssetInfo = async (web3, asset, account) => {
    try {
      const assetContract = new web3.eth.Contract(abis.ibEURABI, asset.address)

      const symbol = await assetContract.methods.symbol().call()
      const name = await assetContract.methods.name().call()
      const decimals = parseInt(await assetContract.methods.decimals().call())

      let balance = asset.balance ? asset.balance : 0

      if(account) {
        const balanceOf = await assetContract.methods.balanceOf(account.address).call()
        balance = BigNumber(balanceOf).div(10**decimals).toFixed(decimals)
      }

      return {
        address: web3.utils.toChecksumAddress(asset.address),
        symbol,
        name,
        decimals,
        balance
      }
    } catch(ex) {
      console.log(ex)
      return null
    }
  }

  getFFBalances = async (payload) => {
    try {

      const assets = this.getStore('assets');
      if (!assets) {
        return null;
      }

      const account = stores.accountStore.getStore('account');
      if (!account) {
        return null;
      }

      const web3 = await stores.accountStore.getWeb3Provider();
      if (!web3) {
        return null;
      }

      // get ibFF bal
      const ibff = await this._getAssetInfo(web3, { address: IBFF_ADDRESS }, account)

      // get veIBFF bal
      const veIBFF = await this._getAssetInfo(web3, { address: VEIBFF_ADDRESS }, account)

      // get rewards
      const rewards = await this._getRewards(web3, account, ibff)

      // get asset balances
      // get asset approvals (swap/stake/vest)
      const assetsBalancesPromise = assets.map(async (asset) => {
        const assetContract = new web3.eth.Contract(abis.erc20ABI, asset.address)

        const balanceOf = await assetContract.methods.balanceOf(account.address).call()

        return {
          balanceOf
        }
      })

      const assetsBalances = await Promise.all(assetsBalancesPromise);
      for(let i = 0; i < assets.length; i++) {
        assets[i].balance = BigNumber(assetsBalances[i].balanceOf).div(10**assets[i].decimals).toFixed(assets[i].decimals)
      }

      this.setStore({
        assets: assets,
        ibff,
        veIBFF,
        rewards,
      })

      this.emitter.emit(FIXED_FOREX_UPDATED);
    } catch(ex) {
      console.log(ex)
      this.emitter.emit(ERROR, ex)
    }
  };

  _getRewards = async (web3, account, ibff) => {
    try {
      // const distributionContract = new web3.eth.Contract(abis.distributionABI, FF_DISTRIBUTION_ADDRESS)
      // const claimable = await distributionContract.methods.claimable(account.address).call()

      const faucetContract = new web3.eth.Contract(abis.faucetABI, FF_FAUCET_ADDRESS)
      const earned = await faucetContract.methods.earned(account.address).call()

      return {
        // distribution: BigNumber(claimable).div(10**ibff.decimals).toFixed(ibff.decimals),
        faucet: BigNumber(earned).div(10**ibff.decimals).toFixed(ibff.decimals)
      }
    } catch(ex) {
      console.log(ex)
      return null
    }
  }

  approveFUSD = async (payload) => {
    const account = stores.accountStore.getStore('account');
    if (!account) {
      return false;
      //maybe throw an error
    }

    const web3 = await stores.accountStore.getWeb3Provider();
    if (!web3) {
      return false;
      //maybe throw an error
    }

    const { asset, amount, gasSpeed } = payload.content;

    this._callApproveFUSD(web3, asset, account, amount, gasSpeed, (err, approveResult) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FUSD_APPROVED, approveResult);
    });
  };

  _callApproveFUSD = async (web3, asset, account, amount, gasSpeed, callback) => {
    const tokenContract = new web3.eth.Contract(ERC20ABI, asset.tokenMetadata.address);

    let amountToSend = '0';
    if (amount === 'max') {
      amountToSend = MAX_UINT256;
    } else {
      amountToSend = BigNumber(amount)
        .times(10 ** asset.tokenMetadata.decimals)
        .toFixed(0);
    }

    const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

    this._callContractWait(web3, tokenContract, 'approve', ['CDP_VAULT_ADDRESS', amountToSend], account, gasPrice, GET_FUSD_BALANCES, callback);
  };

  mintFUSD = async (payload) => {
    const account = stores.accountStore.getStore('account');
    if (!account) {
      return false;
      //maybe throw an error
    }

    const web3 = await stores.accountStore.getWeb3Provider();
    if (!web3) {
      return false;
      //maybe throw an error
    }

    const { cdp, depositAmount, borrowAmount, gasSpeed } = payload.content;

    this._callMintFUSD(web3, cdp, account, depositAmount, borrowAmount, gasSpeed, (err, depositResult) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FUSD_MINTED, depositResult);
    });

  };

  _callMintFUSD = async (web3, asset, account, depositAmount, borrowAmount, gasSpeed, callback) => {
    try {
      let fusdContract = new web3.eth.Contract(FIXEDUSDABI, FUSD_ADDRESS);

      const depositAmountToSend = BigNumber(depositAmount === '' ? 0 : depositAmount)
        .times(10 ** 18)
        .toFixed(0);

      const borrowAmountToSend = BigNumber(borrowAmount === '' ? 0 : borrowAmount)
        .times(10 ** 18)
        .toFixed(0);

      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, fusdContract, 'mint', [asset.tokenMetadata.address, depositAmountToSend, borrowAmountToSend], account, gasPrice, GET_FUSD_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  burnFUSD = async (payload) => {
    const account = stores.accountStore.getStore('account');
    if (!account) {
      return false;
      //maybe throw an error
    }

    const web3 = await stores.accountStore.getWeb3Provider();
    if (!web3) {
      return false;
      //maybe throw an error
    }

    const { cdp, repayAmount, withdrawAmount, gasSpeed } = payload.content;

    this._callBurnFUSD(web3, cdp, account, repayAmount, withdrawAmount, gasSpeed, (err, depositResult) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FUSD_BURNT, depositResult);
    });
  };

  _callBurnFUSD = async (web3, asset, account, repayAmount, withdrawAmount, gasSpeed, callback) => {
    try {
      let fusdContract = new web3.eth.Contract(FIXEDUSDABI, FUSD_ADDRESS);

      const repayAmountToSend = BigNumber(repayAmount === '' ? 0 : repayAmount)
        .times(10 ** 18)
        .toFixed(0);
      const withdrawAmountToSend = BigNumber(withdrawAmount === '' ? 0 : withdrawAmount)
        .times(bnDec(asset.tokenMetadata.decimals))
        .toFixed(0);

      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, fusdContract, 'burn', [asset.tokenMetadata.address, withdrawAmountToSend, repayAmountToSend], account, gasPrice, GET_FUSD_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  _callContractWait = (web3, contract, method, params, account, gasPrice, dispatchEvent, callback) => {
    const context = this;
    contract.methods[method](...params)
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(gasPrice, 'gwei'),
      })
      .on('transactionHash', function (hash) {
        context.emitter.emit(TX_SUBMITTED, hash);
      })
      .on('receipt', function (receipt) {
        callback(null, receipt.transactionHash);
        if (dispatchEvent) {
          context.dispatcher.dispatch({ type: dispatchEvent, content: {} });
        }
      })
      .on('error', function (error) {
        if (!error.toString().includes('-32601')) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      })
      .catch((error) => {
        if (!error.toString().includes('-32601')) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };
}

export default Store;
