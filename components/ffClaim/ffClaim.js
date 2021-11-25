import React, { useState, useEffect } from 'react';
import { Paper, Typography, CircularProgress, Grid } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { formatCurrency } from '../../utils';
import classes from './ffClaim.module.css';

import stores from '../../stores'
import { FIXED_FOREX_UPDATED, FIXED_FOREX_CLAIM_VESTING_REWARD, FIXED_FOREX_VESTING_REWARD_CLAIMED } from '../../stores/constants';

export default function ffClaim() {

  const [ loading, setLoading ] = useState(false)
  const [ rewards, setRewards] = useState(null)
  const [ veIBFF, setVeIBFF] = useState(null)

  useEffect(() => {
    const forexUpdated = () => {
      setRewards(stores.fixedForexStore.getStore('rewards'))
      setVeIBFF(stores.fixedForexStore.getStore('veIBFF'))
    }

    const rewardClaimed = () => {
      setLoading(false)
    }

    setRewards(stores.fixedForexStore.getStore('rewards'))
    setVeIBFF(stores.fixedForexStore.getStore('veIBFF'))

    stores.emitter.on(FIXED_FOREX_UPDATED, forexUpdated);
    stores.emitter.on(FIXED_FOREX_VESTING_REWARD_CLAIMED, rewardClaimed);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, forexUpdated);
      stores.emitter.removeListener(FIXED_FOREX_VESTING_REWARD_CLAIMED, rewardClaimed);
    };
  }, []);

  const claim = () => {
    if(BigNumber(rewards && rewards.veIBFFDistribution ? rewards.veIBFFDistribution.earned : 0).gt(0)) {
      setLoading(true)
      stores.dispatcher.dispatch({ type: FIXED_FOREX_CLAIM_VESTING_REWARD, content: {}})
    }
  }

  return (
    <div className={classes.container}>
      <Typography variant="h5" className={classes.title}>Claimable Rewards:</Typography>
      <Paper elevation={0} className={ classes.lpOptionsContainer }>
        <div className={ classes.lpOption } onClick={ () => { claim() } }>
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} xs={12}>
              <div className={ classes.lpOptionTitle }>
                <img className={ classes.lpOptionIcon } src='/images/ff-icon.svg' alt='FF Logo' width={ 60 } height={ 60 } />
                <div>
                  <Typography className={ classes.lpOptionName }>Fixed Forex</Typography>
                  <Typography className={ classes.lpOptionDescription }>Vesting Rewards</Typography>
                </div>
              </div>
            </Grid>
            <Grid item lg={12} md={12} xs={12}>
              <div>
                {
                  BigNumber(veIBFF && veIBFF.vestingInfo && veIBFF.vestingInfo.lockValue ? veIBFF.vestingInfo.lockValue : 0).gt(0) &&
                  <Typography className={ classes.amountText }>{ formatCurrency(rewards && rewards.veIBFFDistribution ? rewards.veIBFFDistribution.earned : 0) } rKP3R</Typography>
                }
                { !BigNumber(veIBFF && veIBFF.vestingInfo && veIBFF.vestingInfo.lockValue ? veIBFF.vestingInfo.lockValue : 0).gt(0) &&
                  <Typography className={ classes.vestText }>Vest kp3r to earn rewards</Typography>
                }
              </div>
            </Grid>
            <Grid item lg={12} md={12} xs={12}>
              <div className={ classes.center}>
              { BigNumber(veIBFF && veIBFF.vestingInfo && veIBFF.vestingInfo.lockValue ? veIBFF.vestingInfo.lockValue : 0).gt(0) &&
                <div>
                  { BigNumber(rewards && rewards.veIBFFDistribution ? rewards.veIBFFDistribution.earned : 0).gt(0) &&
                    (
                      loading ? <Typography className={classes.sub}>Claiming</Typography> : <Typography className={classes.sub}>Claim Now</Typography>
                    )
                  }
                  { !BigNumber(rewards && rewards.veIBFFDistribution ? rewards.veIBFFDistribution.earned : 0).gt(0) &&
                    <Typography className={classes.sub}>Nothing to Claim</Typography>
                  }
                </div>
              }
              </div>
            </Grid>
          </Grid>
          { BigNumber(rewards && rewards.veIBFFDistribution ? rewards.veIBFFDistribution.earned : 0).gt(0) &&
            <div className={ classes.activeIcon }></div>
          }
        </div>
      </Paper>
    </div>
  );
}
