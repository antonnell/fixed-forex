import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, CircularProgress } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import classes from './ffClaimAll.module.css';

import RewardsTable from './ffClaimAllTable.js'

import stores from '../../stores'
import { FIXED_FOREX_UPDATED, FIXED_FOREX_CLAIM_ALL, FIXED_FOREX_ALL_CLAIMED, ERROR } from '../../stores/constants';

export default function ffClaimAll() {

  const [ claimLoading, setClaimLoading ] = useState(false)
  const [ claimable, setClaimable ] = useState([])

  useEffect(() => {
    const forexUpdated = () => {
      getClaimable()
    }

    getClaimable()

    const claimReturned = () => {
      setClaimLoading(false)
    }

    stores.emitter.on(FIXED_FOREX_UPDATED, forexUpdated);
    stores.emitter.on(FIXED_FOREX_ALL_CLAIMED, claimReturned);
    stores.emitter.on(ERROR, claimReturned);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, forexUpdated);
      stores.emitter.removeListener(FIXED_FOREX_ALL_CLAIMED, claimReturned);
      stores.emitter.removeListener(ERROR, claimReturned);
    };
  }, []);

  const getClaimable = () => {
    const gauges = stores.fixedForexStore.getStore('assets')
    const rewards = stores.fixedForexStore.getStore('rewards')

    console.log(gauges)
    console.log(rewards)

    const cl = []

    if(rewards && rewards.feeDistribution && BigNumber(rewards.feeDistribution.earned).gt(0)) {
      cl.push({
        type: 'Fixed Forex',
        description: 'Fee Claim',
        earned: rewards.feeDistribution.earned,
        symbol: 'ibEUR'
      })
    }
    if(rewards && rewards.veIBFFDistribution && BigNumber(rewards.veIBFFDistribution.earned).gt(0)) {
      cl.push({
        type: 'Fixed Forex',
        description: 'Vesting Rewards',
        earned: rewards.feeDistribution.earned,
        symbol: 'kp3r'
      })
    }

    if(gauges) {
      for(let i = 0; i < gauges.length; i++) {
        if(gauges[i].gauge && BigNumber(gauges[i].gauge.earned).gt(0)) {
          cl.push({
            type: 'Curve Gauge Rewards',
            description: gauges[i].name,
            earned: gauges[i].gauge.earned,
            symbol: 'CRV',
            address: gauges[i].address,
            gauge: gauges[i]
          })
        }
      }
    }

    setClaimable(cl)
  }

  const onClaim = () => {
    setClaimLoading(true)
    stores.dispatcher.dispatch({ type: FIXED_FOREX_CLAIM_ALL, content: { claimable }})
  }

  return (
    <Paper elevation={0} className={ classes.container }>
      <RewardsTable claimable={ claimable } />
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
  );
}
