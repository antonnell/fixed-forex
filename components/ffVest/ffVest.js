import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField, InputAdornment, CircularProgress, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import BigNumber from 'bignumber.js';
import Skeleton from '@material-ui/lab/Skeleton';
import moment from 'moment';
import { formatCurrency } from '../../utils';
import classes from './ffVest.module.css';
import stores from '../../stores'
import { FIXED_FOREX_UPDATED } from '../../stores/constants';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

export default function ffVest() {

  const [ ibff, setIBFF] = useState(null)
  const [ veIBFF, setVeIBFF] = useState(null)

  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDateError, setSelectedDateError] = useState(false);
  const [selectedValue, setSelectedValue] = useState('week');

  useEffect(() => {
    const forexUpdated = () => {
      setIBFF(stores.fixedForexStore.getStore('ibff'))
      setVeIBFF(stores.fixedForexStore.getStore('veIBFF'))
    }

    setIBFF(stores.fixedForexStore.getStore('ibff'))
    setVeIBFF(stores.fixedForexStore.getStore('veIBFF'))

    stores.emitter.on(FIXED_FOREX_UPDATED, forexUpdated);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, forexUpdated);
    };
  }, []);

  const onAmountChanged = (type, newVal) => {
    switch (type) {
      case 'from':
        setFromAmount(newVal)
        break;
      case 'to':
        setToAmount(newVal)
        break;
      default:

    }
  }

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

  return (
    <Paper elevation={0} className={ classes.container }>
      <div className={ classes.inputsContainer }>

        <div className={classes.textField}>
          <div className={classes.inputTitleContainer}>
            <div className={classes.inputTitle}>
              <Typography variant="h5" className={ classes.inputTitleText }>
                Lock Amount
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

        <div className={classes.textField}>
          <div className={classes.inputTitleContainer}>
            <div className={classes.inputTitle}>
              <Typography variant="h5" className={ classes.inputTitleText }>
                Lock for
              </Typography>
            </div>
          </div>
          <RadioGroup row aria-label="position" name="position" onChange={handleChange} value={selectedValue}>
            <FormControlLabel value="week" control={<Radio color="primary" />} label="1 week" labelPlacement="bottom" />
            <FormControlLabel value="month" control={<Radio color="primary" />} label="1 month" labelPlacement="bottom" />
            <FormControlLabel value="year" control={<Radio color="primary" />} label="1 year" labelPlacement="bottom" />
            <FormControlLabel value="years" control={<Radio color="primary" />} label="4 years" labelPlacement="bottom" />
          </RadioGroup>
        </div>
        <div className={ classes.infoContainer }>
          <div className={ classes.infoField }>
            <AttachMoneyIcon className={ classes.infoIcon } />
            <div className={ classes.infoTexts }>
              <Typography className={ classes.infoText }>Estimated Receive Amount:</Typography>
              <Typography >123.32 veIBFF</Typography>
            </div>
          </div>
        </div>
        <div className={classes.textField}>
          <div className={classes.inputTitleContainer}>
            <div className={classes.inputTitle}>
              <Typography variant="h5" className={ classes.inputTitleText }>
                Lock expires
              </Typography>
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
          />
        </div>

      </div>
      <div className={ classes.actionsContainer }>
        <Button
          variant='contained'
          size='large'
          color='primary'
          >
          <Typography className={ classes.actionButtonText }>Approve Transaction</Typography>
        </Button>
        <Button
          variant='contained'
          size='large'
          color='primary'
          >
          <Typography className={ classes.actionButtonText }>Lock</Typography>
        </Button>
      </div>
    </Paper>
  );
}
