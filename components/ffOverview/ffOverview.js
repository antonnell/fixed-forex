import React, { useState, useEffect } from 'react';
import { Paper, Grid, Typography, Button, TextField, InputAdornment, CircularProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Skeleton from '@material-ui/lab/Skeleton';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TimerIcon from '@material-ui/icons/Timer';

import { formatCurrency } from '../../utils';
import classes from './ffOverview.module.css';

import stores from '../../stores'
import { FIXED_FOREX_UPDATED } from '../../stores/constants';

export default function ffOverview() {

  const [ ibff, setIBFF] = useState(null)
  const [ veIBFF, setVeIBFF] = useState(null)
  const [ rewards, setRewards] = useState(null)

  useEffect(() => {
    const forexUpdated = () => {
      setIBFF(stores.fixedForexStore.getStore('ibff'))
      setVeIBFF(stores.fixedForexStore.getStore('veIBFF'))
      setRewards(stores.fixedForexStore.getStore('rewards'))
    }

    setIBFF(stores.fixedForexStore.getStore('ibff'))
    setVeIBFF(stores.fixedForexStore.getStore('veIBFF'))
    setRewards(stores.fixedForexStore.getStore('rewards'))

    stores.emitter.on(FIXED_FOREX_UPDATED, forexUpdated);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, forexUpdated);
    };
  }, []);

  return (
    <div className={ classes.container }>
      <div className={ classes.fieldsContainer }>
        <Grid container spacing={3}>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <div className={ classes.field }>
              <AccountBalanceWalletIcon className={ classes.balanceIcon } />
              <div>
                <Typography className={ classes.title }>KP3R Balance:</Typography>
                <div className={ classes.inline }>
                  <Typography className={ classes.value }>{ formatCurrency(ibff ? ibff.balance : 0) }</Typography>
                  <Typography className={ classes.valueSymbol }>{ ibff ? ibff.symbol : '' }</Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <div className={ classes.field }>
              <TimerIcon className={ classes.balanceIcon } />
              <div>
                <Typography className={ classes.title }>Vested Balance:</Typography>
                <div className={ classes.inline }>
                  <Typography className={ classes.value }>{ formatCurrency((veIBFF && veIBFF.vestingInfo) ? veIBFF.vestingInfo.lockValue : 0) }</Typography>
                  <Typography className={ classes.valueSymbol }>{ veIBFF ? veIBFF.symbol : '' }</Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <div className={ classes.field }>
              <AttachMoneyIcon className={ classes.balanceIcon } />
              <div>
                <Typography className={ classes.title }>Rewards Available:</Typography>
                <div className={ classes.inline }>
                  <Typography className={ classes.value }>{ formatCurrency(rewards ? rewards.faucet.faucet : 0) }</Typography>
                  <Typography className={ classes.valueSymbol }>{ ibff ? ibff.symbol : '' }</Typography>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
