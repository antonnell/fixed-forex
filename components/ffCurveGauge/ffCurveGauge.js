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
  FIXED_FOREX_APPROVE_STAKE_CURVE,
  FIXED_FOREX_STAKE_CURVE_APPROVED,
  FIXED_FOREX_STAKE_CURVE,
  FIXED_FOREX_CURVE_STAKED,
  FIXED_FOREX_UNSTAKE_CURVE,
  FIXED_FOREX_CURVE_UNSTAKED
} from '../../stores/constants';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

export default function ffCurveGauge({ asset }) {

  const [ approvalLoading, setApprovalLoading ] = useState(false)
  const [ depositLoading, setDepositLoading ] = useState(false)

  const [ amount, setAmount ] = useState('');
  const [ amountError, setAmountError ] = useState(false);

  const [ withdrawAmount, setWithdrawAmount ] = useState('');
  const [ withdrawAmountError, setWithdrawAmountError ] = useState(false);

  const [ activeTab, setActiveTab ] = useState('deposit')

  useEffect(() => {
    const approveReturned = () => {
      setApprovalLoading(false)
    }

    const depositReturned = () => {
      setDepositLoading(false)
    }

    const errorReturned = () => {
      setDepositLoading(false)
      setApprovalLoading(false)
    }

    stores.emitter.on(FIXED_FOREX_STAKE_CURVE_APPROVED, approveReturned);
    stores.emitter.on(FIXED_FOREX_CURVE_STAKED, depositReturned);
    stores.emitter.on(FIXED_FOREX_CURVE_UNSTAKED, depositReturned);
    stores.emitter.on(ERROR, errorReturned);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_STAKE_CURVE_APPROVED, approveReturned);
      stores.emitter.removeListener(FIXED_FOREX_CURVE_STAKED, depositReturned);
      stores.emitter.removeListener(FIXED_FOREX_CURVE_UNSTAKED, depositReturned);
      stores.emitter.removeListener(ERROR, errorReturned);
    };
  }, []);

  const setAmountPercent = (input, percent) => {
    if(input === 'amount') {
      setAmount(BigNumber(asset.gauge.userPoolBalance).times(percent).div(100).toFixed(18));
    } else if (input === 'withdrawAmount') {
      setWithdrawAmount(BigNumber(asset.gauge.userGaugeBalance).times(percent).div(100).toFixed(18));
    }
  }

  const onApprove = () => {
    setApprovalLoading(true)

    stores.dispatcher.dispatch({ type: FIXED_FOREX_APPROVE_STAKE_CURVE, content: { asset, amount } })
  }

  const onDeposit = () => {
    setDepositLoading(true)
    stores.dispatcher.dispatch({ type: FIXED_FOREX_STAKE_CURVE, content: { asset, amount } })
  }

  const onWithdraw = () => {
    setDepositLoading(true)
    stores.dispatcher.dispatch({ type: FIXED_FOREX_UNSTAKE_CURVE, content: { asset, withdrawAmount } })
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
  if(asset && asset.gauge) {
    depositApprovalNotRequired = BigNumber(asset.gauge.poolGaugeAllowance).gte(amount) || ((!amount || amount === '') && BigNumber(asset.gauge.poolGaugeAllowance).gt(0) )
  }

  return (
    <div className={ classes.container}>
      <Typography variant="h5" className={ classes.title}>Stake in Gauge</Typography>
      <Paper elevation={0} className={ classes.lpOptionsContainer }>
        <div className={classes.toggleButtons}>
          <Button className={ `${activeTab === 'deposit' ? classes.buttonActive : classes.button} ${ classes.topLeftButton }` } onClick={ toggleDeposit } disabled={ depositLoading || approvalLoading }>
            <Typography variant='h5'>Stake</Typography>
            <div className={ `${activeTab === 'deposit' ? classes.activeIcon : ''}` }></div>
          </Button>
          <Button className={ `${activeTab === 'withdraw' ? classes.buttonActive : classes.button}  ${ classes.bottomLeftButton }` } onClick={ toggleWithdraw } disabled={ depositLoading || approvalLoading }>
            <Typography variant='h5'>Unstake</Typography>
            <div className={ `${activeTab === 'withdraw' ? classes.activeIcon : ''}` }></div>
          </Button>
        </div>
        <div className={ classes.reAddPadding }>
          <div className={ classes.inputsContainer }>
            {
              activeTab === 'deposit' &&
              <>
                <div className={classes.textField}>
                  <div className={classes.inputTitleContainer}>
                    <div className={classes.inputTitle}>
                      <Typography variant="h5" className={ classes.inputTitleText }>
                        Stake Amounts:
                      </Typography>
                    </div>
                    <div className={classes.balances}>
                      <Typography
                        variant="h5"
                        onClick={() => {
                          setAmountPercent('amount', 100);
                        }}
                        className={classes.value}
                        noWrap
                      >
                        Balance: {formatCurrency(asset && asset.gauge ? asset.gauge.userPoolBalance : 0)}
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
                          <img src={ `/tokens/unknown-logo.png` } alt="" width={30} height={30} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography>{asset?.gauge?.poolSymbol}</Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className={classes.textField}>
                  <div className={classes.inputTitle}>
                    <Typography variant="h5" className={ classes.inputTitleText }>
                      Some info:
                    </Typography>
                  </div>
                  <div className={classes.inputTitle}>
                    <Typography variant="h5" className={ classes.inputTitleText }>
                      Weekly rewards:
                    </Typography>
                  </div>
                  <div className={classes.inputTitle}>
                    <Typography variant="h5" className={ classes.inputTitleText }>
                      I don't know - What do you want to see here?:
                    </Typography>
                  </div>
                </div>
              </>
            }
            {
              activeTab === 'withdraw' &&
              <>
                <div className={classes.textField}>
                  <div className={classes.inputTitleContainer}>
                    <div className={classes.inputTitle}>
                      <Typography variant="h5" className={ classes.inputTitleText }>
                        Unstake Amount:
                      </Typography>
                    </div>
                    <div className={classes.balances}>
                      <Typography
                        variant="h5"
                        onClick={() => {
                          setAmountPercent('withdrawAmount', 100);
                        }}
                        className={classes.value}
                        noWrap
                      >
                        Balance: {formatCurrency(asset?.gauge?.userGaugeBalance)}
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
                          <img src={ `/tokens/unknown-logo.png` } alt="" width={30} height={30} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography>{asset?.gauge?.poolSymbol}</Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </>
            }
          </div>
          {
            activeTab === 'deposit' &&
            <div className={ classes.actionsContainer }>
              <Button
                className={ classes.multiApprovalButton }
                variant='contained'
                size='large'
                color='primary'
                disabled={ depositApprovalNotRequired || approvalLoading }
                onClick={ () => { onApprove() } }
                >
                <Typography className={ classes.actionButtonText }>{ depositApprovalNotRequired ? formatApproved(asset?.gauge?.poolGaugeAllowance) : (approvalLoading ? `Approving` : `Approve`)}</Typography>
                { approvalLoading && <CircularProgress size={10} className={ classes.loadingCircle } /> }
              </Button>
              <Button
                variant='contained'
                size='large'
                color='primary'
                disabled={ depositLoading || !depositApprovalNotRequired }
                onClick={ onDeposit }
                >
                <Typography className={ classes.actionButtonText }>{ depositLoading ? `Depositing` : `Deposit` }</Typography>
                { depositLoading && <CircularProgress size={10} className={ classes.loadingCircle } /> }
              </Button>
            </div>
          }
          {
            activeTab === 'withdraw' &&
            <div className={ classes.actionsContainerWithdraw }>
              <Button
                variant='contained'
                size='large'
                color='primary'
                disabled={ depositLoading }
                onClick={ onWithdraw }
                >
                <Typography className={ classes.actionButtonText }>{ depositLoading ? `Withdrawing` : `Withdraw` }</Typography>
                { depositLoading && <CircularProgress size={10} className={ classes.loadingCircle } /> }
              </Button>
            </div>
          }
        </div>
      </Paper>
    </div>
  );
}
