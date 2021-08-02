import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField, InputAdornment, CircularProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Skeleton from '@material-ui/lab/Skeleton';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TimerIcon from '@material-ui/icons/Timer';

import { formatCurrency } from '../../utils';
import classes from './ffStakeOverview.module.css';

import stores from '../../stores'
import { FIXED_FOREX_UPDATED } from '../../stores/constants';

export default function ffStakeOverview() {

  const [ ibEURSLP, setIBEURSLP] = useState(null)
  const [ rewards, setRewards] = useState(null)

  useEffect(() => {
    const forexUpdated = () => {

      console.log(stores.fixedForexStore.getStore('veEURETHSLP'))

      setIBEURSLP(stores.fixedForexStore.getStore('veEURETHSLP'))
      setRewards(stores.fixedForexStore.getStore('rewards'))
    }

    setIBEURSLP(stores.fixedForexStore.getStore('veEURETHSLP'))
    setRewards(stores.fixedForexStore.getStore('rewards'))

    stores.emitter.on(FIXED_FOREX_UPDATED, forexUpdated);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, forexUpdated);
    };
  }, []);

  return (
    <div className={ classes.container }>
      <div className={ classes.fieldsContainer }>
        <div className={ classes.field }>
          <AccountBalanceWalletIcon className={ classes.balanceIcon } />
          <div>
            <Typography className={ classes.title }>SLP Balance:</Typography>
            <div className={ classes.inline }>
              <Typography className={ classes.value }>{ formatCurrency(ibEURSLP ? ibEURSLP.balance : 0) }</Typography>
              <Typography className={ classes.valueSymbol }>{ ibEURSLP ? ibEURSLP.symbol : '' }</Typography>
            </div>
          </div>
        </div>
        <div className={ classes.field }>
          <TimerIcon className={ classes.balanceIcon } />
          <div>
            <Typography className={ classes.title }>Staked Balance:</Typography>
            <div className={ classes.inline }>
              <Typography className={ classes.value }>{ formatCurrency(ibEURSLP ? ibEURSLP.faucetBalance : 0) }</Typography>
              <Typography className={ classes.valueSymbol }>{ ibEURSLP ? ibEURSLP.symbol : '' }</Typography>
            </div>
          </div>
        </div>
        <div className={ classes.field }>
          <AttachMoneyIcon className={ classes.balanceIcon } />
          <div>
            <Typography className={ classes.title }>Rewards Available:</Typography>
            <div className={ classes.inline }>
              <Typography className={ classes.value }>{ formatCurrency(rewards ? rewards.earned : 0) }</Typography>
              <Typography className={ classes.valueSymbol }>ibff</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
