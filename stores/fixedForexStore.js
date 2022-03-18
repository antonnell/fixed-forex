import async from "async";
import {
  MAX_UINT256,
  ZERO_ADDRESS,
  CURVE_FI_STATS_API,
  FF_FEE_DISTRIBUTION_LOOKUP_ADDRESS,
  FF_MULTICALL_ADDRESS,
  IBKRW_ADDRESS,
  IBKRW_GAUGE_ADDRESS,
  IBKRW_POOL_ADDRESS,
  IBKRW_CONVEX_GAUGE_ADDRESS,
  IBKRW_YEARN_GAUGE_ADDRESS,
  IBKRW_CONVEX_PID,
  IBEUR_ADDRESS,
  IBEUR_GAUGE_ADDRESS,
  IBEUR_POOL_ADDRESS,
  IBEUR_CONVEX_GAUGE_ADDRESS,
  IBEUR_YEARN_GAUGE_ADDRESS,
  IBEUR_CONVEX_PID,

  IBEUR_AG_ADDRESS,
  IBEUR_AG_GAUGE_ADDRESS,
  IBEUR_AG_POOL_ADDRESS,
  IBEUR_AG_CONVEX_GAUGE_ADDRESS,
  IBEUR_AG_YEARN_GAUGE_ADDRESS,
  IBEUR_AG_CONVEX_PID,

  IBCHF_ADDRESS,
  IBCHF_GAUGE_ADDRESS,
  IBCHF_POOL_ADDRESS,
  IBCHF_CONVEX_GAUGE_ADDRESS,
  IBCHF_YEARN_GAUGE_ADDRESS,
  IBCHF_CONVEX_PID,
  IBAUD_ADDRESS,
  IBAUD_GAUGE_ADDRESS,
  IBAUD_POOL_ADDRESS,
  IBAUD_CONVEX_GAUGE_ADDRESS,
  IBAUD_YEARN_GAUGE_ADDRESS,
  IBAUD_CONVEX_PID,
  IBJPY_ADDRESS,
  IBJPY_GAUGE_ADDRESS,
  IBJPY_POOL_ADDRESS,
  IBJPY_CONVEX_GAUGE_ADDRESS,
  IBJPY_YEARN_GAUGE_ADDRESS,
  IBJPY_CONVEX_PID,
  IBGBP_ADDRESS,
  IBGBP_GAUGE_ADDRESS,
  IBGBP_YEARN_GAUGE_ADDRESS,
  IBGBP_POOL_ADDRESS,
  IBGBP_CONVEX_GAUGE_ADDRESS,
  IBGBP_CONVEX_PID,
  IBEUR_ETH_ADDRESS,
  IBFF_ADDRESS,
  VEIBFF_ADDRESS,
  FF_FAUCET_ADDRESS,
  FF_DISTRIBUTION_ADDRESS,
  GAUGE_PROXY_ADDRESS,
  FF_VEIBFF_DISTRIBUTION_ADDRESS,
  FF_FEE_CLAIM_DISTRIBUTION_ADDRESS,
  FF_BOOST_DELEGATE_ADDRESS,
  FF_KP3R_ADDRESS,
  FF_VEKP3R_ADDRESS,
  FF_VECLAIM_ADDRESS,
  FF_CRV_ADDRESS,
  FF_IBEUR_CLAIMABLE_ADDRESS,
  FF_KP3R_CLAIMABLE_ADDRESS,
  FF_CURVE_TOKEN_MINTER_ADDRESS,
  FF_RKP3R_ADDRESS,
  FF_OKP3R_ADDRESS,
  FF_CVX_ADDRESS,
  USDC_ADDRESS,
  CREAM_PRICE_ORACLE_ADDRESS,
  FF_STAKING_REWARDS_V3_ADDRESS,
  FF_UNSIWAP_POSITIONS_MANAGER_ADDRESS,
  FF_CONVEX_CLAIM_ZAP,
  FF_CURVE_GAUGE_CONTROLLER,
  FF_CONVEX_POOL_MANAGEMENT_ADDRESS,

  FF_IBAMM_ADDRESS,
  FF_IBAMM_V2_ADDRESS,

  IBEUR_ETH_ADDRESS_OLD,
  IBEUR_GAUGE_ADDRESS_OLD,
  IBKRW_GAUGE_ADDRESS_OLD,
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

  FIXED_FOREX_QUOTE_SWAP,
  FIXED_FOREX_QUOTE_SWAP_RETURNED,
  FIXED_FOREX_APPROVE_SWAP,
  FIXED_FOREX_SWAP_APPROVED,
  FIXED_FOREX_SWAP,
  FIXED_FOREX_SWAP_RETURNED,

  FIXED_FOREX_APPROVE_DEPOSIT_CURVE,
  FIXED_FOREX_DEPOSIT_CURVE_APPROVED,
  FIXED_FOREX_DEPOSIT_CURVE,
  FIXED_FOREX_CURVE_DEPOSITED,
  FIXED_FOREX_WITHDRAW_CURVE,
  FIXED_FOREX_CURVE_WITHDRAWN,
  FIXED_FOREX_APPROVE_STAKE_CURVE,
  FIXED_FOREX_STAKE_CURVE_APPROVED,
  FIXED_FOREX_STAKE_CURVE,
  FIXED_FOREX_CURVE_STAKED,
  FIXED_FOREX_UNSTAKE_CURVE,
  FIXED_FOREX_CURVE_UNSTAKED,
  FIXED_FOREX_APPROVE_STAKE_CONVEX,
  FIXED_FOREX_APPROVE_STAKE_YEARN,
  FIXED_FOREX_STAKE_CONVEX_APPROVED,
  FIXED_FOREX_STAKE_YEARN_APPROVED,
  FIXED_FOREX_STAKE_CONVEX,
  FIXED_FOREX_STAKE_YEARN,
  FIXED_FOREX_CONVEX_STAKED,
  FIXED_FOREX_YEARN_STAKED,
  FIXED_FOREX_UNSTAKE_CONVEX,
  FIXED_FOREX_UNSTAKE_YEARN,
  FIXED_FOREX_CONVEX_UNSTAKED,
  FIXED_FOREX_YEARN_UNSTAKED,
  FIXED_FOREX_CLAIM_DISTRIBUTION_REWARD,
  FIXED_FOREX_DISTRIBUTION_REWARD_CLAIMED,
  FIXED_FOREX_CLAIM_CURVE_REWARDS,
  FIXED_FOREX_CURVE_REWARD_CLAIMED,
  FIXED_FOREX_GET_SLIPPAGE_INFO,
  FIXED_FOREX_SLIPPAGE_INFO_RETURNED,
  FIXED_FOREX_WITHDRAW_LOCK,
  FIXED_FOREX_LOCK_WITHDRAWN,
  FIXED_FOREX_CLAIM_VECLAIM,
  FIXED_FOREX_VECLAIM_CLAIMED,
  FIXED_FOREX_CLAIM_ALL,
  FIXED_FOREX_ALL_CLAIMED,
  FIXED_FOREX_CLAIM_CURVE_RKP3R_REWARDS,
  FIXED_FOREX_CURVE_RKP3R_REWARD_CLAIMED,
  FIXED_FOREX_CLAIM_RKP3R,
  FIXED_FOREX_RKP3R_CLAIMED,
  FIXED_FOREX_REDEEM_OPTION,
  FIXED_FOREX_OPTION_REDEEMED,
  FIXED_FOREX_APPROVE_REDEEM_OPTION,
  FIXED_FOREX_REDEEM_OPTION_APPROVED,
  FIXED_FOREX_WITHDRAW_OLD,
  FIXED_FOREX_OLD_WITHDRAWN,
  FIXED_FOREX_APPROVE_DEPOSIT_UNI,
  FIXED_FOREX_DEPOSIT_UNI_APPROVED,
  FIXED_FOREX_DEPOSIT_UNI,
  FIXED_FOREX_UNI_DEPOSITED,
  FIXED_FOREX_WITHDRAW_UNI,
  FIXED_FOREX_UNI_WITHDRAWN,
  FIXED_FOREX_GET_UNI_REWARDS,
  FIXED_FOREX_UNI_REWARDS_RETURNED,
  FIXED_FOREX_GET_ALL_UNI_REWARDS,
  FIXED_FOREX_ALL_UNI_REWARDS_RETURNED,
  FIXED_FOREX_CLAIM_CONVEX_REWARDS,
  FIXED_FOREX_CONVEX_REWARD_CLAIMED,
} from "./constants";
import { Pool, tickToPrice } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";

import * as moment from "moment";

import stores from "./";
import abis from "./abis";
import { bnDec, bnToFixed, multiplyBnToFixed, sumArray } from "../utils";

import BigNumber from "bignumber.js";
const fetch = require("node-fetch");

