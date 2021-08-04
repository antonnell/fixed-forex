import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField, InputAdornment, CircularProgress, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import BigNumber from 'bignumber.js';
import Skeleton from '@material-ui/lab/Skeleton';
import moment from 'moment';
import { formatCurrency } from '../../utils';
import classes from './ffCurveGauge.module.css';
import stores from '../../stores'
import {
  ERROR,
  FIXED_FOREX_UPDATED,
  MAX_UINT256,
  FIXED_FOREX_APPROVE_STAKE_SLP,
  FIXED_FOREX_STAKE_SLP_APPROVED,
  FIXED_FOREX_STAKE_SLP,
  FIXED_FOREX_SLP_STAKED,
  FIXED_FOREX_UNSTAKE_SLP,
  FIXED_FOREX_SLP_UNSTAKED
} from '../../stores/constants';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

export default function ffCurveGauge() {

  const [ approvalLoading, setApprovalLoading ] = useState(false)
  const [ stakeLoading, setStakeLoading ] = useState(false)

  const [ ibEURSLP, setIBEURSLP] = useState(null)
  const [ rewards, setRewards ] = useState(null)

  const [ amount, setAmount ] = useState('');
  const [ amountError, setAmountError ] = useState(false);

  const [ withdrawAmount, setWithdrawAmount ] = useState('');
  const [ withdrawAmountError, setWithdrawAmountError ] = useState(false);

  const [ activeTab, setActiveTab ] = useState('deposit')

  useEffect(() => {
    const forexUpdated = () => {
      setIBEURSLP(stores.fixedForexStore.getStore('veEURETHSLP'))
      setRewards(stores.fixedForexStore.getStore('rewards'))
    }

    const approveReturned = () => {
      setApprovalLoading(false)
    }

    const stakeReturned = () => {
      setStakeLoading(false)
    }

    const errorReturned = () => {
      setStakeLoading(false)
      setApprovalLoading(false)
    }

    setIBEURSLP(stores.fixedForexStore.getStore('veEURETHSLP'))
    setRewards(stores.fixedForexStore.getStore('rewards'))

    stores.emitter.on(FIXED_FOREX_UPDATED, forexUpdated);
    stores.emitter.on(FIXED_FOREX_STAKE_SLP_APPROVED, approveReturned);
    stores.emitter.on(FIXED_FOREX_SLP_STAKED, stakeReturned);
    stores.emitter.on(FIXED_FOREX_SLP_UNSTAKED, stakeReturned);
    stores.emitter.on(ERROR, errorReturned);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, forexUpdated);
      stores.emitter.removeListener(FIXED_FOREX_STAKE_SLP_APPROVED, approveReturned);
      stores.emitter.removeListener(FIXED_FOREX_SLP_STAKED, stakeReturned);
      stores.emitter.removeListener(FIXED_FOREX_SLP_UNSTAKED, stakeReturned);
      stores.emitter.removeListener(ERROR, errorReturned);
    };
  }, []);

  const onAmountChanged = (newVal) => {
    if(activeTab === 'deposit') {
      setAmount(newVal)
    } else {
      setWithdrawAmount(newVal)
    }
  }

  const setAmountPercent = (percent) => {
    if(activeTab === 'deposit') {
      setAmount(BigNumber(ibEURSLP.balance).times(percent).div(100).toFixed(ibEURSLP.decimals));
    } else {
      setWithdrawAmount(BigNumber(rewards.balance).times(percent).div(100).toFixed(ibEURSLP.decimals));
    }
  }

  const onApprove = () => {
    setApprovalLoading(true)
    stores.dispatcher.dispatch({ type: FIXED_FOREX_APPROVE_STAKE_SLP, content: { amount } })
  }

  const onStake = () => {
    setStakeLoading(true)
    stores.dispatcher.dispatch({ type: FIXED_FOREX_STAKE_SLP, content: { amount } })
  }

  const onUnstake = () => {
    setStakeLoading(true)
    stores.dispatcher.dispatch({ type: FIXED_FOREX_UNSTAKE_SLP, content: { amount } })
  }

  const toggleDeposit = () => {
    setActiveTab('deposit')
  }

  const toggleWithdraw = () => {
    setActiveTab('withdraw')
  }

  const formatApproved = (am) => {
    if(BigNumber(am).gte(1000000000000000)) {
      return 'Approved Forever'
    }

    return `Approved ${formatCurrency(am)}`
  }

  let depositApprovalNotRequired = false
  if(ibEURSLP) {
    depositApprovalNotRequired = BigNumber(ibEURSLP.faucetAllowance).gte(amount) || ((!amount || amount === '') && BigNumber(ibEURSLP.faucetAllowance).gt(0) )
  }

  const calcEstimatedRewards = () => {
    let am = 0
    let rew = 0
    if(activeTab === 'deposit') {
      am = BigNumber(rewards.balance).plus(amount ? amount : 0)
      rew = BigNumber(rewards.faucetSupply).plus(amount ? amount : 0)
    } else {
      am = BigNumber(rewards.balance).minus(withdrawAmount ? withdrawAmount : 0)
      rew = BigNumber(rewards.faucetSupply).minus(withdrawAmount ? withdrawAmount : 0)
    }

    let estimatedReward = BigNumber(am).times(rewards.totalRewards).div(rew)

    if(BigNumber(estimatedReward).lte(0)) {
      return '0.00'
    } else {
      return formatCurrency(estimatedReward)
    }

  }

  return (
    <Paper elevation={0} className={ classes.container }>
      <div className={classes.toggleButtons}>
        <Button className={ `${activeTab === 'deposit' ? classes.buttonActive : classes.button} ${ classes.topLeftButton }` } onClick={ toggleDeposit } disabled={ stakeLoading || approvalLoading }>
          <Typography variant='h5'>Stake</Typography>
          <div className={ `${activeTab === 'deposit' ? classes.activeIcon : ''}` }></div>
        </Button>
        <Button className={ `${activeTab === 'withdraw' ? classes.buttonActive : classes.button}  ${ classes.bottomLeftButton }` } onClick={ toggleWithdraw } disabled={ stakeLoading || approvalLoading }>
          <Typography variant='h5'>Unstake</Typography>
          <div className={ `${activeTab === 'withdraw' ? classes.activeIcon : ''}` }></div>
        </Button>
      </div>
      <div className={ classes.reAddPadding }>
        <div className={ classes.inputsContainer }>
          {
            activeTab === 'deposit' &&
            <div className={classes.textField}>
              <div className={classes.inputTitleContainer}>
                <div className={classes.inputTitle}>
                  <Typography variant="h5" className={ classes.inputTitleText }>
                    Stake Amount:
                  </Typography>
                </div>
                <div className={classes.balances}>
                  <Typography
                    variant="h5"
                    onClick={() => {
                      setAmountPercent(100);
                    }}
                    className={classes.value}
                    noWrap
                  >
                    Balance: {formatCurrency(ibEURSLP ? ibEURSLP.balance : 0)}
                  </Typography>
                </div>
              </div>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="0.00"
                value={amount}
                error={amountError}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={ `images/Sushi.png` } alt="" width={30} height={30} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          }
          {
            activeTab === 'withdraw' &&
            <div className={classes.textField}>
              <div className={classes.inputTitleContainer}>
                <div className={classes.inputTitle}>
                  <Typography variant="h5" className={ classes.inputTitleText }>
                    Withdraw Amount:
                  </Typography>
                </div>
                <div className={classes.balances}>
                  <Typography
                    variant="h5"
                    onClick={() => {
                      setAmountPercent(100);
                    }}
                    className={classes.value}
                    noWrap
                  >
                    Balance: {formatCurrency(rewards ? rewards.balance : 0)}
                  </Typography>
                </div>
              </div>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="0.00"
                value={withdrawAmount}
                error={withdrawAmountError}
                onChange={(e) => {
                  setWithdrawAmount(e.target.value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={ `images/Sushi.png` } alt="" width={30} height={30} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          }
          <div className={ classes.infoContainer }>
            <div className={ classes.infoField }>
              <AttachMoneyIcon className={ classes.infoIcon } />
              <div className={ classes.infoTexts }>
                <Typography className={ classes.infoText }>Estimated Weekly Rewards:</Typography>
                <Typography >{
                  rewards && rewards.faucetSupply && rewards.totalRewards &&
                  calcEstimatedRewards()
                } ibff</Typography>
              </div>
            </div>
          </div>
        </div>
        {
          activeTab === 'deposit' &&
          <div className={ classes.actionsContainer }>
            <Button
              variant='contained'
              size='large'
              color='primary'
              disabled={ depositApprovalNotRequired || approvalLoading }
              onClick={ onApprove }
              >
              <Typography className={ classes.actionButtonText }>{ depositApprovalNotRequired ? formatApproved(ibEURSLP.faucetAllowance) : (approvalLoading ? `Approving` : `Approve Transaction`)} </Typography>
              { approvalLoading && <CircularProgress size={10} className={ classes.loadingCircle } /> }
            </Button>
            <Button
              variant='contained'
              size='large'
              color='primary'
              disabled={ stakeLoading }
              onClick={ onStake }
              >
              <Typography className={ classes.actionButtonText }>{ stakeLoading ? `Staking` : `Stake` }</Typography>
              { stakeLoading && <CircularProgress size={10} className={ classes.loadingCircle } /> }
            </Button>
          </div>
        }
        {
          activeTab === 'withdraw' &&
          <div className={ classes.actionsContainer }>
            <Button
              variant='contained'
              size='large'
              color='primary'
              disabled={ stakeLoading }
              onClick={ onUnstake }
              >
              <Typography className={ classes.actionButtonText }>{ stakeLoading ? `Unstaking` : `Unstake` }</Typography>
              { stakeLoading && <CircularProgress size={10} className={ classes.loadingCircle } /> }
            </Button>
          </div>
        }
      </div>
    </Paper>
  );
}
