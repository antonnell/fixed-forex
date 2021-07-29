import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField, InputAdornment, CircularProgress, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import BigNumber from 'bignumber.js';
import Skeleton from '@material-ui/lab/Skeleton';
import moment from 'moment';
import { formatCurrency } from '../../utils';
import classes from './ffStake.module.css';
import stores from '../../stores'
import { FIXED_FOREX_UPDATED, IBEUR_ADDRESS } from '../../stores/constants';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

export default function ffStake() {

  const [ ibEURSLP, setIBEURSLP] = useState(null)

  const [ amount, setAmount ] = useState('');
  const [ amountError, setAmountError ] = useState(false);

  useEffect(() => {
    const forexUpdated = () => {
      const asset = stores.fixedForexStore.getAsset(IBEUR_ADDRESS)
      setIBEURSLP(asset)
    }

    const asset = stores.fixedForexStore.getAsset(IBEUR_ADDRESS)
    setIBEURSLP(asset)

    stores.emitter.on(FIXED_FOREX_UPDATED, forexUpdated);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, forexUpdated);
    };
  }, []);

  const onAmountChanged = (newVal) => {
    setAmount(newVal)
  }

  const setAmountPercent = (percent) => {
    setAmount(BigNumber(ibEURSLP.balance).times(percent).div(100).toFixed(ibEURSLP.decimals));
  }

  return (
    <Paper elevation={0} className={ classes.container }>
      <div className={ classes.inputsContainer }>

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
                  <img src={ ibEURSLP && ibEURSLP.address ? `https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/${ibEURSLP.address}/logo-128.png` : '/tokens/unknown-logo.png'} alt="" width={30} height={30} />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={ classes.infoContainer }>
          <div className={ classes.infoField }>
            <AttachMoneyIcon className={ classes.infoIcon } />
            <div className={ classes.infoTexts }>
              <Typography className={ classes.infoText }>Estimated Weekly Rewards:</Typography>
              <Typography >123.32 ibEUR</Typography>
            </div>
          </div>
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
          <Typography className={ classes.actionButtonText }>Stake</Typography>
        </Button>
      </div>
    </Paper>
  );
}