class Store {
  constructor(dispatcher, emitter) {
    this.dispatcher = dispatcher;
    this.emitter = emitter;

    this.store = {
      breaker: false,
      assets: [],
      ibff: null,
      veIBFF: null,
      veEURETHSLP: null,
      rewards: null,
      rKP3R: null,
      oldAssets: [],
      swapFromAssets: [
        {
          address: '0x99D8a9C45b2ecA8864373A26D1459e3Dff1e17F3',
          symbol: 'MIM',
          name: 'Magic Internet Money',
          decimals: 18,
          icon: 'https://assets.coingecko.com/coins/images/16786/large/mimlogopng.png'
        },
        {
          address: '0x96e61422b6a9ba0e068b6c5add4ffabc6a4aae27',
          symbol: 'ibEUR',
          name: 'Iron Bank Euro',
          decimals: 18,
          icon: 'https://assets.coingecko.com/coins/images/17285/large/Iron_Bank_Euro.png'
        },
        {
          address: '0x57ab1ec28d129707052df4df418d58a2d46d5f51',
          symbol: 'sUSD',
          name: 'Synthetix USD',
          decimals: 18,
          icon: 'https://assets.coingecko.com/coins/images/5013/large/sUSD.png'
        }
      ]
    };

    dispatcher.register(
      function (payload) {
        console.log(payload);
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
          case FIXED_FOREX_CLAIM_DISTRIBUTION_REWARD:
            this.claimDistributionReward(payload);
            break;
          case FIXED_FOREX_CLAIM_CURVE_REWARDS:
            this.claimCurveReward(payload);
            break;
          case FIXED_FOREX_CLAIM_CURVE_RKP3R_REWARDS:
            this.claimCurveKP3RReward(payload);
            break;
          case FIXED_FOREX_CLAIM_CONVEX_REWARDS:
            this.claimConvexReward(payload);
            break;
          // SUSHISWAP LP
          case FIXED_FOREX_STAKE_SLP:
            this.stakeSLP(payload);
            break;
          case FIXED_FOREX_APPROVE_STAKE_SLP:
            this.approveStakeSLP(payload);
            break;
          case FIXED_FOREX_UNSTAKE_SLP:
            this.unstakeSLP(payload);
            break;
          // VESTING IBFF
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
          case FIXED_FOREX_WITHDRAW_LOCK:
            this.withdrawLock(payload);
            break;
          // VOTING
          case FIXED_FOREX_VOTE:
            this.vote(payload);
            break;
          // DEPOSIT LIQUIDITY CURVE LP
          case FIXED_FOREX_APPROVE_DEPOSIT_CURVE:
            this.approveDepositCurve(payload);
            break;
          case FIXED_FOREX_DEPOSIT_CURVE:
            this.depositCurve(payload);
            break;
          case FIXED_FOREX_WITHDRAW_CURVE:
            this.withdrawCurve(payload);
            break;
          case FIXED_FOREX_GET_SLIPPAGE_INFO:
            this.getSlippageInfo(payload);
            break;
          // STAKING CURVE LP
          case FIXED_FOREX_APPROVE_STAKE_CURVE:
            this.approveStakeCurve(payload);
            break;
          case FIXED_FOREX_STAKE_CURVE:
            this.stakeCurve(payload);
            break;
          case FIXED_FOREX_UNSTAKE_CURVE:
            this.unstakeCurve(payload);
            break;
          // STAKING CONVEX LP
          case FIXED_FOREX_APPROVE_STAKE_CONVEX:
            this.approveStakeConvex(payload);
            break;
          case FIXED_FOREX_STAKE_CONVEX:
            this.stakeConvex(payload);
            break;
          case FIXED_FOREX_UNSTAKE_CONVEX:
            this.unstakeConvex(payload);
            break;

          // STAKING YEARN LP
          case FIXED_FOREX_APPROVE_STAKE_YEARN:
            this.approveStakeYearn(payload);
            break;
          case FIXED_FOREX_STAKE_YEARN:
            this.stakeYearn(payload);
            break;
          case FIXED_FOREX_UNSTAKE_YEARN:
            this.unstakeYearn(payload);
            break;

          case FIXED_FOREX_CLAIM_VECLAIM:
            this.claimVeclaim(payload);
            break;
          case FIXED_FOREX_CLAIM_ALL:
            this.claimAll(payload);
            break;
          case FIXED_FOREX_CLAIM_RKP3R:
            this.claimRKP3R(payload);
            break;
          case FIXED_FOREX_REDEEM_OPTION:
            this.redeemOption(payload);
            break;
          case FIXED_FOREX_APPROVE_REDEEM_OPTION:
            this.approveRedeemOption(payload);
            break;
          case FIXED_FOREX_WITHDRAW_OLD:
            this.withdrawOld(payload);
            break;

          // UNI STAKING
          case FIXED_FOREX_APPROVE_DEPOSIT_UNI:
            this.approveDepositUni(payload);
            break;
          case FIXED_FOREX_DEPOSIT_UNI:
            this.depositUni(payload);
            break;
          case FIXED_FOREX_WITHDRAW_UNI:
            this.withdrawUni(payload);
            break;
          case FIXED_FOREX_GET_UNI_REWARDS:
            this.getUniRewards(payload);
            break;
          case FIXED_FOREX_GET_ALL_UNI_REWARDS:
            this.getAllUniRewards(payload);
            break;

            //swap
          case FIXED_FOREX_QUOTE_SWAP:
            this.quoteSwap(payload);
            break;
          case FIXED_FOREX_APPROVE_SWAP:
            this.approveSwap(payload);
            break;
          case FIXED_FOREX_SWAP:
            this.swap(payload);
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
    const assets = this.store.assets;
    if (!assets || assets.length === 0) {
      return null;
    }

    let theAsset = assets.filter((ass) => {
      if (!ass) {
        return false;
      }
      return ass.address.toLowerCase() === address.toLowerCase();
    });

    if (!theAsset || theAsset.length === 0) {
      return null;
    }

    return theAsset[0];
  };

  getAssetByGauge = (address) => {
    const assets = this.store.assets;
    if (!assets || assets.length === 0) {
      return null;
    }

    let theAsset = assets.filter((ass) => {
      if (!ass) {
        return false;
      }
      return ass.gauge.address.toLowerCase() === address.toLowerCase();
    });

    if (!theAsset || theAsset.length === 0) {
      return null;
    }

    return theAsset[0];
  };

  configure = async (payload) => {
    try {
      const web3 = await stores.accountStore.getWeb3Provider();
      if (!web3) {
        return null;
      }

      const account = await stores.accountStore.getStore("account");
      if (!account) {
        return null;
      }

      const assets = this._getAssets(web3);
      this.setStore({ assets });

      this.emitter.emit(FIXED_FOREX_UPDATED);
      this.emitter.emit(FIXED_FOREX_CONFIGURED);
      this.dispatcher.dispatch({ type: GET_FIXED_FOREX_BALANCES });
    } catch (ex) {
      console.log(ex);
      this.emitter.emit(ERROR, ex);
    }
  };

  _getSystemAssets = () => {
    return {
      ibff: {
        address: IBFF_ADDRESS,
        decimals: 18,
        symbol: "ibff",
        name: "Iron Bank Fixed Forex",
      },
      veIBFF: {
        address: VEIBFF_ADDRESS,
        decimals: 18,
        symbol: "veIBFF",
        name: "Vested IBFF",
      },
      ibERUETH: {
        address: IBEUR_ETH_ADDRESS,
        decimals: 18,
        symbol: "SLP",
        name: "SushiSwap LP Token",
      },
      kp3r: {
        address: FF_KP3R_ADDRESS,
        decimals: 18,
        symbol: "KP3R",
        name: "Keep3r",
      },
      vKP3R: {
        address: FF_VEKP3R_ADDRESS,
        decimals: 18,
        symbol: "vKP3R",
        name: "Vested Keep3r",
      },
      oKP3R: {
        address: FF_OKP3R_ADDRESS,
        decimals: 18,
        symbol: "oKP3R",
        name: "Keep3r Options",
      },
      rKP3R: {
        address: FF_RKP3R_ADDRESS,
        decimals: 18,
        symbol: "rKP3R",
        name: "Redeemable Keep3r",
      },
      crv: {
        address: FF_CRV_ADDRESS,
        decimals: 18,
        symbol: "crv",
        name: "Curve DAO Token",
        oracleAddress: "0xB8c5af54bbDCc61453144CF472A9276aE36109F9",
      },
    };
  };

  _getAssets = (web3) => {
    const assets = [
      {
        address: IBEUR_ADDRESS,
        symbol: "ibEUR",
        decimals: 18,
        name: "Iron Bank EUR",
        oracleAddress: "0x00e5c0774A5F065c285068170b20393925C84BF3",
        gauge: {
          address: IBEUR_GAUGE_ADDRESS,
          poolAddress: IBEUR_POOL_ADDRESS,
        },
        yearn: {
          address: IBEUR_YEARN_GAUGE_ADDRESS,
        },
        convex: {
          address: IBEUR_CONVEX_GAUGE_ADDRESS,
          pid: IBEUR_CONVEX_PID,
          rewards: [
            {
              poolAddress: "0x21034ccc4f8D07d0cF8998Fdd4c45e426540dEc1", //rKP3R Reward Pool
              address: FF_RKP3R_ADDRESS,
              decimals: 18,
              symbol: "rKP3R",
              name: "Redeemable Keep3r",
            },
          ],
        },
      },
      {
        address: IBKRW_ADDRESS,
        symbol: "ibKRW",
        decimals: 18,
        name: "Iron Bank KRW",
        oracleAddress: "0x3c9f5385c288cE438Ed55620938A4B967c080101",
        gauge: {
          address: IBKRW_GAUGE_ADDRESS,
          poolAddress: IBKRW_POOL_ADDRESS,
        },
        yearn: {
          address: IBKRW_YEARN_GAUGE_ADDRESS,
        },
        convex: {
          address: IBKRW_CONVEX_GAUGE_ADDRESS,
          pid: IBKRW_CONVEX_PID,
          rewards: [
            {
              poolAddress: "0xE3A64E08EEbf38b19a3d9fec51d8cD5A8898Dd5e", //rKP3R Reward Pool
              address: FF_RKP3R_ADDRESS,
              decimals: 18,
              symbol: "rKP3R",
              name: "Redeemable Keep3r",
            },
          ],
        },
      },
      {
        address: IBGBP_ADDRESS,
        symbol: "ibGBP",
        decimals: 18,
        name: "Iron Bank GBP",
        oracleAddress: "0xecaB2C76f1A8359A06fAB5fA0CEea51280A97eCF",
        gauge: {
          address: IBGBP_GAUGE_ADDRESS,
          poolAddress: IBGBP_POOL_ADDRESS,
        },
        yearn: {
          address: IBGBP_YEARN_GAUGE_ADDRESS,
        },
        convex: {
          address: IBGBP_CONVEX_GAUGE_ADDRESS,
          pid: IBGBP_CONVEX_PID,
          rewards: [
            {
              poolAddress: "0xE689DB5D753abc411ACB8a3fEf226C08ACDAE13f", //rKP3R Reward Pool
              address: FF_RKP3R_ADDRESS,
              decimals: 18,
              symbol: "rKP3R",
              name: "Redeemable Keep3r",
            },
          ],
        },
      },
      {
        address: IBCHF_ADDRESS,
        symbol: "ibCHF",
        decimals: 18,
        name: "Iron Bank CHF",
        oracleAddress: "0x1b3E95E8ECF7A7caB6c4De1b344F94865aBD12d5",
        gauge: {
          address: IBCHF_GAUGE_ADDRESS,
          poolAddress: IBCHF_POOL_ADDRESS,
        },
        yearn: {
          address: IBCHF_YEARN_GAUGE_ADDRESS,
        },
        convex: {
          address: IBCHF_CONVEX_GAUGE_ADDRESS,
          pid: IBCHF_CONVEX_PID,
          rewards: [
            {
              poolAddress: "0x9D9EBCc8E7B4eF061C0F7Bab532d1710b874f789", //rKP3R Reward Pool
              address: FF_RKP3R_ADDRESS,
              decimals: 18,
              symbol: "rKP3R",
              name: "Redeemable Keep3r",
            },
          ],
        },
      },
      {
        address: IBAUD_ADDRESS,
        symbol: "ibAUD",
        decimals: 18,
        name: "Iron Bank AUD",
        oracleAddress: "0x86BBD9ac8B9B44C95FFc6BAAe58E25033B7548AA",
        gauge: {
          address: IBAUD_GAUGE_ADDRESS,
          poolAddress: IBAUD_POOL_ADDRESS,
        },
        yearn: {
          address: IBAUD_YEARN_GAUGE_ADDRESS,
        },
        convex: {
          address: IBAUD_CONVEX_GAUGE_ADDRESS,
          pid: IBAUD_CONVEX_PID,
          rewards: [
            {
              poolAddress: "0x91ad51F0897552ce77f76B44e9a86B4Ad2B28c25", //rKP3R Reward Pool
              address: FF_RKP3R_ADDRESS,
              decimals: 18,
              symbol: "rKP3R",
              name: "Redeemable Keep3r",
            },
          ],
        },
      },
      {
        address: IBJPY_ADDRESS,
        symbol: "ibJPY",
        decimals: 18,
        name: "Iron Bank JPY",
        oracleAddress: "0x215F34af6557A6598DbdA9aa11cc556F5AE264B1",
        gauge: {
          address: IBJPY_GAUGE_ADDRESS,
          poolAddress: IBJPY_POOL_ADDRESS,
        },
        yearn: {
          address: IBJPY_YEARN_GAUGE_ADDRESS,
        },
        convex: {
          address: IBJPY_CONVEX_GAUGE_ADDRESS,
          pid: IBJPY_CONVEX_PID,
          rewards: [
            {
              poolAddress: "0x771bc5c888d1B318D0c5b177e4F996d3D5fd3d18", //rKP3R Reward Pool
              address: FF_RKP3R_ADDRESS,
              decimals: 18,
              symbol: "rKP3R",
              name: "Redeemable Keep3r",
            },
          ],
        },
      },
      {
        address: IBEUR_AG_ADDRESS,
        symbol: "ibEUR",
        decimals: 18,
        name: "Iron Bank EUR",
        oracleAddress: "0x00e5c0774A5F065c285068170b20393925C84BF3",
        gauge: {
          address: IBEUR_AG_GAUGE_ADDRESS,
          poolAddress: IBEUR_AG_POOL_ADDRESS,
        },
        yearn: {
          address: IBEUR_AG_YEARN_GAUGE_ADDRESS,
        },
        convex: {
          address: IBEUR_AG_CONVEX_GAUGE_ADDRESS,
          pid: IBEUR_AG_CONVEX_PID,
          rewards: [
            {
              poolAddress: "0x21034ccc4f8D07d0cF8998Fdd4c45e426540dEc1", //rKP3R Reward Pool
              address: FF_RKP3R_ADDRESS,
              decimals: 18,
              symbol: "rKP3R",
              name: "Redeemable Keep3r",
            },
          ],
        },
      },
    ];

    return assets;
  };

  _getAssetBalance = async (web3, asset, account) => {
    try {
      const assetContract = new web3.eth.Contract(abis.erc20ABI, asset.address);
      const balanceOf = await assetContract.methods.balanceOf(account.address).call();
      const balance = BigNumber(balanceOf)
        .div(10 ** asset.decimals)
        .toFixed(asset.decimals);
      return balance;
    } catch (ex) {
      console.log(ex);
      return null;
    }
  };

  getFFBalances = async (payload) => {
    try {
      const assets = this.getStore("assets");
      if (!assets) {
        return null;
      }

      const account = stores.accountStore.getStore("account");
      if (!account) {
        return null;
      }

      const web3 = await stores.accountStore.getWeb3Provider();
      if (!web3) {
        return null;
      }

      const systemAssets = this._getSystemAssets()

      this._setIBFF(web3, account, systemAssets)
      this._setVEIBFF(web3, account, systemAssets)
      this._setVEIBFFOld(web3, account, systemAssets)
      this._setRKP3R(web3, account, systemAssets)
      this._setOKP3R(web3, account, systemAssets)
      this._getCRV(web3, account, systemAssets)
      this._getAssetInfo(web3, account, assets)
      this._getRewardInfo(web3, account)
      this._getOldGaugeInfo(web3, account)
      this._getUniV3Info(web3, account)
      this._getStakingV3Rewards(web3, account)
      this._getSwapFromBalances(web3, account)
      this._getBreaker(web3, account)
    } catch(ex) {
      console.log(ex)
      this.emitter.emit(ERROR, ex)
    }
  };

  _getCRV = async (web3, account, systemAssets) => {
    try {
      const crv = systemAssets.crv;

      const priceOracleContract = new web3.eth.Contract(abis.creamPriceOracleABI, CREAM_PRICE_ORACLE_ADDRESS);
      const price = await priceOracleContract.methods.getUnderlyingPrice(crv.oracleAddress).call();
      crv.price = BigNumber(price)
        .div(10 ** (36 - crv.decimals))
        .toFixed(18);

      this.setStore({ crv });
      this.emitter.emit(FIXED_FOREX_UPDATED);
    } catch (ex) {
      console.log(ex);
    }
  };

  _setIBFF = async (web3, account, systemAssets) => {
    try {
      const ibff = systemAssets.kp3r;
      ibff.balance = await this._getAssetBalance(web3, ibff, account);
      const vestingContractApprovalAmount = await this._getApprovalAmount(web3, ibff, account.address, FF_VEKP3R_ADDRESS);
      ibff.vestAllowance = vestingContractApprovalAmount;

      // const priceOracleContract = new web3.eth.Contract(abis.creamPriceOracleABI, CREAM_PRICE_ORACLE_ADDRESS)
      // const price = await priceOracleContract.methods.getUnderlyingPrice(ibff.address).call()
      // ibff.price = BigNumber(price).div(10 ** (36 - ibff.decimals))

      this.setStore({ ibff });
      this.emitter.emit(FIXED_FOREX_UPDATED);
    } catch (ex) {
      console.log(ex);
    }
  };

  _setVEIBFF = async (web3, account, systemAssets) => {
    try {
      const veIBFF = systemAssets.vKP3R;
      veIBFF.balance = await this._getAssetBalance(web3, veIBFF, account);
      const vi = await this._getVestingInfo(web3, account, veIBFF);
      veIBFF.vestingInfo = vi;

      // const priceOracleContract = new web3.eth.Contract(abis.creamPriceOracleABI, CREAM_PRICE_ORACLE_ADDRESS)
      // const price = await priceOracleContract.methods.getUnderlyingPrice(veIBFF.address).call()
      // veIBFF.price = BigNumber(price).div(10 ** (36 - veIBFF.decimals))

      this.setStore({ veIBFF });
      this.emitter.emit(FIXED_FOREX_UPDATED);
    } catch (ex) {
      console.log(ex);
    }
  };

  _setVEIBFFOld = async (web3, account, systemAssets) => {
    try {
      const veIBFFOld = systemAssets.veIBFF;
      veIBFFOld.balance = await this._getAssetBalance(web3, veIBFFOld, account);
      const viOld = await this._getVestingInfoOld(web3, account, veIBFFOld);
      veIBFFOld.vestingInfo = viOld;

      this.setStore({ veIBFFOld });
      this.emitter.emit(FIXED_FOREX_UPDATED);
    } catch (ex) {
      console.log(ex);
    }
  };

  _setRKP3R = async (web3, account, systemAssets) => {
    try {
      const rKP3R = systemAssets.rKP3R;
      rKP3R.balance = await this._getAssetBalance(web3, rKP3R, account);

      const rKP3RContract = new web3.eth.Contract(abis.rKP3RABI, FF_RKP3R_ADDRESS);
      const price = await rKP3RContract.methods.twap().call();
      const discount = await rKP3RContract.methods.discount().call();
      rKP3R.price = BigNumber(price)
        .times((100 - discount) / 100)
        .div(10 ** 6)
        .toFixed(18);
      rKP3R.discount = discount;

      this.setStore({ rKP3R });
      this.emitter.emit(FIXED_FOREX_UPDATED);
    } catch (ex) {
      console.log(ex);
    }
  };

  _setOKP3R = async (web3, account, systemAssets) => {
    try {
      const oKP3RContract = new web3.eth.Contract(abis.oKP3RABI, FF_OKP3R_ADDRESS);
      const rKP3RContract = new web3.eth.Contract(abis.rKP3RABI, FF_RKP3R_ADDRESS);
      const usdcContract = new web3.eth.Contract(abis.erc20ABI, USDC_ADDRESS);

      const balanceOf = await oKP3RContract.methods.balanceOf(account.address).call();
      const arr = [...Array(parseInt(balanceOf)).keys()];

      const oKP3ROptions = await Promise.all(
        arr.map(async (idx) => {
          const tokenIdx = await oKP3RContract.methods.tokenOfOwnerByIndex(account.address, idx).call();
          const option = await rKP3RContract.methods.options(tokenIdx).call();
          const rKP3RAllowance = await usdcContract.methods.allowance(account.address, FF_RKP3R_ADDRESS).call();

          return {
            id: tokenIdx,
            amount: BigNumber(option.amount)
              .div(10 ** 18)
              .toFixed(18), //kp3r with 18 decimals
            strike: BigNumber(option.strike)
              .div(10 ** 6)
              .toFixed(6), //USDC with 6 decimals
            expiry: option.expiry,
            exercised: option.exercised,
            rKP3RAllowance: BigNumber(rKP3RAllowance)
              .div(10 ** 6)
              .toFixed(18), //USDC with 6 decimals
          };
        }),
      );

      this.setStore({ oKP3ROptions });
      this.emitter.emit(FIXED_FOREX_UPDATED);
    } catch (ex) {
      console.log(ex);
    }
  };

  //need to get $ value of ibAssets and sAssets, as well as pool ratios and take things further from there. fk knows.
  calcPoolAPY = (gaugeWeight, totalWeight, inflationRate, workingSupply, virtualPrice, assetPrice, curvePrice) => {
    try {
      let weightOfRewards = gaugeWeight / totalWeight;
      let rate = (((inflationRate * weightOfRewards * 31536000) / workingSupply) * 0.4) / (virtualPrice * (assetPrice / 1e18));
      let apy = rate * curvePrice * 100 * 1e36;

      return apy;
    } catch (ex) {
      console.error(ex);
      return 0;
    }
  };

  _getAssetInfo = async (web3, account, assets) => {
    try {
      const gaugeProxyContract = new web3.eth.Contract(abis.gaugeProxyABI, GAUGE_PROXY_ADDRESS);
      const priceOracleContract = new web3.eth.Contract(abis.creamPriceOracleABI, CREAM_PRICE_ORACLE_ADDRESS);

      const [totalGaugeVotes] = await Promise.all([gaugeProxyContract.methods.totalWeight().call()]);

      const convexCVXContract = new web3.eth.Contract(abis.convexCVXABI, FF_CVX_ADDRESS);
      const [convexReductionPerCliff, convexTotalSupply, convexMaxSupply, convexTotalCliffs] = await Promise.all([
        convexCVXContract.methods.reductionPerCliff().call(),
        convexCVXContract.methods.totalSupply().call(),
        convexCVXContract.methods.maxSupply().call(),
        convexCVXContract.methods.totalCliffs().call(),
      ]);

      let gaugeControllerContract = new web3.eth.Contract(abis.curveGaugeControllerABI, FF_CURVE_GAUGE_CONTROLLER);

      let curveFiBaseAPY = [];
      try {
        const url = `${CURVE_FI_STATS_API}api/getFactoryAPYs?version=2`;
        const apysResult = await fetch(url);
        const apysJSON = await apysResult.json();
        curveFiBaseAPY = apysJSON.data.poolDetails.filter((pool) => {
          return [IBGBP_POOL_ADDRESS, IBJPY_POOL_ADDRESS, IBKRW_POOL_ADDRESS, IBAUD_POOL_ADDRESS, IBCHF_POOL_ADDRESS, IBEUR_POOL_ADDRESS, IBEUR_AG_POOL_ADDRESS].includes(
            pool.poolAddress,
          );
        });
      } catch (ex) {
        console.log(ex);
      }
      let yearnNetworkAPY = [];
      try {
        const yearnUrl = `https://api.yearn.finance/v1/chains/1/vaults/all`;
        const yearnApysResult = await fetch(yearnUrl);
        const yearnApysJSON = await yearnApysResult.json();
        yearnNetworkAPY = yearnApysJSON.filter((vault) => {
          return [
            IBKRW_YEARN_GAUGE_ADDRESS,
            IBEUR_YEARN_GAUGE_ADDRESS,
            IBAUD_YEARN_GAUGE_ADDRESS,
            IBCHF_YEARN_GAUGE_ADDRESS,
            IBGBP_YEARN_GAUGE_ADDRESS,
            IBJPY_YEARN_GAUGE_ADDRESS,
            IBEUR_AG_YEARN_GAUGE_ADDRESS,
          ].includes(vault.address);
        });
      } catch (ex) {
        console.log(ex);
      }
      const assetsBalances = await Promise.all(
        assets.map(async (asset) => {

          let balanceOf,
          userGaugeBalance,
          userGaugeEarned,
          userRKP3REarned,
          poolBalances,
          userPoolBalance,
          poolSymbol,
          virtualPrice,
          poolGaugeAllowance,
          coins0,
          coins1,
          gaugeVotes,
          userGaugeVotes,
          price,
          curveInflationRate,
          curveWorkingSupply,
          curveGaugeWeight,
          curveTotalWeight,
          poolConvexAllowance,
          poolYearnAllowance,
          curveRewardData,
          coin0Symbol,
          coin0Decimals,
          coin0Balance,
          coin0GaugeAllowance,
          coin1Symbol,
          coin1Decimals,
          coin1Balance,
          coin1GaugeAllowance,
          convexBalanceOf,
          convexEarned,
          userVaultBalance,
          yearnPoolSymbol,
          yearnBalanceOf,
          coin0,
          coin1,
          convexRewardCallsResponse



          const assetContract = new web3.eth.Contract(abis.erc20ABI, asset.address);
          const gaugeContract = new web3.eth.Contract(abis.gaugeABI, asset.gauge.address);
          const poolContract = new web3.eth.Contract(abis.poolABI, asset.gauge.poolAddress);

          [
            balanceOf,
            userGaugeBalance,
            userGaugeEarned,
            userRKP3REarned,
            poolBalances,
            userPoolBalance,
            poolSymbol,
            virtualPrice,
            poolGaugeAllowance,
            coins0,
            coins1,
            gaugeVotes,
            userGaugeVotes,
            price,
            curveInflationRate,
            curveWorkingSupply,
            curveGaugeWeight,
            curveTotalWeight,
            curveRewardData,
          ] = await Promise.all([
            assetContract.methods.balanceOf(account.address).call(),
            gaugeContract.methods.balanceOf(account.address).call(),
            gaugeContract.methods.claimable_tokens(account.address).call(),
            gaugeContract.methods.claimable_reward(account.address, FF_RKP3R_ADDRESS).call(),
            poolContract.methods.get_balances().call(),
            poolContract.methods.balanceOf(account.address).call(),
            poolContract.methods.symbol().call(),
            poolContract.methods.get_virtual_price().call(),
            poolContract.methods.allowance(account.address, asset.gauge.address).call(),
            poolContract.methods.coins(0).call(),
            poolContract.methods.coins(1).call(),
            gaugeProxyContract.methods.weights(asset.gauge.poolAddress).call(),
            gaugeProxyContract.methods.votes(account.address, asset.gauge.poolAddress).call(),
            priceOracleContract.methods.getUnderlyingPrice(asset.oracleAddress).call(),
            gaugeContract.methods.inflation_rate().call(),
            gaugeContract.methods.working_supply().call(),
            gaugeControllerContract.methods.get_gauge_weight(asset.gauge.address).call(),
            gaugeControllerContract.methods.get_total_weight().call(),
            gaugeContract.methods.reward_data(FF_RKP3R_ADDRESS).call(),
          ]);

          // get coin asset info
          const coin0Contract = new web3.eth.Contract(abis.erc20ABI, coins0);
          const coin1Contract = new web3.eth.Contract(abis.erc20ABI, coins1);

          [coin0Symbol, coin0Decimals, coin0Balance, coin0GaugeAllowance, coin1Symbol, coin1Decimals, coin1Balance, coin1GaugeAllowance] =
            await Promise.all([
              coin0Contract.methods.symbol().call(),
              coin0Contract.methods.decimals().call(),
              coin0Contract.methods.balanceOf(account.address).call(),
              coin0Contract.methods.allowance(account.address, asset.gauge.poolAddress).call(),

              coin1Contract.methods.symbol().call(),
              coin1Contract.methods.decimals().call(),
              coin1Contract.methods.balanceOf(account.address).call(),
              coin1Contract.methods.allowance(account.address, asset.gauge.poolAddress).call(),
            ]);

          let intCoin0Decimasls = parseInt(coin0Decimals);
          let intCoin1Decimasls = parseInt(coin1Decimals);

          coin0 = {
            address: coins0,
            symbol: coin0Symbol,
            decimals: intCoin0Decimasls,
            balance: BigNumber(coin0Balance).div(10 ** intCoin0Decimasls).toFixed(intCoin0Decimasls),
            poolBalance: BigNumber(poolBalances[0]).div(10 ** intCoin0Decimasls).toFixed(intCoin0Decimasls),
            gaugeAllowance: BigNumber(coin0GaugeAllowance).div(10 ** intCoin0Decimasls).toFixed(intCoin0Decimasls),
          };

          coin1 = {
            address: coins1,
            symbol: coin1Symbol,
            decimals: intCoin1Decimasls,
            balance: BigNumber(coin1Balance).div(10 ** intCoin1Decimasls).toFixed(intCoin1Decimasls),
            poolBalance: BigNumber(poolBalances[1]).div(10 ** intCoin1Decimasls).toFixed(intCoin1Decimasls),
            gaugeAllowance: BigNumber(coin1GaugeAllowance).div(10 ** intCoin1Decimasls).toFixed(intCoin1Decimasls),
          };

          if(asset.convex.address && asset.convex.address !== '') {
            const convexGaugeContract = new web3.eth.Contract(abis.convexBaseRewardPoolABI, asset.convex.address);

            [
              convexBalanceOf,
              convexEarned,
              poolConvexAllowance,
            ] = await Promise.all([
              convexGaugeContract.methods.balanceOf(account.address).call(),
              convexGaugeContract.methods.earned(account.address).call(),
              poolContract.methods.allowance(account.address, FF_CONVEX_POOL_MANAGEMENT_ADDRESS).call(),
            ]);

            const convexRewardContract = new web3.eth.Contract(abis.convexVirtualBalanceRewardPoolABI, asset.convex.rewards[0].poolAddress);
            convexRewardCallsResponse = await convexRewardContract.methods.earned(account.address).call();
          }


          if(asset.yearn.address && asset.yearn.address !== '') {
            const yearnVaultContract = new web3.eth.Contract(abis.yearnVaultABI, asset.yearn.address);

            [
              userVaultBalance,
              yearnPoolSymbol,
              yearnBalanceOf,
              poolYearnAllowance,
            ] = await Promise.all([
              yearnVaultContract.methods.balanceOf(account.address).call(),
              yearnVaultContract.methods.symbol().call(),
              yearnVaultContract.methods.balanceOf(account.address).call(),
              poolContract.methods.allowance(account.address, asset.yearn.address).call(),
            ]);
          }



          return {
            balanceOf,
            poolBalances,
            coin0,
            coin1,
            poolSymbol,
            virtualPrice,
            userPoolBalance,
            userVaultBalance,
            userGaugeBalance,
            userGaugeEarned,
            poolGaugeAllowance,
            gaugeVotes,
            userGaugeVotes,
            userRKP3REarned,
            price,
            convexEarned,
            convexBalanceOf,
            convexRewardCallsResponse,
            convexReductionPerCliff,
            convexTotalSupply,
            convexMaxSupply,
            convexTotalCliffs,
            curveInflationRate,
            curveWorkingSupply,
            curveGaugeWeight,
            curveTotalWeight,
            poolConvexAllowance,
            poolYearnAllowance,
            curveRewardData,
            yearnPoolSymbol,
          };
        }),
      );

      const totalUserVotes = assetsBalances.reduce((curr, acc) => {
        return BigNumber(curr).plus(acc.userGaugeVotes);
      }, 0);

      for (let i = 0; i < assets.length; i++) {
        let userVotePercent = "0";
        if (BigNumber(totalUserVotes).gt(0)) {
          userVotePercent = BigNumber(assetsBalances[i].userGaugeVotes).times(100).div(totalUserVotes).toFixed(assets[i].decimals);
        }

        assets[i].balance = BigNumber(assetsBalances[i].balanceOf)
          .div(10 ** assets[i].decimals)
          .toFixed(assets[i].decimals);
        assets[i].gauge.coin0 = assetsBalances[i].coin0;
        assets[i].gauge.coin1 = assetsBalances[i].coin1;
        assets[i].gauge.poolSymbol = assetsBalances[i].poolSymbol;
        assets[i].yearn.poolSymbol = assetsBalances[i].yearnPoolSymbol;
        assets[i].gauge.userPoolBalance = BigNumber(assetsBalances[i].userPoolBalance)
          .div(10 ** 18)
          .toFixed(18);
        assets[i].gauge.userGaugeBalance = BigNumber(assetsBalances[i].userGaugeBalance)
          .div(10 ** 18)
          .toFixed(18);
        assets[i].yearn.userVaultBalance = BigNumber(assetsBalances[i].userVaultBalance ? assetsBalances[i].userVaultBalance : 0)
          .div(10 ** 18)
          .toFixed(18);
        assets[i].gauge.earned = BigNumber(assetsBalances[i].userGaugeEarned)
          .div(10 ** 18)
          .toFixed(18);
        assets[i].gauge.virtualPrice = BigNumber(assetsBalances[i].virtualPrice)
          .div(10 ** 18)
          .toFixed(18);
        assets[i].gauge.poolGaugeAllowance = BigNumber(assetsBalances[i].poolGaugeAllowance)
          .div(10 ** 18)
          .toFixed(18);

        assets[i].gauge.userVotes = BigNumber(assetsBalances[i].userGaugeVotes)
          .div(10 ** assets[i].decimals)
          .toFixed(assets[i].decimals);
        assets[i].gauge.userVotePercent = userVotePercent;
        assets[i].gauge.votes = BigNumber(assetsBalances[i].gaugeVotes)
          .div(10 ** assets[i].decimals)
          .toFixed(assets[i].decimals);
        assets[i].gauge.votePercent = BigNumber(assetsBalances[i].gaugeVotes).times(100).div(totalGaugeVotes).toFixed(assets[i].decimals);

        assets[i].gauge.rKP3REarned = BigNumber(assetsBalances[i].userRKP3REarned)
          .div(10 ** 18)
          .toFixed(18);
        assets[i].price = BigNumber(assetsBalances[i].price)
          .div(10 ** (36 - assets[i].decimals))
          .toFixed(18);

        assets[i].convex.balance = BigNumber(assetsBalances[i].convexBalanceOf ? assetsBalances[i].convexBalanceOf : 0)
          .div(10 ** 18)
          .toFixed(18);
        assets[i].convex.earnedCRV = BigNumber(assetsBalances[i].convexEarned ? assetsBalances[i].convexEarned : 0)
          .div(10 ** 18)
          .toFixed(18); // this is crv

        const cliff = BigNumber(assetsBalances[i].convexTotalSupply).div(assetsBalances[i].convexReductionPerCliff).toFixed(18);
        const reduction = BigNumber(assetsBalances[i].convexTotalCliffs).minus(cliff).toFixed(18);

        assets[i].convex.earnedCVX = BigNumber(assetsBalances[i].convexEarned)
          .times(reduction)
          .div(assetsBalances[i].convexTotalCliffs)
          .div(10 ** 18)
          .toFixed(18); // this is crv
        assets[i].convex.earnedRKP3R = BigNumber(assetsBalances[i].convexRewardCallsResponse)
          .div(10 ** 18)
          .toFixed(18);
        assets[i].convex.poolGaugeAllowance = BigNumber(assetsBalances[i].poolConvexAllowance)
          .div(10 ** 18)
          .toFixed(18);
        assets[i].yearn.poolGaugeAllowance = BigNumber(assetsBalances[i].poolYearnAllowance)
          .div(10 ** 18)
          .toFixed(18);

        const crv = this.getStore("crv");
        const curvePrice = crv.price;
        assets[i].gauge.apyBase = BigNumber(
          this.calcPoolAPY(
            assetsBalances[i].curveGaugeWeight,
            assetsBalances[i].curveTotalWeight,
            assetsBalances[i].curveInflationRate,
            assetsBalances[i].curveWorkingSupply,
            assetsBalances[i].virtualPrice,
            assetsBalances[i].price,
            curvePrice,
          ),
        ).toFixed(18);
        assets[i].gauge.apyBoosted = BigNumber(assets[i].gauge.apyBase).times(2.5).toFixed(18);

        let poolMeta = curveFiBaseAPY.filter((pool) => {
          return pool.poolAddress === assets[i].gauge.poolAddress;
        });
        let vaultMeta = yearnNetworkAPY.filter((vault) => {
          return vault.address === assets[i].yearn.address;
        });
        assets[i].gauge.apy = BigNumber(poolMeta[0]?.apy).toFixed(18);
        assets[i].yearn.apy = (vaultMeta[0]?.apy?.net_apy * 100).toFixed(2);
        assets[i].gauge.rKP3RAPY = BigNumber(1).toFixed(18);
      }

      this.setStore({ assets });
      this.emitter.emit(FIXED_FOREX_UPDATED);
    } catch (ex) {
      console.log(ex);
    }
  };

  _getRewardInfo = async (web3, account) => {
    try {
      const ibEURClaimContract = new web3.eth.Contract(abis.curveFeeDistributionABI, FF_IBEUR_CLAIMABLE_ADDRESS);
      const kp3rClaimContract = new web3.eth.Contract(abis.curveFeeDistributionABI, FF_KP3R_CLAIMABLE_ADDRESS);
      const stakingRewardsV3Contract = new web3.eth.Contract(abis.stakingRewardsV3ABI, FF_STAKING_REWARDS_V3_ADDRESS);

      const [ibEURClaimable, kp3rClaimable] = await Promise.all([
        ibEURClaimContract.methods.claimable(account.address).call(),
        kp3rClaimContract.methods.claimable(account.address).call(),
      ]);

      // get different reward contract info
      let rewards = {};

      rewards.feeDistribution = {
        earned: BigNumber(ibEURClaimable).div(1e18).toFixed(18),
      };
      rewards.veIBFFDistribution = {
        earned: BigNumber(kp3rClaimable).div(1e18).toFixed(18),
      };

      this.setStore({ rewards });
      this.emitter.emit(FIXED_FOREX_UPDATED);
    } catch (ex) {
      console.log(ex);
    }
  };

  _getOldGaugeInfo = async (web3, account) => {
    try {
      const eurContract = new web3.eth.Contract(abis.gaugeABI, IBEUR_GAUGE_ADDRESS_OLD);
      const krwContract = new web3.eth.Contract(abis.gaugeABI, IBKRW_GAUGE_ADDRESS_OLD);
      const ibEURFaucetContract = new web3.eth.Contract(abis.gaugeABI, IBEUR_ETH_ADDRESS_OLD);

      const [eurBalance, krwBalance, ibEURBalance] = await Promise.all([
        eurContract.methods.balanceOf(account.address).call(),
        krwContract.methods.balanceOf(account.address).call(),
        ibEURFaucetContract.methods.balanceOf(account.address).call(),
      ]);

      this.setStore({
        oldAssets: [
          {
            type: "FF Gauge",
            imgAddress: IBEUR_ADDRESS,
            address: IBEUR_GAUGE_ADDRESS_OLD,
            symbol: "ibEUR+sEUR-f",
            balance: BigNumber(eurBalance)
              .div(10 ** 18)
              .toFixed(18),
          },
          {
            type: "FF Gauge",
            imgAddress: IBKRW_ADDRESS,
            address: IBKRW_GAUGE_ADDRESS_OLD,
            symbol: "ibKRW+sKRW-f",
            balance: BigNumber(krwBalance)
              .div(10 ** 18)
              .toFixed(18),
          },
          {
            type: "SLP Faucet",
            imgAddress: IBEUR_ADDRESS,
            address: IBEUR_ETH_ADDRESS_OLD,
            symbol: "ibEUR-ETH",
            balance: BigNumber(ibEURBalance)
              .div(10 ** 18)
              .toFixed(18),
          },
        ],
      });
      this.emitter.emit(FIXED_FOREX_UPDATED);
    } catch (ex) {
      console.log(ex);
    }
  };

  _getUniV3Info = async (web3, account) => {
    try {
      const uniswapNFTPositionsManagerContract = new web3.eth.Contract(abis.uniswapNFTPositionsManagerABI, FF_UNSIWAP_POSITIONS_MANAGER_ADDRESS)
      const balanceOf = await uniswapNFTPositionsManagerContract.methods.balanceOf(account.address).call()
      const arr = [...Array(parseInt(balanceOf)).keys()]

      const tokenIDs = await Promise.all(arr.map((idx) => {
        return uniswapNFTPositionsManagerContract.methods.tokenOfOwnerByIndex(account.address, idx).call()
      }));

      const tokenPositions = await Promise.all(tokenIDs.map((idx) => {
        return uniswapNFTPositionsManagerContract.methods.positions(idx).call()
      }))

      const validPositions = await Promise.all(tokenPositions.filter((pos, idx) => {
        const isActive = pos.token0 === '0x1cEB5cB57C4D4E2b2433641b95Dd330A33185A44' && pos.token1 === '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' && BigNumber(pos.liquidity).gt(0)
        pos.tokenID = tokenIDs[idx]
        return isActive
      }).map(async (pos) => {
        pos.address = "0x11B7a6bc0259ed6Cf9DB8F499988F9eCc7167bf5";
        pos.balance = BigNumber(pos.liquidity).div(10**18).toFixed(18)
        pos.feePercent = BigNumber(pos.fee).div(10000).toFixed(4)

        const approved = await uniswapNFTPositionsManagerContract.methods.getApproved(pos.tokenID).call()
        if(approved.toLowerCase() === FF_STAKING_REWARDS_V3_ADDRESS.toLowerCase()) {
          pos.stakingApproved = true
        } else {
          pos.stakingApproved = false
        }

            const prices = await this._getPoolPriceInfo(web3, account, pos);
            pos.prices = prices;

            return pos;
          }),
      );

      this.setStore({
        uniV3Positions: validPositions,
      });
      this.emitter.emit(FIXED_FOREX_UPDATED);
    } catch (ex) {
      console.log(ex);
    }
  };

  _getStakingV3Rewards = async (web3, account) => {
    try {
      const stakingRewardsAddress = new web3.eth.Contract(abis.stakingRewardsV3ABI, FF_STAKING_REWARDS_V3_ADDRESS);
      const uniswapNFTPositionsManagerContract = new web3.eth.Contract(abis.uniswapNFTPositionsManagerABI, FF_UNSIWAP_POSITIONS_MANAGER_ADDRESS);

      // const [ rewardPerLiquidity, getRewardForDuration, totalLiquidity ] = await Promise.all([
      //   stakingRewardsAddress.methods.rewardPerLiquidity().call(),
      //   stakingRewardsAddress.methods.getRewardForDuration().call(),
      //   stakingRewardsAddress.methods.totalLiquidity().call(),
      // ]);
      // const duration = 604800
      // const yearDuration = 31536000
      //
      // const totalRewardedAtCurrentRate = BigNumber(getRewardForDuration).div(duration).times(yearDuration)
      // const apr = BigNumber(totalRewardedAtCurrentRate).div(totalLiquidity).div(yearDuration).times(36500).toFixed(18)
      //
      // console.log(apr)

      const tokenIDs = await stakingRewardsAddress.methods.getTokenIds(account.address).call();

      const tokenPositions = await Promise.all(
        tokenIDs.map((idx) => {
          return uniswapNFTPositionsManagerContract.methods.positions(idx).call();
        }),
      );

      const earneds = await Promise.all(
        tokenIDs.map((idx) => {
          return stakingRewardsAddress.methods.earned(idx).call();
        }),
      );

      const stakingV3Positions = await Promise.all(
        tokenPositions.map(async (pos, idx) => {
          pos.tokenID = tokenIDs[idx];
          pos.address = "0x11B7a6bc0259ed6Cf9DB8F499988F9eCc7167bf5";
          pos.balance = BigNumber(pos.liquidity)
            .div(10 ** 18)
            .toFixed(18);
          pos.feePercent = BigNumber(pos.fee).div(10000).toFixed(4);
          pos.earned = BigNumber(earneds[idx].claimable)
            .div(10 ** 18)
            .toFixed(18);

          const prices = await this._getPoolPriceInfo(web3, account, pos);
          pos.prices = prices;
          return pos;
        }),
      );

      this.setStore({
        stakingV3Positions: stakingV3Positions,
      });

      this.emitter.emit(FIXED_FOREX_UPDATED);
    } catch (ex) {
      console.log(ex);
    }
  };

  _getPoolPriceInfo = async (web3, account, pos) => {
    const poolContract = new web3.eth.Contract(abis.uniswapV3PoolABI, pos.address);

    const [factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick] = await Promise.all([
      poolContract.methods.factory().call(),
      poolContract.methods.token0().call(),
      poolContract.methods.token1().call(),
      poolContract.methods.fee().call(),
      poolContract.methods.tickSpacing().call(),
      poolContract.methods.maxLiquidityPerTick().call(),
    ]);

    const [liquidity, slot] = await Promise.all([poolContract.methods.liquidity().call(), poolContract.methods.slot0().call()]);

    const TokenA = new Token(3, token0, 18, "KP3R", "Keep3rV1");
    const TokenB = new Token(3, token1, 18, "WETH", "Wrapped Ether");
    const poolExample = new Pool(TokenA, TokenB, parseInt(fee), slot[0].toString(), liquidity.toString(), parseInt(slot[1]));

    const r = tickToPrice(TokenA, TokenB, poolExample.tickCurrent);
    const l = tickToPrice(TokenA, TokenB, parseInt(pos.tickUpper));
    const h = tickToPrice(TokenA, TokenB, parseInt(pos.tickLower));

    const currentPrice = BigNumber(r.denominator).div(r.numerator).toFixed(18);
    const lowPrice = BigNumber(l.denominator).div(l.numerator).toFixed(18);
    const highPrice = BigNumber(h.denominator).div(h.numerator).toFixed(18);

    return {
      lowPrice,
      highPrice,
      currentPrice,
    };
  };

  _getSwapFromBalances = async (web3, account) => {
    try {
      const swapFromAssets = this.getStore('swapFromAssets')
      const assetsBalances = await Promise.all(swapFromAssets.map(async (asset) => {
        const assetContract = new web3.eth.Contract(abis.erc20ABI, asset.address)

        const [ balanceOf, allowance, allowanceV2 ] = await Promise.all([
          assetContract.methods.balanceOf(account.address).call(),
          assetContract.methods.allowance(account.address, FF_IBAMM_ADDRESS).call(),
          assetContract.methods.allowance(account.address, FF_IBAMM_V2_ADDRESS).call(),
        ]);

        return {
          balanceOf,
          allowance,
          allowanceV2,
        }
      }))

      for(let i = 0; i < assetsBalances.length; i++) {
        swapFromAssets[i].balance = BigNumber(assetsBalances[i].balanceOf).div(10**swapFromAssets[i].decimals).toFixed(swapFromAssets[i].decimals)
        swapFromAssets[i].allowance = BigNumber(assetsBalances[i].allowance).div(10**swapFromAssets[i].decimals).toFixed(swapFromAssets[i].decimals)
        swapFromAssets[i].allowanceV2 = BigNumber(assetsBalances[i].allowanceV2).div(10**swapFromAssets[i].decimals).toFixed(swapFromAssets[i].decimals)
      }

      this.setStore({
        swapFromAssets: swapFromAssets
      })

      this.emitter.emit(FIXED_FOREX_UPDATED);
    } catch(ex) {
      console.log(ex)
    }
  };

  _getBreaker = async (web3, account) => {
    try {
      const ibAMMContract = new web3.eth.Contract(abis.ibAMMABI, FF_IBAMM_ADDRESS);
      const breaker = await ibAMMContract.methods.breaker().call()
      this.setStore({
        breaker
      })

      this.emitter.emit(FIXED_FOREX_UPDATED);
    } catch(ex) {

    }
  }

  _getVestingInfo = async (web3, account, veIBFF) => {
    try {

      const veIBFFContract = new web3.eth.Contract(abis.veIBFFABI, FF_VEKP3R_ADDRESS)
      const lockedInfo = await veIBFFContract.methods.locked(account.address).call()
      const totalSupply = await veIBFFContract.methods.totalSupply().call()
      const balanceOf = await veIBFFContract.methods.balanceOf(account.address).call()

      console.log(balanceOf)

      // const fourYears = 126144000    // 60 * 60 * 24 * 365 * 4
      // const now = Math.floor(Date.now() / 1000)
      // const maxLock = BigNumber(now).plus(fourYears).toNumber()
      // const percentOfFourYearsLocked = 1-BigNumber(maxLock).minus(lockedInfo.end).div(fourYears).toFixed(veIBFF.decimals)
      const locked = BigNumber(lockedInfo.amount).div(10**veIBFF.decimals).toFixed(veIBFF.decimals)

      return {
        locked: locked,
        lockEnds: lockedInfo.end,
        lockValue: BigNumber(balanceOf).div(10**veIBFF.decimals).toFixed(veIBFF.decimals),
        votePower: BigNumber(balanceOf).div(10**veIBFF.decimals).toFixed(veIBFF.decimals),
        totalSupply: BigNumber(totalSupply).div(10**veIBFF.decimals).toFixed(veIBFF.decimals),
      }
    } catch(ex) {
      console.log(ex)
      return null
    }
  };

  _getVestingInfoOld = async (web3, account, veIBFF) => {
    try {
      const veIBFFContract = new web3.eth.Contract(abis.veIBFFABI, VEIBFF_ADDRESS);
      const lockedInfo = await veIBFFContract.methods.locked(account.address).call();

      return {
        locked: BigNumber(lockedInfo.amount)
          .div(10 ** veIBFF.decimals)
          .toFixed(veIBFF.decimals),
        lockEnds: lockedInfo.end,
        lockValue: BigNumber(lockedInfo.amount)
          .div(10 ** veIBFF.decimals)
          .toFixed(veIBFF.decimals),
      };
    } catch (ex) {
      console.log(ex);
      return null;
    }
  };

  _getApprovalAmount = async (web3, asset, owner, spender) => {
    const erc20Contract = new web3.eth.Contract(abis.erc20ABI, asset.address);
    const allowance = await erc20Contract.methods.allowance(owner, spender).call();

    return BigNumber(allowance)
      .div(10 ** asset.decimals)
      .toFixed(asset.decimals);
  };

  _getFaucetStakedAmount = async (web3, asset, owner) => {
    const faucetContract = new web3.eth.Contract(abis.faucetABI, FF_FAUCET_ADDRESS);
    const balanceOf = await faucetContract.methods.balanceOf(owner).call();

    return BigNumber(balanceOf)
      .div(10 ** asset.decimals)
      .toFixed(asset.decimals);
  };

  claimVestingReward = async (payload) => {
    const account = stores.accountStore.getStore("account");
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
  };

  _callClaimVestingReward = async (web3, account, gasSpeed, callback) => {
    try {
      const claimContract = new web3.eth.Contract(abis.curveFeeDistributionABI, FF_KP3R_CLAIMABLE_ADDRESS);
      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, claimContract, "claim", [], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  claimStakingReward = async (payload) => {
    const account = stores.accountStore.getStore("account");
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
  };

  _callClaimStakingReward = async (web3, account, gasSpeed, callback) => {
    try {
      const faucetContract = new web3.eth.Contract(abis.faucetABI, FF_FAUCET_ADDRESS);
      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, faucetContract, "getReward", [], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  claimDistributionReward = async (payload) => {
    const account = stores.accountStore.getStore("account");
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

    this._callClaimDistributionReward(web3, account, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_DISTRIBUTION_REWARD_CLAIMED, res);
    });
  };

  _callClaimDistributionReward = async (web3, account, gasSpeed, callback) => {
    try {
      const claimContract = new web3.eth.Contract(abis.curveFeeDistributionABI, FF_IBEUR_CLAIMABLE_ADDRESS);
      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, claimContract, "claim", [], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  claimCurveReward = async (payload) => {
    const account = stores.accountStore.getStore("account");
    if (!account) {
      return false;
      //maybe throw an error
    }

    const web3 = await stores.accountStore.getWeb3Provider();
    if (!web3) {
      return false;
      //maybe throw an error
    }

    const { gasSpeed, asset } = payload.content;

    this._callClaimCurveReward(web3, account, asset, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_CURVE_REWARD_CLAIMED, res);
    });
  };

  _callClaimCurveReward = async (web3, account, asset, gasSpeed, callback) => {
    try {
      const minterContract = new web3.eth.Contract(abis.tokenMinterABI, FF_CURVE_TOKEN_MINTER_ADDRESS);
      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, minterContract, "mint", [asset.gauge.address], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  claimCurveKP3RReward = async (payload) => {
    const account = stores.accountStore.getStore("account");
    if (!account) {
      return false;
      //maybe throw an error
    }

    const web3 = await stores.accountStore.getWeb3Provider();
    if (!web3) {
      return false;
      //maybe throw an error
    }

    const { gasSpeed, asset } = payload.content;

    this._callClaimCurveKP3RReward(web3, account, asset, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_STAKING_REWARD_CLAIMED, res);
    });
  };

  _callClaimCurveKP3RReward = async (web3, account, asset, gasSpeed, callback) => {
    try {
      const gaugeContract = new web3.eth.Contract(abis.gaugeABI, asset.gauge.address);
      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, gaugeContract, "claim_rewards", [], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  claimConvexReward = async (payload) => {
    const account = stores.accountStore.getStore("account");
    if (!account) {
      return false;
      //maybe throw an error
    }

    const web3 = await stores.accountStore.getWeb3Provider();
    if (!web3) {
      return false;
      //maybe throw an error
    }

    const { gasSpeed, asset } = payload.content;

    this._callClaimConvexReward(web3, account, asset, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_CONVEX_REWARD_CLAIMED, res);
    });
  };

  _callClaimConvexReward = async (web3, account, asset, gasSpeed, callback) => {
    try {
      const minterContract = new web3.eth.Contract(abis.convexBaseRewardPoolABI, asset.convex.address);
      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, minterContract, "getReward", [], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  stakeSLP = async (payload) => {
    const account = stores.accountStore.getStore("account");
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
  };

  _callDepositFaucet = async (web3, account, amount, gasSpeed, callback) => {
    try {
      let faucetContract = new web3.eth.Contract(abis.faucetABI, FF_FAUCET_ADDRESS);

      const sendAmount = BigNumber(amount === "" ? 0 : amount)
        .times(10 ** 18)
        .toFixed(0);

      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, faucetContract, "deposit", [sendAmount], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  approveStakeSLP = async (payload) => {
    const account = stores.accountStore.getStore("account");
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
  };

  _callApproveStakeSLP = async (web3, account, gasSpeed, callback) => {
    const slpContract = new web3.eth.Contract(abis.sushiLPABI, IBEUR_ETH_ADDRESS);
    const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);
    this._callContractWait(web3, slpContract, "approve", [FF_FAUCET_ADDRESS, MAX_UINT256], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
  };

  unstakeSLP = async (payload) => {
    const account = stores.accountStore.getStore("account");
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
  };

  _callWithdrawFaucet = async (web3, account, amount, gasSpeed, callback) => {
    try {
      let faucetContract = new web3.eth.Contract(abis.faucetABI, FF_FAUCET_ADDRESS);

      const sendAmount = BigNumber(amount === "" ? 0 : amount)
        .times(10 ** 18)
        .toFixed(0);

      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, faucetContract, "withdraw", [sendAmount], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  vest = async (payload) => {
    const account = stores.accountStore.getStore("account");
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
  };

  _callCreateLock = async (web3, account, amount, unlockTime, gasSpeed, callback) => {
    try {
      let veBIFFContract = new web3.eth.Contract(abis.veIBFFABI, FF_VEKP3R_ADDRESS);

      const sendAmount = BigNumber(amount === "" ? 0 : amount)
        .times(10 ** 18)
        .toFixed(0);

      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, veBIFFContract, "create_lock", [sendAmount, unlockTime], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  approveVest = async (payload) => {
    const account = stores.accountStore.getStore("account");
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
  };

  _callApproveVest = async (web3, account, gasSpeed, callback) => {
    const ibffContract = new web3.eth.Contract(abis.erc20ABI, FF_KP3R_ADDRESS);
    const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);
    this._callContractWait(web3, ibffContract, "approve", [FF_VEKP3R_ADDRESS, MAX_UINT256], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
  };

  vestAmount = async (payload) => {
    const account = stores.accountStore.getStore("account");
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
  };

  _callIncreaseAmount = async (web3, account, amount, gasSpeed, callback) => {
    try {
      let veBIFFContract = new web3.eth.Contract(abis.veIBFFABI, FF_VEKP3R_ADDRESS);

      const sendAmount = BigNumber(amount === "" ? 0 : amount)
        .times(10 ** 18)
        .toFixed(0);

      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, veBIFFContract, "increase_amount", [sendAmount], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  vestDuration = async (payload) => {
    const account = stores.accountStore.getStore("account");
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
  };

  _callIncreaseUnlockTime = async (web3, account, unlockTime, gasSpeed, callback) => {
    try {
      let veBIFFContract = new web3.eth.Contract(abis.veIBFFABI, FF_VEKP3R_ADDRESS);

      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, veBIFFContract, "increase_unlock_time", [unlockTime], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  withdrawLock = async (payload) => {
    const account = stores.accountStore.getStore("account");
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

    this._callWithdrawLock(web3, account, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_LOCK_WITHDRAWN, res);
    });
  };

  _callWithdrawLock = async (web3, account, gasSpeed, callback) => {
    try {
      let veBIFFContract = new web3.eth.Contract(abis.veIBFFABI, FF_VEKP3R_ADDRESS);
      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, veBIFFContract, "withdraw", [], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  vote = async (payload) => {
    const account = stores.accountStore.getStore("account");
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
  };

  _callVote = async (web3, account, votes, gasSpeed, callback) => {
    try {
      let gaugeProxyContract = new web3.eth.Contract(abis.gaugeProxyABI, GAUGE_PROXY_ADDRESS);

      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      let tokens = votes.map((v) => {
        return v.address;
      });

      let voteCounts = votes.map((v) => {
        return BigNumber(v.value).times(100).toFixed(0);
      });

      console.log(tokens);
      console.log(voteCounts);

      this._callContractWait(web3, gaugeProxyContract, "vote", [tokens, voteCounts], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  approveDepositCurve = async (payload) => {
    const account = stores.accountStore.getStore("account");
    if (!account) {
      return false;
      //maybe throw an error
    }

    const web3 = await stores.accountStore.getWeb3Provider();
    if (!web3) {
      return false;
      //maybe throw an error
    }

    const { asset, coin, gasSpeed } = payload.content;

    this._callApproveDepositCurve(web3, account, asset, coin, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_DEPOSIT_CURVE_APPROVED, res);
    });
  };

  _callApproveDepositCurve = async (web3, account, asset, coin, gasSpeed, callback) => {
    const erc20Contract = new web3.eth.Contract(abis.erc20ABI, coin.address);
    const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);
    this._callContractWait(web3, erc20Contract, "approve", [asset.gauge.poolAddress, MAX_UINT256], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
  };

  depositCurve = async (payload) => {
    const account = stores.accountStore.getStore("account");
    if (!account) {
      return false;
      //maybe throw an error
    }

    const web3 = await stores.accountStore.getWeb3Provider();
    if (!web3) {
      return false;
      //maybe throw an error
    }

    const { asset, amount0, amount1, gasSpeed } = payload.content;

    this._callAddLiquidity(web3, account, asset, amount0, amount1, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_CURVE_DEPOSITED, res);
    });
  };

  _callAddLiquidity = async (web3, account, asset, amount0, amount1, gasSpeed, callback) => {
    try {
      let poolContract = new web3.eth.Contract(abis.poolABI, asset.gauge.poolAddress);

      const sendAmount0 = BigNumber(amount0 === "" ? 0 : amount0)
        .times(10 ** asset.gauge.coin0.decimals)
        .toFixed(0);

      const sendAmount1 = BigNumber(amount1 === "" ? 0 : amount1)
        .times(10 ** asset.gauge.coin1.decimals)
        .toFixed(0);

      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);
      const tokenAmount = await poolContract.methods.calc_token_amount([sendAmount0, sendAmount1], true).call();

      this._callContractWait(
        web3,
        poolContract,
        "add_liquidity",
        [[sendAmount0, sendAmount1], BigNumber(tokenAmount).times(0.95).toFixed(0)],
        account,
        gasPrice,
        GET_FIXED_FOREX_BALANCES,
        callback,
      );
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  withdrawCurve = async (payload) => {
    const account = stores.accountStore.getStore("account");
    if (!account) {
      return false;
      //maybe throw an error
    }

    const web3 = await stores.accountStore.getWeb3Provider();
    if (!web3) {
      return false;
      //maybe throw an error
    }

    const { asset, withdrawAmount, withdrawAmount0, withdrawAmount1, gasSpeed } = payload.content;

    this._callRemoveLiquidity(web3, account, asset, withdrawAmount, withdrawAmount0, withdrawAmount1, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_CURVE_DEPOSITED, res);
    });
  };

  _callRemoveLiquidity = async (web3, account, asset, withdrawAmount, amount0, amount1, gasSpeed, callback) => {
    try {
      let poolContract = new web3.eth.Contract(abis.poolABI, asset.gauge.poolAddress);

      const sendWithdrawAmount = BigNumber(withdrawAmount === "" ? 0 : withdrawAmount)
        .times(10 ** 18) // TODO get decimals from coins
        .toFixed(0);

      const sendAmount0 = BigNumber(amount0 === "" ? 0 : amount0)
        .times(0.95)
        .times(10 ** 18) // TODO get decimals from coins
        .toFixed(0);

      const sendAmount1 = BigNumber(amount1 === "" ? 0 : amount1)
        .times(0.95)
        .times(10 ** 18) // TODO get decimals from coins
        .toFixed(0);

      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(
        web3,
        poolContract,
        "remove_liquidity",
        [sendWithdrawAmount, [sendAmount0, sendAmount1]],
        account,
        gasPrice,
        GET_FIXED_FOREX_BALANCES,
        callback,
      );
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  getSlippageInfo = async (payload) => {
    const account = stores.accountStore.getStore("account");
    if (!account) {
      return false;
      //maybe throw an error
    }

    const web3 = await stores.accountStore.getWeb3Provider();
    if (!web3) {
      return false;
      //maybe throw an error
    }

    const { asset, amount0, amount1 } = payload.content;

    const sendAmount0 = BigNumber(amount0 === "" ? 0 : amount0)
      .times(10 ** asset.gauge.coin0.decimals)
      .toFixed(0);

    const sendAmount1 = BigNumber(amount1 === "" ? 0 : amount1)
      .times(10 ** asset.gauge.coin1.decimals)
      .toFixed(0);

    const poolContract = new web3.eth.Contract(abis.poolABI, asset.gauge.poolAddress);

    const [receiveAmount, virtualPrice] = await Promise.all([
      poolContract.methods.calc_token_amount([sendAmount0, sendAmount1], true).call(),
      poolContract.methods.get_virtual_price().call(),
    ]);

    const rec = bnToFixed(receiveAmount, 18);
    let slippage;

    if (Number(rec)) {
      const virtualValue = BigNumber(virtualPrice)
        .times(rec)
        .div(10 ** 18)
        .toFixed(18);
      const realValue = sumArray([amount0, amount1]); // Assuming each component is at peg

      slippage = virtualValue / realValue - 1;
    }

    this.emitter.emit(FIXED_FOREX_SLIPPAGE_INFO_RETURNED, typeof slippage !== "undefined" ? slippage * 100 : slippage);
  };

  approveStakeCurve = async (payload) => {
    const account = stores.accountStore.getStore("account");
    if (!account) {
      return false;
      //maybe throw an error
    }

    const web3 = await stores.accountStore.getWeb3Provider();
    if (!web3) {
      return false;
      //maybe throw an error
    }

    const { asset, gasSpeed } = payload.content;

    this._callApproveStakeCurve(web3, account, asset, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_STAKE_CURVE_APPROVED, res);
    });
  };

  _callApproveStakeCurve = async (web3, account, asset, gasSpeed, callback) => {
    const erc20Contract = new web3.eth.Contract(abis.erc20ABI, asset.gauge.poolAddress);
    const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);
    this._callContractWait(web3, erc20Contract, "approve", [asset.gauge.address, MAX_UINT256], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
  };

  stakeCurve = async (payload) => {
    const account = stores.accountStore.getStore("account");
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

    this._callDepositGauge(web3, account, asset, amount, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_CURVE_STAKED, res);
    });
  };

  _callDepositGauge = async (web3, account, asset, amount, gasSpeed, callback) => {
    try {
      let gaugeContract = new web3.eth.Contract(abis.gaugeABI, asset.gauge.address);

      const sendAmount = BigNumber(amount === "" ? 0 : amount)
        .times(10 ** 18)
        .toFixed(0);

      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, gaugeContract, "deposit", [sendAmount], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  unstakeCurve = async (payload) => {
    const account = stores.accountStore.getStore("account");
    if (!account) {
      return false;
      //maybe throw an error
    }

    const web3 = await stores.accountStore.getWeb3Provider();
    if (!web3) {
      return false;
      //maybe throw an error
    }

    const { asset, withdrawAmount, gasSpeed } = payload.content;

    this._callWithdrawGauge(web3, account, asset, withdrawAmount, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_CURVE_UNSTAKED, res);
    });
  };

  _callWithdrawGauge = async (web3, account, asset, withdrawAmount, gasSpeed, callback) => {
    try {
      let gaugeContract = new web3.eth.Contract(abis.gaugeABI, asset.gauge.address);

      const sendWithdrawAmount = BigNumber(withdrawAmount === "" ? 0 : withdrawAmount)
        .times(10 ** 18)
        .toFixed(0);

      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, gaugeContract, "withdraw", [sendWithdrawAmount], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  approveStakeYearn = async (payload) => {
    const account = stores.accountStore.getStore("account");
    if (!account) {
      return false;
      //maybe throw an error
    }

    const web3 = await stores.accountStore.getWeb3Provider();
    if (!web3) {
      return false;
      //maybe throw an error
    }

    const { asset, gasSpeed } = payload.content;

    this._callApproveStakeYearn(web3, account, asset, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_STAKE_YEARN_APPROVED, res);
    });
  };

  _callApproveStakeYearn = async (web3, account, asset, gasSpeed, callback) => {
    const erc20Contract = new web3.eth.Contract(abis.erc20ABI, asset.gauge.poolAddress);
    const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);
    this._callContractWait(web3, erc20Contract, "approve", [asset.yearn.address, MAX_UINT256], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
  };

  stakeYearn = async (payload) => {
    const account = stores.accountStore.getStore("account");
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

    this._callDepositYearn(web3, account, asset, amount, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_YEARN_STAKED, res);
    });
  };

  _callDepositYearn = async (web3, account, asset, amount, gasSpeed, callback) => {
    try {
      let gaugeContract = new web3.eth.Contract(abis.yearnVaultABI, asset.yearn.address);

      const sendAmount = BigNumber(amount === "" ? 0 : amount)
        .times(10 ** 18)
        .toFixed(0);

      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, gaugeContract, "deposit", [sendAmount], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  unstakeYearn = async (payload) => {
    const account = stores.accountStore.getStore("account");
    if (!account) {
      return false;
      //maybe throw an error
    }

    const web3 = await stores.accountStore.getWeb3Provider();
    if (!web3) {
      return false;
      //maybe throw an error
    }

    const { asset, withdrawAmount, gasSpeed } = payload.content;

    this._callWithdrawYearn(web3, account, asset, withdrawAmount, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_YEARN_UNSTAKED, res);
    });
  };

  _callWithdrawYearn = async (web3, account, asset, withdrawAmount, gasSpeed, callback) => {
    try {
      let gaugeContract = new web3.eth.Contract(abis.yearnVaultABI, asset.yearn.address);

      const sendWithdrawAmount = BigNumber(withdrawAmount === "" ? 0 : withdrawAmount)
        .times(10 ** 18)
        .toFixed(0);

      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, gaugeContract, "withdraw", [sendWithdrawAmount], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  approveStakeConvex = async (payload) => {
    const account = stores.accountStore.getStore("account");
    if (!account) {
      return false;
      //maybe throw an error
    }

    const web3 = await stores.accountStore.getWeb3Provider();
    if (!web3) {
      return false;
      //maybe throw an error
    }

    const { asset, gasSpeed } = payload.content;

    this._callApproveStakeConvex(web3, account, asset, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_STAKE_CURVE_APPROVED, res);
    });
  };

  _callApproveStakeConvex = async (web3, account, asset, gasSpeed, callback) => {
    const erc20Contract = new web3.eth.Contract(abis.erc20ABI, asset.gauge.poolAddress);
    const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);
    this._callContractWait(
      web3,
      erc20Contract,
      "approve",
      [FF_CONVEX_POOL_MANAGEMENT_ADDRESS, MAX_UINT256],
      account,
      gasPrice,
      GET_FIXED_FOREX_BALANCES,
      callback,
    );
  };

  stakeConvex = async (payload) => {
    const account = stores.accountStore.getStore("account");
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

    this._callDepositGaugeConvex(web3, account, asset, amount, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_CURVE_STAKED, res);
    });
  };

  _callDepositGaugeConvex = async (web3, account, asset, amount, gasSpeed, callback) => {
    try {
      let gaugeContract = new web3.eth.Contract(abis.convexBoosterABI, FF_CONVEX_POOL_MANAGEMENT_ADDRESS);

      const sendAmount = BigNumber(amount === "" ? 0 : amount)
        .times(10 ** 18)
        .toFixed(0);

      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, gaugeContract, "deposit", [asset.convex.pid, sendAmount, true], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  unstakeConvex = async (payload) => {
    const account = stores.accountStore.getStore("account");
    if (!account) {
      return false;
      //maybe throw an error
    }

    const web3 = await stores.accountStore.getWeb3Provider();
    if (!web3) {
      return false;
      //maybe throw an error
    }

    const { asset, withdrawAmount, gasSpeed } = payload.content;

    this._callWithdrawGaugeConvex(web3, account, asset, withdrawAmount, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_CURVE_UNSTAKED, res);
    });
  };

  _callWithdrawGaugeConvex = async (web3, account, asset, withdrawAmount, gasSpeed, callback) => {
    try {
      let gaugeContract = new web3.eth.Contract(abis.convexBaseRewardPoolABI, asset.convex.address);

      const sendWithdrawAmount = BigNumber(withdrawAmount === "" ? 0 : withdrawAmount)
        .times(10 ** 18)
        .toFixed(0);

      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, gaugeContract, "withdrawAndUnwrap", [sendWithdrawAmount, true], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  claimVeclaim = async (payload) => {
    const account = stores.accountStore.getStore("account");
    if (!account) {
      return false;
      //maybe throw an error
    }

    const web3 = await stores.accountStore.getWeb3Provider();
    if (!web3) {
      return false;
      //maybe throw an error
    }

    const veIBFFOld = await this.getStore("veIBFFOld");
    if (!veIBFFOld) {
      return false;
      //maybe throw an error
    }

    const veIBFF = await this.getStore("veIBFF");
    if (!veIBFF) {
      return false;
      //maybe throw an error
    }

    const ibff = await this.getStore("ibff");
    if (!ibff) {
      return false;
      //maybe throw an error
    }

    const { gasSpeed } = payload.content;

    if (BigNumber(veIBFFOld.vestingInfo.lockEnds).eq(0) || BigNumber(veIBFFOld.vestingInfo.lockValue).eq(0)) {
      return this.emitter.emit(ERROR, "No locked veIBFF or veIBFF lock has expired");
    }

    this._callApproveClaimVeClaim(web3, account, veIBFFOld, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      //check if a lock has already been created
      if (BigNumber(veIBFF.vestingInfo.lockValue).gt(0) && BigNumber(veIBFF.vestingInfo.lockEnds).gt(0)) {
        this._callClaimVeClaim(web3, account, gasSpeed, (err, res) => {
          if (err) {
            return this.emitter.emit(ERROR, err);
          }

          return this.emitter.emit(FIXED_FOREX_VECLAIM_CLAIMED, res);
        });
      } else {
        let lockValue = "1";
        if (BigNumber(ibff.balance).lt(1)) {
          lockValue = ibff.balance;
        }

        this._callCreateLock(web3, account, lockValue, veIBFFOld.vestingInfo.lockEnds, gasSpeed, (err, res) => {
          if (err) {
            return this.emitter.emit(ERROR, err);
          }

          this._callClaimVeClaim(web3, account, gasSpeed, (err, res) => {
            if (err) {
              return this.emitter.emit(ERROR, err);
            }

            return this.emitter.emit(FIXED_FOREX_VECLAIM_CLAIMED, res);
          });
        });
      }
    });
  };

  _callApproveClaimVeClaim = async (web3, account, veIBFFOld, gasSpeed, callback) => {
    const kp3rContract = new web3.eth.Contract(abis.erc20ABI, FF_KP3R_ADDRESS);
    const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

    const approvalAmount = await this._getApprovalAmount(
      web3,
      {
        address: FF_KP3R_ADDRESS,
        decimals: 18,
      },
      account.address,
      FF_VEKP3R_ADDRESS,
    );

    if (BigNumber(approvalAmount).lt(veIBFFOld.vestingInfo.lockValue)) {
      this._callContractWait(web3, kp3rContract, "approve", [FF_VEKP3R_ADDRESS, MAX_UINT256], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } else {
      callback();
    }
  };

  _callClaimVeClaim = async (web3, account, gasSpeed, callback) => {
    try {
      let veClaimContract = new web3.eth.Contract(abis.veClaimABI, FF_VECLAIM_ADDRESS);
      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, veClaimContract, "claim", [], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  claimAll = async (payload) => {
    try {
      const account = stores.accountStore.getStore("account");
      if (!account) {
        return false;
        //maybe throw an error
      }

      const web3 = await stores.accountStore.getWeb3Provider();
      if (!web3) {
        return false;
        //maybe throw an error
      }

      const { claimable, gasSpeed } = payload.content;

      const claimableGauges = claimable.filter((gauge) => {
        return gauge.type === "Curve Gauge Rewards"; //&& BigNumber(gauge.earned).gt(0)
      });

      const claimableRKP3RGauges = claimable.filter((gauge) => {
        return gauge.type === "Curve Gauge Rewards"; //&& BigNumber(gauge.rKP3REarned).gt(0)
      });

      const claimableFeeClaim = claimable.filter((gauge) => {
        return gauge.type === "Fixed Forex" && gauge.description === "Fee Claim";
      });

      const claimableVestingReward = claimable.filter((gauge) => {
        return gauge.type === "Fixed Forex" && gauge.description === "Vesting Rewards";
      });

      const claimableRKP3RReward = claimable.filter((gauge) => {
        return gauge.type === "Fixed Forex" && gauge.description === "Redeemable KP3R";
      });

      const promises = [];

      if (claimableGauges.length > 0) {
        const r = new Promise((resolve, reject) => {
          this._callMintMany(web3, account, claimableGauges, gasSpeed, (err, res) => {
            if (err) {
              reject(err);
            }
            resolve(res);
          });
        });
        promises.push(r);
      }

      if (claimableFeeClaim.length > 0) {
        const re = new Promise((resolve, reject) => {
          this._callClaimDistributionReward(web3, account, gasSpeed, (err, res) => {
            if (err) {
              reject(err);
            }
            resolve(res);
          });
        });
        promises.push(re);
      }

      if (claimableVestingReward.length > 0) {
        const ret = new Promise((resolve, reject) => {
          this._callClaimVestingReward(web3, account, gasSpeed, (err, res) => {
            if (err) {
              reject(err);
            }
            resolve(res);
          });
        });
        promises.push(ret);
      }

      if (claimableRKP3RReward.length > 0) {
        const retu = new Promise((resolve, reject) => {
          this._callClaimRKP3R(web3, account, gasSpeed, (err, res) => {
            if (err) {
              reject(err);
            }
            resolve(res);
          });
        });
        promises.push(retu);
      }

      const result = await Promise.all(promises);
      this.dispatcher.dispatch({ type: GET_FIXED_FOREX_BALANCES });

      this.emitter.emit(FIXED_FOREX_ALL_CLAIMED);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  _callMintMany = async (web3, account, gauges, gasSpeed, callback) => {
    try {
      const minterContract = new web3.eth.Contract(abis.tokenMinterABI, FF_CURVE_TOKEN_MINTER_ADDRESS);
      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      const gaugesArray = gauges.map((gauge) => {
        return gauge.gauge.gauge.address;
      });

      //fill with zero address I guess?
      while (gaugesArray.length < 8) {
        gaugesArray.push(ZERO_ADDRESS);
      }

      console.log(gaugesArray);

      this._callContractWait(web3, minterContract, "mint_many", [gaugesArray], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  claimRKP3R = async (payload) => {
    const account = stores.accountStore.getStore("account");
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

    this._callClaimRKP3R(web3, account, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_RKP3R_CLAIMED, res);
    });
  };

  _callClaimRKP3R = async (web3, account, gasSpeed, callback) => {
    try {
      const claimContract = new web3.eth.Contract(abis.rKP3RABI, FF_RKP3R_ADDRESS);
      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, claimContract, "claim", [], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback, true);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  redeemOption = async (payload) => {
    const account = stores.accountStore.getStore("account");
    if (!account) {
      return false;
      //maybe throw an error
    }

    const web3 = await stores.accountStore.getWeb3Provider();
    if (!web3) {
      return false;
      //maybe throw an error
    }

    const { option, gasSpeed } = payload.content;

    this._callRedeemOption(web3, account, option, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_OPTION_REDEEMED, res);
    });
  };

  _callRedeemOption = async (web3, account, option, gasSpeed, callback) => {
    try {
      const claimContract = new web3.eth.Contract(abis.rKP3RABI, FF_RKP3R_ADDRESS);
      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, claimContract, "redeem", [option.id], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  approveRedeemOption = async (payload) => {
    const account = stores.accountStore.getStore("account");
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

    this._callApproveRedeemOption(web3, account, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_REDEEM_OPTION_APPROVED, res);
    });
  };

  _callApproveRedeemOption = async (web3, account, gasSpeed, callback) => {
    const usdcContract = new web3.eth.Contract(abis.erc20ABI, USDC_ADDRESS);
    const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);
    this._callContractWait(web3, usdcContract, "approve", [FF_RKP3R_ADDRESS, MAX_UINT256], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
  };

  withdrawOld = async (payload) => {
    const account = stores.accountStore.getStore("account");
    if (!account) {
      return false;
      //maybe throw an error
    }

    const web3 = await stores.accountStore.getWeb3Provider();
    if (!web3) {
      return false;
      //maybe throw an error
    }

    const { asset, gasSpeed } = payload.content;

    if (asset.type === "FF Gauge") {
      this._callExitGauge(web3, account, asset, gasSpeed, (err, res) => {
        if (err) {
          return this.emitter.emit(ERROR, err);
        }

        return this.emitter.emit(FIXED_FOREX_OLD_WITHDRAWN, res);
      });
    } else {
      this._callWithdrawFaucet(web3, account, asset.balance, gasSpeed, (err, res) => {
        if (err) {
          return this.emitter.emit(ERROR, err);
        }

        return this.emitter.emit(FIXED_FOREX_OLD_WITHDRAWN, res);
      });
    }
  };

  _callExitGauge = async (web3, account, asset, gasSpeed, callback) => {
    try {
      let gaugeContract = new web3.eth.Contract(abis.oldGaugeABI, asset.address);
      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, gaugeContract, "withdraw", [], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  approveDepositUni = async (payload) => {
    const account = stores.accountStore.getStore("account");
    if (!account) {
      return false;
      //maybe throw an error
    }

    const web3 = await stores.accountStore.getWeb3Provider();
    if (!web3) {
      return false;
      //maybe throw an error
    }

    const { tokenID, gasSpeed } = payload.content;

    this._callApproveDepositUni(web3, account, tokenID, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_UNI_DEPOSITED, res);
    });
  };

  _callApproveDepositUni = async (web3, account, tokenID, gasSpeed, callback) => {
    try {
      let uniswapNFTPositionsManagerContract = new web3.eth.Contract(abis.uniswapNFTPositionsManagerABI, FF_UNSIWAP_POSITIONS_MANAGER_ADDRESS);
      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(
        web3,
        uniswapNFTPositionsManagerContract,
        "approve",
        [FF_STAKING_REWARDS_V3_ADDRESS, tokenID],
        account,
        gasPrice,
        GET_FIXED_FOREX_BALANCES,
        callback,
      );
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  depositUni = async (payload) => {
    const account = stores.accountStore.getStore("account");
    if (!account) {
      return false;
      //maybe throw an error
    }

    const web3 = await stores.accountStore.getWeb3Provider();
    if (!web3) {
      return false;
      //maybe throw an error
    }

    const { tokenID, gasSpeed } = payload.content;

    this._callDepositUni(web3, account, tokenID, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_UNI_DEPOSITED, res);
    });
  };

  _callDepositUni = async (web3, account, tokenID, gasSpeed, callback) => {
    try {
      let stakingContract = new web3.eth.Contract(abis.stakingRewardsV3ABI, FF_STAKING_REWARDS_V3_ADDRESS);
      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, stakingContract, "deposit", [tokenID], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  withdrawUni = async (payload) => {
    const account = stores.accountStore.getStore("account");
    if (!account) {
      return false;
      //maybe throw an error
    }

    const web3 = await stores.accountStore.getWeb3Provider();
    if (!web3) {
      return false;
      //maybe throw an error
    }

    const { tokenID, gasSpeed } = payload.content;

    this._callWithdrawUni(web3, account, tokenID, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_UNI_WITHDRAWN, res);
    });
  };

  _callWithdrawUni = async (web3, account, tokenID, gasSpeed, callback) => {
    try {
      let stakingContract = new web3.eth.Contract(abis.stakingRewardsV3ABI, FF_STAKING_REWARDS_V3_ADDRESS);
      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, stakingContract, "withdraw", [tokenID], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  getUniRewards = async (payload) => {
    const account = stores.accountStore.getStore("account");
    if (!account) {
      return false;
      //maybe throw an error
    }

    const web3 = await stores.accountStore.getWeb3Provider();
    if (!web3) {
      return false;
      //maybe throw an error
    }

    const { tokenID, gasSpeed } = payload.content;

    this._callGetRewards(web3, account, tokenID, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_UNI_REWARDS_RETURNED, res);
    });
  };

  _callGetRewards = async (web3, account, tokenID, gasSpeed, callback) => {
    try {
      let stakingContract = new web3.eth.Contract(abis.stakingRewardsV3ABI, FF_STAKING_REWARDS_V3_ADDRESS);
      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, stakingContract, "getReward", [tokenID], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  getAllUniRewards = async (payload) => {
    const account = stores.accountStore.getStore("account");
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

    this._callGetAllRewards(web3, account, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_ALL_UNI_REWARDS_RETURNED, res);
    });
  };

  _callGetAllRewards = async (web3, account, gasSpeed, callback) => {
    try {
      let stakingContract = new web3.eth.Contract(abis.stakingRewardsV3ABI, FF_STAKING_REWARDS_V3_ADDRESS);
      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      this._callContractWait(web3, stakingContract, "getRewards", [], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  quoteSwap = async (payload) => {
    const web3 = await stores.accountStore.getWeb3Provider();
    if (!web3) {
      return false;
      //maybe throw an error
    }

    const { fromAsset, toAsset, amount, gasSpeed } = payload.content;

    try {
      const sendAmount = BigNumber(amount === '' ? 0 : amount)
        .times(10 ** 18)
        .toFixed(0);

      let ibAMMContract = null
      let quoteRes = null

      if(fromAsset.symbol === 'sUSD' || fromAsset.symbol === 'ibEUR') {
        ibAMMContract = new web3.eth.Contract(abis.ibAMMV2ABI, FF_IBAMM_V2_ADDRESS);
        if(fromAsset.symbol === 'sUSD') {
          quoteRes = await ibAMMContract.methods.quote_out(sendAmount).call()
        } else {
          quoteRes = await ibAMMContract.methods.quote_in(sendAmount).call()
        }
      } else {
        ibAMMContract = new web3.eth.Contract(abis.ibAMMABI, FF_IBAMM_ADDRESS);
        quoteRes = await ibAMMContract.methods.quote(toAsset.address, sendAmount).call()
      }

      const returnValue = BigNumber(quoteRes).div(10**toAsset.decimals).toFixed(toAsset.decimals)

      const retVal = {
        toAsset: toAsset,
        fromAmount: amount,
        toAmount: returnValue
      }

      return this.emitter.emit(FIXED_FOREX_QUOTE_SWAP_RETURNED, retVal);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  }

  approveSwap = async (payload) => {
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

    const { fromAsset, gasSpeed } = payload.content;

    this._callApproveSwap(web3, account, fromAsset, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_SWAP_APPROVED, res);
    });
  }

  _callApproveSwap = async (web3, account, asset, gasSpeed, callback) => {
    const erc20Contract = new web3.eth.Contract(abis.erc20ABI, asset.address);
    const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

    let contract = FF_IBAMM_ADDRESS
    if(asset.symbol === 'sUSD' || asset.symbol === 'ibEUR') {
      contract = FF_IBAMM_V2_ADDRESS
    }

    this._callContractWait(web3, erc20Contract, 'approve', [contract, MAX_UINT256], account, gasPrice, GET_FIXED_FOREX_BALANCES, callback);
  };

  swap = async(payload) => {
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

    const { fromAsset, toAsset, fromAmount, toAmount, gasSpeed } = payload.content;

    this._callSwap(web3, account, fromAsset, toAsset, fromAmount, toAmount, gasSpeed, (err, res) => {
      if (err) {
        return this.emitter.emit(ERROR, err);
      }

      return this.emitter.emit(FIXED_FOREX_SWAP_RETURNED, res);
    });
  }

  _callSwap = async (web3, account, fromAsset, toAsset, fromAmount, toAmount, gasSpeed, callback) => {
    try {
      const gasPrice = await stores.accountStore.getGasPrice(gasSpeed);

      const sendAmount = BigNumber(fromAmount === '' ? 0 : fromAmount)
        .times(10 ** 18)
        .toFixed(0);
      const minOut = BigNumber(toAmount).times(10 ** 18).times(0.97).toFixed(0)

      let ibAMMContract = null
      let call = ''
      let params = []

      if(fromAsset.symbol === 'sUSD' || fromAsset.symbol === 'ibEUR') {
        ibAMMContract = new web3.eth.Contract(abis.ibAMMV2ABI, FF_IBAMM_V2_ADDRESS);
        if(fromAsset.symbol === 'sUSD') {
          call = 'swap_out'
        } else {
          call = 'swap_in'
        }
        params = [sendAmount, minOut]
      } else {
        ibAMMContract = new web3.eth.Contract(abis.ibAMMABI, FF_IBAMM_ADDRESS);
        call = 'swap'
        params = [toAsset.address, sendAmount, minOut]
      }

      this._callContractWait(web3, ibAMMContract, call, params, account, gasPrice, GET_FIXED_FOREX_BALANCES, callback, true);
    } catch (ex) {
      console.log(ex);
      return this.emitter.emit(ERROR, ex);
    }
  };

  _callContractWait = (web3, contract, method, params, account, gasPrice, dispatchEvent, callback, paddGasCost) => {
    //estimate gas
    const gasCost = contract.methods[method](...params)
      .estimateGas({ from: account.address })
      .then((gasAmount) => {
        const context = this;

        let sendGasAmount = gasAmount;
        if (paddGasCost) {
          sendGasAmount = BigNumber(sendGasAmount).times(1.3).toFixed(0);
        }

        contract.methods[method](...params)
          .send({
            from: account.address,
            // gasPrice: web3.utils.toWei(gasPrice, 'gwei'),
            gas: sendGasAmount,
            maxFeePerGas: web3.utils.toWei(gasPrice, "gwei"),
            maxPriorityFeePerGas: web3.utils.toWei("2", "gwei"),
          })
          .on("transactionHash", function (hash) {
            context.emitter.emit(TX_SUBMITTED, hash);
          })
          .on("receipt", function (receipt) {
            callback(null, receipt.transactionHash);
            if (dispatchEvent) {
              context.dispatcher.dispatch({ type: dispatchEvent, content: {} });
            }
          })
          .on("error", function (error) {
            if (!error.toString().includes("-32601")) {
              if (error.message) {
                return callback(error.message);
              }
              callback(error);
            }
          })
          .catch((error) => {
            if (!error.toString().includes("-32601")) {
              if (error.message) {
                return callback(error.message);
              }
              callback(error);
            }
          });
      })
      .catch((ex) => {
        callback(ex);
      });
  };
}

export default Store;
