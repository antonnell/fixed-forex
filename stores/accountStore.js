import async from 'async';
import {
  GAS_PRICE_API,
  ZAPPER_GAS_PRICE_API,
  ERROR,
  STORE_UPDATED,
  CONFIGURE,
  ACCOUNT_CONFIGURED,

  CONFIGURE_FIXED_FOREX,
  FIXED_FOREX_CONFIGURED,

  ACCOUNT_CHANGED,
  GET_GAS_PRICES,
  GAS_PRICES_RETURNED,
} from './constants';

import { ERC20ABI } from './abis';

import { bnDec } from '../utils';

import stores from './';

import { injected, walletconnect, walletlink, fortmatic, portis, network } from './connectors';

import BigNumber from 'bignumber.js';
import Web3 from 'web3';

class Store {
  constructor(dispatcher, emitter) {
    this.dispatcher = dispatcher;
    this.emitter = emitter;

    this.store = {
      account: null,
      chainInvalid: false,
      web3context: null,
      tokens: [],
      connectorsByName: {
        MetaMask: injected,
        TrustWallet: injected,
        WalletConnect: walletconnect,
        WalletLink: walletlink,
        Fortmatic: fortmatic,
        Portis: portis,
      },
      gasPrices: {
        standard: 90,
        fast: 100,
        instant: 130,
      },
      gasSpeed: 'fast',
      currentBlock: 12906197,
    };

    dispatcher.register(
      function (payload) {
        switch (payload.type) {
          case CONFIGURE:
            this.configure(payload);
            break;
          default: {
          }
        }
      }.bind(this),
    );
  }

  getStore(index) {
    return this.store[index];
  }

  setStore(obj) {
    this.store = { ...this.store, ...obj };
    // console.log(this.store);
    return this.emitter.emit(STORE_UPDATED);
  }

  configure = async () => {
    this.getGasPrices();
    this.getCurrentBlock();
    injected.isAuthorized().then((isAuthorized) => {
      const { supportedChainIds } = injected;
      // fall back to ethereum mainnet if chainId undefined
      const { chainId = 1 } = window.ethereum || {};
      const parsedChainId = parseInt(chainId, 16);
      const isChainSupported = supportedChainIds.includes(parsedChainId);
      if (!isChainSupported) {
        this.setStore({ chainInvalid: true });
        this.emitter.emit(ACCOUNT_CHANGED);
      }

      if (isAuthorized && isChainSupported) {
        injected
          .activate()
          .then((a) => {
            this.setStore({
              account: { address: a.account },
              web3context: { library: { provider: a.provider } },
            });
            this.emitter.emit(ACCOUNT_CONFIGURED);

            this.dispatcher.dispatch({
              type: CONFIGURE_FIXED_FOREX,
              content: { connected: true },
            });
          })
          .catch((e) => {
            this.emitter.emit(ERROR, e);
            this.emitter.emit(ACCOUNT_CONFIGURED);

            this.dispatcher.dispatch({
              type: CONFIGURE_FIXED_FOREX,
              content: { connected: false },
            });
          });
      } else {
        //we can ignore if not authorized.
        this.emitter.emit(ACCOUNT_CONFIGURED);
        this.emitter.emit(FIXED_FOREX_CONFIGURED);
      }
    });

    if (window.ethereum) {
      this.updateAccount();
    } else {
      window.removeEventListener('ethereum#initialized', this.updateAccount);
      window.addEventListener('ethereum#initialized', this.updateAccount, {
        once: true,
      });
    }
  };

  updateAccount = () => {
    const that = this;
    const res = window.ethereum.on('accountsChanged', function (accounts) {
      that.setStore({
        account: { address: accounts[0] },
        web3context: { library: { provider: window.ethereum } },
      });
      that.emitter.emit(ACCOUNT_CHANGED);
      that.emitter.emit(ACCOUNT_CONFIGURED);

      that.dispatcher.dispatch({
        type: CONFIGURE_FIXED_FOREX,
        content: { connected: true },
      });
    });

    window.ethereum.on('chainChanged', function (chainId) {
      const supportedChainIds = [1];
      const parsedChainId = parseInt(chainId, 16);
      const isChainSupported = supportedChainIds.includes(parsedChainId);
      that.setStore({ chainInvalid: !isChainSupported });
      that.emitter.emit(ACCOUNT_CHANGED);
      that.emitter.emit(ACCOUNT_CONFIGURED);

      that.configure()
    });
  };

  getCurrentBlock = async (payload) => {
    try {
      var web3 = new Web3(process.env.NEXT_PUBLIC_PROVIDER);
      const block = await web3.eth.getBlockNumber();
      this.setStore({ currentBlock: block });
    } catch (ex) {
      console.log(ex);
    }
  };

  getGasPrices = async (payload) => {
    const gasPrices = await this._getGasPrices();
    let gasSpeed = localStorage.getItem('yearn.finance-gas-speed');

    if (!gasSpeed) {
      gasSpeed = 'fast';
      localStorage.getItem('yearn.finance-gas-speed', 'fast');
    }

    this.setStore({ gasPrices: gasPrices, gasSpeed: gasSpeed });
    this.emitter.emit(GAS_PRICES_RETURNED);
  };

  _getGasPrices = async () => {
    try {
      const url = ZAPPER_GAS_PRICE_API;
      const priceResponse = await fetch(url);
      const priceJSON = await priceResponse.json();

      if (priceJSON) {
        return priceJSON;
      }
    } catch (e) {
      console.log(e);
      const web3 = await this._getWeb3Provider();
      const gasPrice = await web3.eth.getGasPrice();
      const gasPriceInGwei = web3.utils.fromWei(gasPrice, "gwei");
      return {
        standard: gasPriceInGwei,
        fast: gasPriceInGwei,
        instant: gasPriceInGwei,
      };
    }
  };

  getGasPrice = async (speed) => {
    let gasSpeed = speed;
    if (!speed) {
      gasSpeed = this.getStore('gasSpeed');
    }

    try {
      const url = ZAPPER_GAS_PRICE_API;
      const priceResponse = await fetch(url);
      const priceJSON = await priceResponse.json();

      if (priceJSON) {
        return priceJSON[gasSpeed].toFixed(0);
      }
    } catch (e) {
      console.log(e);
      return {};
    }
  };

  getWeb3Provider = async () => {
    let web3context = this.getStore('web3context');
    let provider = null;

    if (!web3context) {
      provider = network.providers['1'];
    } else {
      provider = web3context.library.provider;
    }

    if (!provider) {
      return null;
    }
    return new Web3(provider);
  };
}

export default Store;
