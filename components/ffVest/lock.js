import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField, InputAdornment, CircularProgress, RadioGroup, Radio, FormControlLabel, Tooltip } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import moment from 'moment';
import { formatCurrency } from '../../utils';
import classes from './ffVest.module.css';

import stores from '../../stores'
import {
  ERROR,
  FIXED_FOREX_APPROVE_VEST,
  FIXED_FOREX_VEST_APPROVED,
  FIXED_FOREX_VEST,
  FIXED_FOREX_VESTED
} from '../../stores/constants';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

export default function ffLock({ ibff, veIBFF, veIBFFOld }) {

  const [ approvalLoading, setApprovalLoading ] = useState(false)
  const [ lockLoading, setLockLoading ] = useState(false)

  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState(false);
  const [selectedValue, setSelectedValue] = useState('week');
  const [selectedDate, setSelectedDate] = useState(moment().add(7, 'days').format('YYYY-MM-DD'));
  const [selectedDateError, setSelectedDateError] = useState(false);

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
    stores.emitter.on(FIXED_FOREX_VESTED, lockReturned);
    return () => {
      stores.emitter.removeListener(ERROR, errorReturned);
      stores.emitter.removeListener(FIXED_FOREX_VEST_APPROVED, approveReturned);
      stores.emitter.removeListener(FIXED_FOREX_VESTED, lockReturned);
    };
  }, []);

  const setAmountPercent = (percent) => {
    setAmount(BigNumber(ibff.balance).times(percent).div(100).toFixed(ibff.decimals));
  }

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setSelectedValue(null);
  }

  const handleChange = (event) => {
    setSelectedValue(event.target.value);

    let days = 0;
    switch (event.target.value) {
      case 'week':
        days = 7;
        break;
      case 'month':
        days = 30;
        break;
      case 'year':
        days = 365;
        break;
      case 'years':
        days = 1461;
        break;
      default:
    }
    const newDate = moment().add(days, 'days').format('YYYY-MM-DD');

    setSelectedDate(newDate);
  }

  const onApprove = () => {
    setApprovalLoading(true)
    stores.dispatcher.dispatch({ type: FIXED_FOREX_APPROVE_VEST, content: { amount } })
  }

  const onLock = () => {
    setLockLoading(true)

    const selectedDateUnix = moment(selectedDate).unix()
    stores.dispatcher.dispatch({ type: FIXED_FOREX_VEST, content: { amount, unlockTime: selectedDateUnix } })
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

  let min = 0
  if(BigNumber(veIBFFOld?.vestingInfo?.lockEnds).gt(0)) {
    min = moment.unix(veIBFFOld?.vestingInfo?.lockEnds).format('YYYY-MM-DD')
  } else {
    min = moment().add(7, 'days').format('YYYY-MM-DD')
  }

  return (
    <>
    <Typography variant="h5" className={classes.title2}>Vest KP3R to Earn Rewards</Typography>
    <Paper elevation={0} className={ classes.container2 }>
      <div className={ classes.inputsContainer }>
        <div className={classes.textField}>
          <div className={classes.inputTitleContainer}>
            <div className={classes.inputTitle}>
              <Typography variant="h5" className={ classes.inputTitleText }>
                Vest Amount:
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
                  <img src={ ibff && ibff.address ? `https://assets.coingecko.com/coins/images/12966/large/kp3r_logo.jpg` : '/tokens/unknown-logo.png'} alt="" width={30} height={30} />
                </InputAdornment>
              ),
            }}
          />
          <Typography className={classes.helpText} variant="body2">How many kp3r tokens you will be locking up.</Typography>
        </div>

        <div className={classes.textField}>
          <div className={classes.inputTitleContainer}>
            <div className={classes.inputTitle}>
              <Typography variant="h5" className={ classes.inputTitleText }>
                Vest Expires:
              </Typography>
              <Tooltip title="How long you will be locking the tokens up for. Anywhere from 1 week to 4 years. The more tokens you lock and the longer you lock them for, the more rewards you will receive." placement="top">
              <div className={classes.helpSmallIcon}>?</div>
              </Tooltip>
            </div>
          </div>
          <TextField
            fullWidth
            id="date"
            type="date"
            variant="outlined"
            className={classes.textField}
            onChange={handleDateChange}
            value={selectedDate}
            error={selectedDateError}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: min,
              max: moment().add(1461, 'days').format('YYYY-MM-DD')
            }}
          />
          <RadioGroup className={classes.vestPeriodToggle} row aria-label="position" name="position" onChange={handleChange} value={selectedValue}>
            <FormControlLabel value="week" control={<Radio color="primary" />} label="1 week" labelPlacement="left" />
            <FormControlLabel value="month" control={<Radio color="primary" />} label="1 month" labelPlacement="left" />
            <FormControlLabel value="year" control={<Radio color="primary" />} label="1 year" labelPlacement="left" />
            <FormControlLabel value="years" control={<Radio color="primary" />} label="4 years" labelPlacement="left" />
          </RadioGroup>
        </div>
      </div>
      <div className={ classes.actionsContainer }>
        <Button
          className={classes.buttonStretch}
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
          className={classes.buttonStretch}
          variant='contained'
          size='large'
          color='primary'
          disabled={ lockLoading || !depositApprovalNotRequired }
          onClick={ onLock }
          >
          <Typography className={ classes.actionButtonText }>{ lockLoading ? `Locking` : `Lock` }</Typography>
          { lockLoading && <CircularProgress size={10} className={ classes.loadingCircle } /> }
        </Button>
      </div>
    </Paper><br /><br />
    </>
  );
}
