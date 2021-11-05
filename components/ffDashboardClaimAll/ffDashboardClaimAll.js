import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, CircularProgress, SvgIcon, Grid } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classes from './ffDashboardClaimAll.module.css';
import RewardsTable from './ffDashboardClaimAllTable.js'

import stores from '../../stores'
import { FIXED_FOREX_UPDATED, FIXED_FOREX_CLAIM_ALL, FIXED_FOREX_ALL_CLAIMED, ERROR, IBEUR_ADDRESS } from '../../stores/constants';

function NoRewardsIcon(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 64 64" stroke-width="1" className={className}>
    <g stroke-width="2" transform="translate(0, 0)"><path d="M15.029,48.971A24,24,0,0,1,48.971,15.029" fill="none" stroke="#686c7a" stroke-miterlimit="10" stroke-width="2" data-cap="butt" stroke-linecap="butt" stroke-linejoin="miter"></path><path d="M52.789,20A24.006,24.006,0,0,1,20,52.789" fill="none" stroke="#686c7a" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="miter"></path><line x1="60" y1="4" x2="4" y2="60" fill="none" stroke="#686c7a" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2" data-color="color-2" stroke-linejoin="miter"></line></g>
    </SvgIcon>
  );
}

export default function ffClaimAll() {

  const [ claimLoading, setClaimLoading ] = useState(false)
  const [ claimable, setClaimable ] = useState([])
  const [ crv, setCRV ] = useState(null)
  const [ ibEUR, setIBEUR ] = useState(null)
  const [ rKP3R, setRKP3R ] = useState(null)

  useEffect(() => {
    const forexUpdated = () => {
      getClaimable()
      setGetIBEUR()
      setCRV(stores.fixedForexStore.getStore('crv'))
      setRKP3R(stores.fixedForexStore.getStore('rKP3R'))
    }

    getClaimable()
    setGetIBEUR()
    setCRV(stores.fixedForexStore.getStore('crv'))
    setRKP3R(stores.fixedForexStore.getStore('rKP3R'))

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

  const setGetIBEUR = () => {
    const assets = stores.fixedForexStore.getStore('assets')
    const ibEURArr = assets.filter((as) => {
      return as.address === IBEUR_ADDRESS
    })

    if(ibEURArr.length > 0) {
      setIBEUR(ibEURArr[0])
    }
  }

  const getClaimable = () => {
    const gauges = stores.fixedForexStore.getStore('assets')
    const rewards = stores.fixedForexStore.getStore('rewards')
    const rKP3R = stores.fixedForexStore.getStore('rKP3R')

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
        earned: rewards.veIBFFDistribution.earned,
        symbol: 'kp3r'
      })
    }
    if(rKP3R && BigNumber(rKP3R.balance).gt(0)) {
      cl.push({
        type: 'Fixed Forex',
        description: 'Redeemable KP3R',
        earned: rKP3R.balance,
        symbol: 'rKP3R'
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
    <Paper elevation={0} className={classes.container}>

      {claimable.length>0 ?

        <div className={classes.hasRewards}>
          <RewardsTable claimable={ claimable } crv={ crv } ibEUR={ ibEUR } rKP3R={ rKP3R } />
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
        </div>

        :

        <div className={classes.noRewards}>
          <Grid container spacing={0} className={classes.centerGridRows}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <NoRewardsIcon className={ classes.overviewIcon } />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography variant="h5">You have no rewards</Typography>
            </Grid>
          </Grid>
        </div>
      }





    </Paper>
  );
}
