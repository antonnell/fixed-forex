import async from 'async';
import {
  MAX_UINT256,
  IBKRW_ADDRESS,
  IBKRW_GAUGE_ADDRESS,
  IBKRW_POOL_ADDRESS,
  IBEUR_ADDRESS,
  IBEUR_GAUGE_ADDRESS,
  IBEUR_POOL_ADDRESS,
  IBEUR_ETH_ADDRESS,
  IBFF_ADDRESS,
  VEIBFF_ADDRESS,
  FF_FAUCET_ADDRESS,
  FF_DISTRIBUTION_ADDRESS,
  GAUGE_PROXY_ADDRESS,
  ERROR,
  TX_SUBMITTED,
  STORE_UPDATED,
  FIXED_FOREX_UPDATED,
  CONFIGURE_FIXED_FOREX,
  FIXED_FOREX_CONFIGURED,
  GET_FIXED_FOREX_BALANCES,
  FIXED_FOREX_BALANCES_RETURNED,
  FIXED_FOREX_CLAIM_VESTING_REWARD,
  FIXED_FOREX_VESTING_REWARD_CLAIMED,
  FIXED_FOREX_CLAIM_STAKING_REWARD,
  FIXED_FOREX_STAKING_REWARD_CLAIMED,
  FIXED_FOREX_STAKE_SLP,
  FIXED_FOREX_SLP_STAKED,
  FIXED_FOREX_APPROVE_STAKE_SLP,
  FIXED_FOREX_STAKE_SLP_APPROVED,
  FIXED_FOREX_UNSTAKE_SLP,
  FIXED_FOREX_SLP_UNSTAKED,
  FIXED_FOREX_APPROVE_VEST,
  FIXED_FOREX_VEST_APPROVED,
  FIXED_FOREX_VEST,
  FIXED_FOREX_VESTED,
  FIXED_FOREX_VEST_AMOUNT,
  FIXED_FOREX_AMOUNT_VESTED,
  FIXED_FOREX_VEST_DURATION,
  FIXED_FOREX_DURATION_VESTED,
  FIXED_FOREX_VOTE,
  FIXED_FOREX_VOTE_RETURNED,
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
      veEURETHSLP: null,
      rewards: null
    };

    dispatcher.register(
      function (payload) {
        console.log(payload)
        switch (payload.type) {
          case CONFIGURE_FIXED_FOREX:
            this.configure(payload);
            break;
          case GET_FIXED_FOREX_BALANCES:
            this.getFFBalances(payload);
            break;
          case FIXED_FOREX_CLAIM_VESTING_REWARD:
            this.claimVestingReward(payload);
            break;
          case FIXED_FOREX_CLAIM_STAKING_REWARD:
            this.claimStakingReward(payload);
            break;
          case FIXED_FOREX_STAKE_SLP:
            this.stakeSLP(payload);
            break;
          case FIXED_FOREX_APPROVE_STAKE_SLP:
            this.approveStakeSLP(payload);
            break;
          case FIXED_FOREX_UNSTAKE_SLP:
            this.unstakeSLP(payload);
            break;
          case FIXED_FOREX_APPROVE_VEST:
            this.approveVest(payload);
            break;
          case FIXED_FOREX_VEST:
            this.vest(payload);
            break;
          case FIXED_FOREX_VEST_AMOUNT:
            this.vestAmount(payload);
            break;
          case FIXED_FOREX_VEST_DURATION:
            this.vestDuration(payload);
            break;
          case FIXED_FOREX_VOTE:
            this.vote(payload);
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

  getAsset = (address) => {
    const assets = this.store.assets
    if(!assets || assets.length === 0) {
      return null
    }

    let theAsset = assets.filter((ass) => {
      if(!ass) {
        return false
      }
      return ass.address.toLowerCase() === address.toLowerCase()
    })

    if(!theAsset || theAsset.length === 0) {
      return null
    }

    return theAsset[0]
  }

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
        address: IBEUR_ADDRESS,
        gauge: {
          address: IBEUR_GAUGE_ADDRESS,
          poolAddress: IBEUR_POOL_ADDRESS
        }
      },
      {
        address: IBKRW_ADDRESS,
        gauge: {
          address: IBKRW_GAUGE_ADDRESS,
          poolAddress: IBKRW_POOL_ADDRESS
        }
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
        balance,
        gauge: asset.gauge
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
      const vestingContractApprovalAmount = await this._getApprovalAmount(web3, ibff, account.address, VEIBFF_ADDRESS)
      ibff.vestAllowance = vestingContractApprovalAmount

      // get veIBFF bal
      const veIBFF = await this._getAssetInfo(web3, { address: VEIBFF_ADDRESS }, account)
      const vestingInfo = await this._getVestingInfo(web3, account.address, veIBFF)
      veIBFF.vestingInfo = vestingInfo

      // get IBEUR ETH bal
      const veEURETHSLP = await this._getAssetInfo(web3, { address: IBEUR_ETH_ADDRESS }, account)
      const faucetContractApprovalAmount = await this._getApprovalAmount(web3, veEURETHSLP, account.address, FF_FAUCET_ADDRESS)

      // get rewards
      const rewards = await this._getFaucetRewards(web3, account, ibff)
      veEURETHSLP.faucetAllowance = faucetContractApprovalAmount
      veEURETHSLP.faucetBalance = rewards.balance

      const gaugeProxyContract = new web3.eth.Contract(abis.gaugeProxyABI, GAUGE_PROXY_ADDRESS)
      const totalGaugeVotes = await gaugeProxyContract.methods.totalWeight().call()
      const totalUserVotes = await gaugeProxyContract.methods.usedWeights(account.address).call()

      // get asset balances
      // get asset approvals (swap/stake/vest)
      const assetsBalancesPromise = assets.map(async (asset) => {
        const assetContract = new web3.eth.Contract(abis.erc20ABI, asset.address)
        const balanceOf = await assetContract.methods.balanceOf(account.address).call()

        const gaugeContract = new web3.eth.Contract(abis.gaugeABI, asset.gauge.address)
        const userRewards = await gaugeContract.methods.earned(account.address).call()
        const gaugeBalanceOf = await gaugeContract.methods.balanceOf(account.address).call()

        const gaugeVotes = await gaugeProxyContract.methods.weights(asset.gauge.poolAddress).call()
        const userGaugeVotes = await gaugeProxyContract.methods.votes(account.address, asset.gauge.poolAddress).call()

        const poolContract = new web3.eth.Contract(abis.poolABI, asset.gauge.poolAddress)
        const poolBalances = await poolContract.methods.get_balances().call()

        const coins0 = await poolContract.methods.coins(0).call()
        const coin0Contract = new web3.eth.Contract(abis.erc20ABI, coins0)
        const coin0Symbol = await coin0Contract.methods.symbol().call()

        const coins1 = await poolContract.methods.coins(1).call()
        const coin1Contract = new web3.eth.Contract(abis.erc20ABI, coins1)
        const coin1Symbol = await coin1Contract.methods.symbol().call()

        const coin0 = {
          address: coins0,
          symbol: coin0Symbol,
          poolBalance: BigNumber(poolBalances[0]).div(10**asset.decimals).toFixed(asset.decimals)
        }

        const coin1 = {
          address: coins1,
          symbol: coin1Symbol,
          poolBalance: BigNumber(poolBalances[1]).div(10**asset.decimals).toFixed(asset.decimals)
        }

        return {
          balanceOf,
          userRewards,
          gaugeBalanceOf,
          poolBalances,
          coin0,
          coin1,
          gaugeVotes,
          userGaugeVotes,
        }
      })

      const assetsBalances = await Promise.all(assetsBalancesPromise);
      for(let i = 0; i < assets.length; i++) {
        assets[i].balance = BigNumber(assetsBalances[i].balanceOf).div(10**assets[i].decimals).toFixed(assets[i].decimals)
        assets[i].gauge.balance = BigNumber(assetsBalances[i].gaugeBalanceOf).div(10**assets[i].decimals).toFixed(assets[i].decimals)
        assets[i].gauge.rewards = BigNumber(assetsBalances[i].userRewards).div(10**assets[i].decimals).toFixed(assets[i].decimals)
        assets[i].gauge.userVotes = BigNumber(assetsBalances[i].userGaugeVotes).div(10**assets[i].decimals).toFixed(assets[i].decimals)
        assets[i].gauge.userVotePercent = BigNumber(assetsBalances[i].userGaugeVotes).times(100).div(totalUserVotes).toFixed(assets[i].decimals)
        assets[i].gauge.votes = BigNumber(assetsBalances[i].gaugeVotes).div(10**assets[i].decimals).toFixed(assets[i].decimals)
        assets[i].gauge.votePercent = BigNumber(assetsBalances[i].gaugeVotes).times(100).div(totalGaugeVotes).toFixed(assets[i].decimals)
        assets[i].gauge.coin0 = assetsBalances[i].coin0
        assets[i].gauge.coin1 = assetsBalances[i].coin1
      }

      this.setStore({
        assets: assets,
        ibff,
        veIBFF,
        veEURETHSLP,
        rewards,
      })

      this.emitter.emit(FIXED_FOREX_UPDATED);
    } catch(ex) {
      console.log(ex)
      this.emitter.emit(ERROR, ex)
    }
  };

  _getFaucetRewards = async (web3, account, ibff) => {
    try {
      const faucetContract = new web3.eth.Contract(abis.faucetABI, FF_FAUCET_ADDRESS)

      const earned = await faucetContract.methods.earned(account.address).call()
      const totalRewards = await faucetContract.methods.getRewardForDuration().call()
      const totalSupply = await faucetContract.methods.totalSupply().call()
      const balanceOf = await faucetContract.methods.balanceOf(account.address).call()

      return {
        earned: BigNumber(earned).div(10**ibff.decimals).toFixed(ibff.decimals),
        faucetSupply: BigNumber(totalSupply).div(10**ibff.decimals).toFixed(ibff.decimals),
        totalRewards: BigNumber(totalRewards).div(10**ibff.decimals).toFixed(ibff.decimals),
        balance: BigNumber(balanceOf).div(10**ibff.decimals).toFixed(ibff.decimals)
      }
    } catch(ex) {
      console.log(ex)
      return null
    }
  }

  _getVestingInfo = async (web3, account, veIBFF) => {
    try {
      const veIBFFContract = new web3.eth.Contract(abis.veIBFFABI, VEIBFF_ADDRESS)

      const locked = await veIBFFContract.methods.locked(account).call()
      const lastUserSlope = await veIBFFContract.methods.get_last_user_slope(account).call()
      const totalSupply = await veIBFFContract.methods.totalSupply().call()

      return {
        locked: BigNumber(locked.amount).div(10**veIBFF.decimals).toFixed(veIBFF.decimals),
        lockEnds: locked.end,
        lockValue: BigNumber(lastUserSlope).div(10**veIBFF.decimals).toFixed(veIBFF.decimals),
        totalSupply: BigNumber(totalSupply).div(10**veIBFF.decimals).toFixed(veIBFF.decimals)
      }
    } catch(ex) {
      console.log(ex)
      return null
    }
  }

  _getApprovalAmount = async (web3, asset, owner, spender) => {
    const erc20Contract = new web3.eth.Contract(abis.erc20ABI, asset.address)
    const allowance = await erc20Contract.methods.allowance(owner, spender).call()

    return BigNumber(allowance).div(10**asset.decimals).toFixed(asset.decimals)
  }

  _getFaucetStakedAmount = async (web3, asset, owner) => {
    const faucetContract = new web3.eth.Contract(abis.faucetABI, FF_FAUCET_ADDRESS)
    const balanceOf = await faucetContract.methods.balanceOf(owner).call()

    return BigNumber(balanceOf).div(10**asset.decimals).toFixed(asset.decimals)
  }

  claimVestingReward = async (payload) => {
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

    const { gasSpeed } = payload.content;

    this._callClaimVestingReward(web3, account, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_VESTING_REWARD_CLAIMED, res);
    });
  }

  _callClaimVestingReward = async (web3, account, gasSpeed, callback) => {
    try {
      const faucetContract = new web3.eth.Contract(abis.faucetABI, FF_FAUCET_ADDRESS)
      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, faucetContract, 'getReward', [], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  }

  claimStakingReward = async (payload) => {
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

    const { gasSpeed } = payload.content;

    this._callClaimStakingReward(web3, account, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_STAKING_REWARD_CLAIMED, res);
    });
  }

  _callClaimStakingReward = async (web3, account, gasSpeed, callback) => {
    try {
      const faucetContract = new web3.eth.Contract(abis.faucetABI, FF_FAUCET_ADDRESS)
      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, faucetContract, 'getReward', [], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  }

  stakeSLP = async (payload) => {
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

    const { amount, gasSpeed } = payload.content;

    this._callDepositFaucet(web3, account, amount, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_SLP_STAKED, res);
    });

  }

  _callDepositFaucet = async (web3, account, amount, gasSpeed, callback) => {
    try {
      let faucetContract = new web3.eth.Contract(abis.faucetABI, FF_FAUCET_ADDRESS);

      const sendAmount = BigNumber(amount === '' ? 0 : amount)
        .times(10 ** 18)
        .toFixed(0);

      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, faucetContract, 'deposit', [sendAmount], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };


  approveStakeSLP = async (payload) => {
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

    const { gasSpeed } = payload.content;

    this._callApproveStakeSLP(web3, account, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_STAKE_SLP_APPROVED, res);
    });
  }

  _callApproveStakeSLP = async (web3, account, gasSpeed, callback) => {
    const slpContract = new web3.eth.Contract(abis.sushiLPABI, IBEUR_ETH_ADDRESS);
    const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);
    this._callContractWait(web3, slpContract, 'approve', [FF_FAUCET_ADDRESS, MAX_UINT256], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
  };

  unstakeSLP = async (payload) => {
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

    const { amount, gasSpeed } = payload.content;

    this._callWithdrawFaucet(web3, account, amount, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_SLP_UNSTAKED, res);
    });

  }

  _callWithdrawFaucet = async (web3, account, amount, gasSpeed, callback) => {
    try {
      let faucetContract = new web3.eth.Contract(abis.faucetABI, FF_FAUCET_ADDRESS);

      const sendAmount = BigNumber(amount === '' ? 0 : amount)
        .times(10 ** 18)
        .toFixed(0);

      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, faucetContract, 'withdraw', [sendAmount], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  vest = async (payload) => {
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

    const { amount, unlockTime, gasSpeed } = payload.content;

    this._callCreateLock(web3, account, amount, unlockTime, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_VESTED, res);
    });

  }

  _callCreateLock = async (web3, account, amount, unlockTime, gasSpeed, callback) => {
    try {
      let veBIFFContract = new web3.eth.Contract(abis.veIBFFABI, VEIBFF_ADDRESS);

      const sendAmount = BigNumber(amount === '' ? 0 : amount)
        .times(10 ** 18)
        .toFixed(0);

      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, veBIFFContract, 'create_lock', [sendAmount, unlockTime], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };


  approveVest = async (payload) => {
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

    const { gasSpeed } = payload.content;

    this._callApproveVest(web3, account, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_VEST_APPROVED, res);
    });
  }

  _callApproveVest = async (web3, account, gasSpeed, callback) => {
    const ibffContract = new web3.eth.Contract(abis.erc20ABI, IBFF_ADDRESS);
    const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);
    this._callContractWait(web3, ibffContract, 'approve', [VEIBFF_ADDRESS, MAX_UINT256], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
  };

  vestAmount = async (payload) => {
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

    const { amount, gasSpeed } = payload.content;

    this._callIncreaseAmount(web3, account, amount, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_AMOUNT_VESTED, res);
    });

  }

  _callIncreaseAmount = async (web3, account, amount, gasSpeed, callback) => {
    try {
      let veBIFFContract = new web3.eth.Contract(abis.veIBFFABI, VEIBFF_ADDRESS);

      const sendAmount = BigNumber(amount === '' ? 0 : amount)
        .times(10 ** 18)
        .toFixed(0);

      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, veBIFFContract, 'increase_amount', [sendAmount], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  vestDuration = async (payload) => {
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

    const { unlockTime, gasSpeed } = payload.content;

    this._callIncreaseUnlockTime(web3, account, unlockTime, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_DURATION_VESTED, res);
    });

  }

  _callIncreaseUnlockTime = async (web3, account, unlockTime, gasSpeed, callback) => {
    try {
      let veBIFFContract = new web3.eth.Contract(abis.veIBFFABI, VEIBFF_ADDRESS);

      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, veBIFFContract, 'increase_unlock_time', [unlockTime], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  vote = async (payload) => {
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

    const { votes, gasSpeed } = payload.content;

    this._callVote(web3, account, votes, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_VOTE_RETURNED, res);
    });

  }

  _callVote = async (web3, account, votes, gasSpeed, callback) => {
    try {
      let gaugeProxyContract = new web3.eth.Contract(abis.gaugeProxyABI, GAUGE_PROXY_ADDRESS);

      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      let tokens = votes.map((v) => {
        return v.address
      })

      let voteCounts = votes.map((v) => {
        return BigNumber(v.value).times(100).toFixed(0)
      })

      console.log(tokens)
      console.log(voteCounts)

      this._callContractWait(web3, gaugeProxyContract, 'vote', [tokens, voteCounts], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
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
