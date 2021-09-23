import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, CircularProgress } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import classes from './ffUniV3Rewards.module.css';

import RewardsTable from './ffUniV3RewardsTable.js'

import stores from '../../stores'
import { ERROR, FIXED_FOREX_UPDATED, FIXED_FOREX_GET_ALL_UNI_REWARDS, FIXED_FOREX_ALL_UNI_REWARDS_RETURNED } from '../../stores/constants';

export default function ffClaimAll() {

  const [ claimLoading, setClaimLoading ] = useState(false)
  const [ tokens, setTokens ] = useState(null)
  const [ rKP3R, setRKP3R ] = useState(null)

  useEffect(() => {
    const forexUpdated = () => {
      setTokens(stores.fixedForexStore.getStore('stakingV3Positions'))
      setRKP3R(stores.fixedForexStore.getStore('rKP3R'))
    }

    const claimReturned = () => {
      setClaimLoading(false)
    }

    setTokens(stores.fixedForexStore.getStore('stakingV3Positions'))
    setRKP3R(stores.fixedForexStore.getStore('rKP3R'))

    stores.emitter.on(FIXED_FOREX_UPDATED, forexUpdated);
    stores.emitter.on(FIXED_FOREX_ALL_UNI_REWARDS_RETURNED, claimReturned);
    stores.emitter.on(ERROR, claimReturned);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, forexUpdated);
      stores.emitter.removeListener(FIXED_FOREX_ALL_UNI_REWARDS_RETURNED, claimReturned);
      stores.emitter.removeListener(ERROR, claimReturned);
    };
  }, []);

  const onClaim = (token) => {
    setClaimLoading(true)
    stores.dispatcher.dispatch({ type: FIXED_FOREX_GET_ALL_UNI_REWARDS, content: {  }})
  }

  return (
    <div className={ classes.container}>
      <Typography variant="h5" className={ classes.title}>Staked</Typography>
      <Paper elevation={0} className={ classes.optionsContainer }>
        <RewardsTable tokens={ tokens } rKP3R={ rKP3R } />
        <div className={ classes.infoSection }>
        </div>
        <div className={ classes.actionButtons }>
          <Button
            className={ classes.buttonOverride }
            variant='contained'
            size='large'
            color='primary'
            disabled={ claimLoading }
            onClick={ onClaim }
            >
            <Typography className={ classes.actionButtonText }>{ claimLoading ? `Claiming` : `Claim all` }</Typography>
            { claimLoading && <CircularProgress size={10} className={ classes.loadingCircle } /> }
          </Button>
        </div>
      </Paper>
    </div>
  );
}
