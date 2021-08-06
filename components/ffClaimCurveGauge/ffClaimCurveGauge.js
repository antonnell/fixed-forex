import React, { useState, useEffect } from 'react';
import { Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { formatCurrency } from '../../utils';
import classes from './ffClaimCurveGauge.module.css';

import stores from '../../stores'
import { FIXED_FOREX_CLAIM_CURVE_REWARDS, FIXED_FOREX_CURVE_REWARD_CLAIMED } from '../../stores/constants';

export default function ffClaimCurveGauge({ asset }) {

  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    const rewardClaimed = () => {
      setLoading(false)
    }

    stores.emitter.on(FIXED_FOREX_CURVE_REWARD_CLAIMED, rewardClaimed);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_CURVE_REWARD_CLAIMED, rewardClaimed);
    };
  }, []);

  const claim = () => {
    if(BigNumber(asset && asset.gauge ? asset.gauge.earned : 0).gt(0)) {
      setLoading(true)
      stores.dispatcher.dispatch({ type: FIXED_FOREX_CLAIM_CURVE_REWARDS, content: { asset }})
    }
  }

  return (
    <div className={ classes.container}>
      <Typography variant="h5" className={ classes.title}>Claimable Rewards</Typography>
      <Paper elevation={0} className={ classes.lpOptionsContainer }>
        <div className={ classes.lpOption } onClick={ () => { claim() } }>
          <div className={ classes.lpOptionTitle }>
            <img className={ classes.lpOptionIcon } src='/images/ff-icon.svg' alt='FF Logo' width={ 60 } height={ 60 } />
            <div>
              <Typography className={ classes.lpOptionName }>Fixed Forex</Typography>
              <Typography className={ classes.lpOptionDescription }>Gauge Rewards</Typography>
            </div>
          </div>
          <div>
            <Typography className={ classes.amountText }>{ formatCurrency(asset && asset.gauge ? asset.gauge.earned : 0) } ibff</Typography>
          </div>
          <div>
            { BigNumber(asset && asset.gauge ? asset.gauge.earned : 0).gt(0) &&
              <Typography>Claim Now</Typography>
            }
            { !BigNumber(asset && asset.gauge ? asset.gauge.earned : 0).gt(0) &&
              <Typography>Stake in gauge to earn rewards</Typography>
            }
          </div>
          { BigNumber(asset && asset.gauge ? asset.gauge.earned : 0).gt(0) &&
            <div className={ classes.activeIcon }></div>
          }
        </div>
      </Paper>
    </div>
  );
}
