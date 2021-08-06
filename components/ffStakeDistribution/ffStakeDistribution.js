import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField, InputAdornment, CircularProgress, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import BigNumber from 'bignumber.js';
import Skeleton from '@material-ui/lab/Skeleton';
import moment from 'moment';
import { formatCurrency } from '../../utils';
import classes from './ffStakeDistribution.module.css';
import stores from '../../stores'
import { FIXED_FOREX_UPDATED, FIXED_FOREX_CLAIM_STAKING_REWARD, FIXED_FOREX_STAKING_REWARD_CLAIMED, ERROR } from '../../stores/constants';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

export default function ffStakeDistribution() {

  const [ rewards, setRewards] = useState(null)
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    const forexUpdated = () => {
      setRewards(stores.fixedForexStore.getStore('rewards'))
    }

    const errorReturned = () => {
      setLoading(false)
    }

    const claimReturned = () => {
      setLoading(false)
    }

    setRewards(stores.fixedForexStore.getStore('rewards'))

    stores.emitter.on(FIXED_FOREX_UPDATED, forexUpdated);
    stores.emitter.on(FIXED_FOREX_STAKING_REWARD_CLAIMED, claimReturned);
    stores.emitter.on(ERROR, errorReturned);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, forexUpdated);
      stores.emitter.removeListener(FIXED_FOREX_STAKING_REWARD_CLAIMED, claimReturned);
      stores.emitter.removeListener(ERROR, errorReturned);
    };
  }, []);

  const onClaim = () => {
    if(loading) { return; }

    setLoading(true)
    stores.dispatcher.dispatch({ type: FIXED_FOREX_CLAIM_STAKING_REWARD, content: {} })
  }

  return (
    <div className={ classes.container}>
      <Typography variant="h5" className={ classes.title}>Claimable Rewards</Typography>
      <Paper elevation={0} className={ classes.lpOptionsContainer }>
        <div className={ classes.lpOption } onClick={ () => { onClaim() } }>
          <div className={ classes.lpOptionTitle }>
            <img className={ classes.lpOptionIcon } src='/images/Sushi.png' alt='Sushi Logo' width={ 60 } height={ 60 } />
            <div>
              <Typography className={ classes.lpOptionName }>Sushiswap LP</Typography>
              <Typography className={ classes.lpOptionDescription }>Staking Rewards</Typography>
            </div>
          </div>
          <div>
            <Typography className={ classes.amountText }>{ formatCurrency(rewards ? rewards.faucet.earned : 0) } ibff</Typography>
          </div>
          <div>
            <Typography>Claim Now</Typography>
          </div>
          {
            <div className={ classes.activeIcon }></div>
          }
        </div>
      </Paper>
    </div>
  );
}
