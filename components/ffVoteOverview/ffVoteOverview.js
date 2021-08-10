import React, { useState, useEffect } from 'react';
import { Paper, Grid, Typography, Button, TextField, InputAdornment, CircularProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Skeleton from '@material-ui/lab/Skeleton';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TimerIcon from '@material-ui/icons/Timer';
import BigNumber from 'bignumber.js';

import { formatCurrency } from '../../utils';
import classes from './ffVoteOverview.module.css';

import stores from '../../stores'
import { FIXED_FOREX_UPDATED } from '../../stores/constants';

import GaugeVotesPie from './gaugeVotePie'

export default function ffVoteOverview() {

  const [ gauges, setGauges ] = useState([])
  const [ ibff, setIBFF] = useState(null)
  const [ veIBFF, setVeIBFF] = useState(null)

  useEffect(() => {
    const forexUpdated = () => {
      setIBFF(stores.fixedForexStore.getStore('ibff'))
      setVeIBFF(stores.fixedForexStore.getStore('veIBFF'))
      setGauges(stores.fixedForexStore.getStore('assets'))
    }

    setIBFF(stores.fixedForexStore.getStore('ibff'))
    setVeIBFF(stores.fixedForexStore.getStore('veIBFF'))
    setGauges(stores.fixedForexStore.getStore('assets'))

    stores.emitter.on(FIXED_FOREX_UPDATED, forexUpdated);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, forexUpdated);
    };
  }, []);

  return (
    <div className={ classes.container }>
      <div className={ classes.fieldsContainer }>
      <Grid container spacing={2}>
        <Grid item lg={4} md={4} sm={12}>
          <div className={ classes.field }>
            <AccountBalanceWalletIcon className={ classes.balanceIcon } />
            <div>
              <Typography className={ classes.title }>Your Voting Power:</Typography>
              <div className={ classes.inline }>
                <Typography className={ classes.value }>{ formatCurrency((veIBFF && veIBFF.vestingInfo) ? veIBFF.vestingInfo.lockValue : 0) }</Typography>
                <Typography className={ classes.valueSymbol }>{ veIBFF ? veIBFF.symbol : '' }</Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item lg={4} md={4} sm={12}>
          <div className={ classes.field }>
            <TimerIcon className={ classes.balanceIcon } />
            <div>
              <Typography className={ classes.title }>Total Voting Power:</Typography>
              <div className={ classes.inline }>
                <Typography className={ classes.value }>{ formatCurrency((veIBFF && veIBFF.vestingInfo) ? veIBFF.vestingInfo.totalSupply : 0) }</Typography>
                <Typography className={ classes.valueSymbol }>{ veIBFF ? veIBFF.symbol : '' }</Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item lg={4} md={4} sm={12}>
          <div className={ classes.field }>
            <div className={ classes.pieField }>
              <GaugeVotesPie data={gauges.map((gauge) => {
                return {
                  description: `${gauge?.gauge?.coin0?.symbol} - ${gauge?.gauge?.coin1?.symbol}`,
                  value: BigNumber(gauge?.gauge?.votePercent).toNumber()
                }
              })} />
            </div>
          </div>
        </Grid>
      </Grid>
      </div>
    </div>
  );
}
