import React, { useState, useEffect } from 'react';
import { Paper, Typography, CircularProgress } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { formatCurrency } from '../../utils';
import classes from './ffClaimDistirbution.module.css';

import stores from '../../stores'
import { FIXED_FOREX_UPDATED, FIXED_FOREX_CLAIM_DISTRIBUTION_REWARD, FIXED_FOREX_DISTRIBUTION_REWARD_CLAIMED } from '../../stores/constants';

export default function ffClaimDistirbution() {

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
    stores.emitter.on(FIXED_FOREX_DISTRIBUTION_REWARD_CLAIMED, rewardClaimed);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, forexUpdated);
      stores.emitter.removeListener(FIXED_FOREX_DISTRIBUTION_REWARD_CLAIMED, rewardClaimed);
    };
  }, []);

  const claim = () => {
    // if(BigNumber(rewards && rewards.feeDistribution ? rewards.feeDistribution.earned : 0).gt(0)) {
      setLoading(true)
      stores.dispatcher.dispatch({ type: FIXED_FOREX_CLAIM_DISTRIBUTION_REWARD, content: {}})
    // }
  }

  return (
    <div className={ classes.container}>
      <Paper elevation={0} className={ classes.lpOptionsContainer }>
        <div className={ classes.lpOption } onClick={ () => { claim() } }>
          <div className={ classes.lpOptionTitle }>
            <img className={ classes.lpOptionIcon } src='/images/ff-icon.svg' alt='FF Logo' width={ 60 } height={ 60 } />
            <div>
              <Typography className={ classes.lpOptionName }>Fixed Forex</Typography>
              <Typography className={ classes.lpOptionDescription }>Fee Claim</Typography>
            </div>
          </div>
          <div>
            {
              BigNumber(veIBFF && veIBFF.vestingInfo && veIBFF.vestingInfo.lockValue ? veIBFF.vestingInfo.lockValue : 0).gt(0) &&
              <Typography className={ classes.amountText }>{ formatCurrency(rewards && rewards.feeDistribution ? rewards.feeDistribution.earned : 0) } ibEUR</Typography>
            }
            { !BigNumber(veIBFF && veIBFF.vestingInfo && veIBFF.vestingInfo.lockValue ? veIBFF.vestingInfo.lockValue : 0).gt(0) &&
              <Typography className={ classes.vestText }>Vest ibff to earn rewards</Typography>
            }
          </div>
          { BigNumber(veIBFF && veIBFF.vestingInfo && veIBFF.vestingInfo.lockValue ? veIBFF.vestingInfo.lockValue : 0).gt(0) &&
            <div>
              { BigNumber(rewards && rewards.feeDistribution ? rewards.feeDistribution.earned : 0).gt(0) &&
                (
                  loading ? <Typography>Claiming</Typography> : <Typography>Claim Now</Typography>
                )
              }
              { !BigNumber(rewards && rewards.feeDistribution ? rewards.feeDistribution.earned : 0).gt(0) &&
                <Typography>Nothing to Claim</Typography>
              }
            </div>
          }
          { BigNumber(rewards && rewards.feeDistribution ? rewards.feeDistribution.earned : 0).gt(0) &&
            <div className={ classes.activeIcon }></div>
          }
        </div>
      </Paper>
    </div>
  );
}
