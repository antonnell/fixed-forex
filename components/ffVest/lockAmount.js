import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField, InputAdornment, CircularProgress } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import moment from 'moment';
import { formatCurrency } from '../../utils';
import classes from './ffVest.module.css';
import stores from '../../stores'
import {
  ERROR,
  FIXED_FOREX_APPROVE_VEST,
  FIXED_FOREX_VEST_APPROVED,
  FIXED_FOREX_VEST_AMOUNT,
  FIXED_FOREX_AMOUNT_VESTED
} from '../../stores/constants';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

export default function ffLockAmount({ ibff, veIBFF }) {

  const [ approvalLoading, setApprovalLoading ] = useState(false)
  const [ lockLoading, setLockLoading ] = useState(false)

  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState(false);

  useEffect(() => {
    const lockReturned = () => {
      setLockLoading(false)
    }
    const approveReturned = () => {
      setApprovalLoading(false)
    }
    const errorReturned = () => {
      setApprovalLoading(false)
      setLockLoading(false)
    }

    stores.emitter.on(ERROR, errorReturned);
    stores.emitter.on(FIXED_FOREX_VEST_APPROVED, approveReturned);
    stores.emitter.on(FIXED_FOREX_AMOUNT_VESTED, lockReturned);
    return () => {
      stores.emitter.removeListener(ERROR, errorReturned);
      stores.emitter.removeListener(FIXED_FOREX_VEST_APPROVED, approveReturned);
      stores.emitter.removeListener(FIXED_FOREX_AMOUNT_VESTED, lockReturned);
    };
  }, []);

  const setAmountPercent = (percent) => {
    setAmount(BigNumber(ibff.balance).times(percent).div(100).toFixed(ibff.decimals));
  }

  const onApprove = () => {
    setApprovalLoading(true)
    stores.dispatcher.dispatch({ type: FIXED_FOREX_APPROVE_VEST, content: { amount } })
  }

  const onLock = () => {
    setLockLoading(true)
    stores.dispatcher.dispatch({ type: FIXED_FOREX_VEST_AMOUNT, content: { amount } })
  }

  const formatApproved = (am) => {
    if(BigNumber(am).gte(1000000000000000)) {
      return 'Approved Forever'
    }

    return `Approved ${formatCurrency(am)}`
  }

  let depositApprovalNotRequired = false
  if(ibff) {
    depositApprovalNotRequired = BigNumber(ibff.vestAllowance).gte(amount) || ((!amount || amount === '') && BigNumber(ibff.vestAllowance).gt(0) )
  }

  return (
    <>
      <div className={ classes.inputsContainer2 }>
        <div className={classes.textField}>
          <div className={classes.inputTitleContainer}>
            <div className={classes.inputTitle}>
              <Typography variant="h5" className={ classes.inputTitleText }>
                Vest Amount
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
                Balance: {formatCurrency(ibff ? ibff.balance : 0)}
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
                  <img src={ ibff && ibff.address ? `https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/${ibff.address}/logo-128.png` : '/tokens/unknown-logo.png'} alt="" width={30} height={30} />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      <div className={ classes.actionsContainer }>
        <Button
          variant='contained'
          size='large'
          color='primary'
          disabled={ depositApprovalNotRequired || approvalLoading }
          onClick={ onApprove }
          >
          <Typography className={ classes.actionButtonText }>{ depositApprovalNotRequired ? formatApproved(ibff.vestAllowance) : (approvalLoading ? `Approving` : `Approve Transaction`)} </Typography>
          { approvalLoading && <CircularProgress size={10} className={ classes.loadingCircle } /> }
        </Button>
        <Button
          variant='contained'
          size='large'
          color='primary'
          disabled={ lockLoading }
          onClick={ onLock }
          >
          <Typography className={ classes.actionButtonText }>{ lockLoading ? `Increasing Lock` : `Increase Lock` }</Typography>
          { lockLoading && <CircularProgress size={10} className={ classes.loadingCircle } /> }
        </Button>
      </div>
    </>
  );
}

/*
<div className={ classes.infoContainer }>
  <div className={ classes.infoField }>
    <AttachMoneyIcon className={ classes.infoIcon } />
    <div className={ classes.infoTexts }>
      <Typography className={ classes.infoText }>Received veIBFF:</Typography>
      <Typography >0.00 veIBFF</Typography>
    </div>
  </div>
</div>
*/
