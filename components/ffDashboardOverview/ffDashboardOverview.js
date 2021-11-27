import React, { useState, useEffect } from 'react';
import { Paper, Grid, Typography, SvgIcon, Button, TextField, InputAdornment, CircularProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Skeleton from '@material-ui/lab/Skeleton';
import BigNumber from 'bignumber.js';

import { formatCurrency } from '../../utils';
import classes from './ffDashboardOverview.module.css';

import stores from '../../stores'
import { FIXED_FOREX_UPDATED } from '../../stores/constants';

function BalanceIcon(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 48 48" stroke-width="3" className={className}>
    <g stroke-width="3" transform="translate(0.5, 0.5)"><rect x="16" y="23" width="16" height="10" fill="none" stroke="#ffffff" stroke-linecap="square" stroke-miterlimit="10" stroke-width="3" data-color="color-2" stroke-linejoin="miter"></rect><path d="M20,23V17a4.012,4.012,0,0,1,4-4h0a4.012,4.012,0,0,1,4,4v6" fill="none" stroke="#ffffff" stroke-linecap="square" stroke-miterlimit="10" stroke-width="3" data-color="color-2" stroke-linejoin="miter"></path><path d="M42,27A18,18,0,0,1,6,27V7L24,3,42,7Z" fill="none" stroke="#ffffff" stroke-linecap="square" stroke-miterlimit="10" stroke-width="3" stroke-linejoin="miter"></path></g>
    </SvgIcon>
  );
}

function VestedBalanceIcon(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 32 32" stroke-width="1" className={className}>
      <g stroke-width="2" transform="translate(0, 0)"><polyline fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" points="14,8 14,14 8,14 " stroke-linejoin="miter"></polyline> <path data-cap="butt" data-color="color-2" fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" d="M19,20v4c0,1.657,2.686,3,6,3 s6-1.343,6-3v-4" stroke-linejoin="miter" stroke-linecap="butt"></path> <path data-cap="butt" data-color="color-2" fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" d="M19,24v4c0,1.657,2.686,3,6,3 s6-1.343,6-3v-4" stroke-linejoin="miter" stroke-linecap="butt"></path> <ellipse data-color="color-2" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" cx="25" cy="20" rx="6" ry="3" stroke-linejoin="miter"></ellipse> <path fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" d="M15,26.962 C14.67,26.987,14.336,27,14,27C6.82,27,1,21.18,1,14S6.82,1,14,1c6.843,0,12.452,5.288,12.962,12" stroke-linejoin="miter"></path></g>
    </SvgIcon>
  );
}

function IbBalanceIcon(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 32 32" stroke-width="1" className={className}>
      <g stroke-width="2" transform="translate(0, 0)"><path data-cap="butt" fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" d="M1,5v4c0,1.657,2.686,3,6,3 s6-1.343,6-3V5" stroke-linejoin="miter" stroke-linecap="butt"></path> <path data-cap="butt" fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" d="M1,9v4c0,1.657,2.686,3,6,3 s6-1.343,6-3V9" stroke-linejoin="miter" stroke-linecap="butt"></path> <line data-cap="butt" fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" x1="13" y1="16.401" x2="13" y2="13" stroke-linejoin="miter" stroke-linecap="butt"></line> <path data-cap="butt" fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" d="M1,13v4c0,1.657,2.686,3,6,3 c1.093,0,2.117-0.147,3-0.402" stroke-linejoin="miter" stroke-linecap="butt"></path> <path data-cap="butt" fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" d="M1,17v4c0,1.657,2.686,3,6,3 c1.093,0,2.118-0.147,3-0.402" stroke-linejoin="miter" stroke-linecap="butt"></path> <ellipse fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" cx="7" cy="5" rx="6" ry="3" stroke-linejoin="miter"></ellipse> <path data-cap="butt" fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" d="M19,9v4c0,1.657,2.686,3,6,3 s6-1.343,6-3V9" stroke-linejoin="miter" stroke-linecap="butt"></path> <path data-cap="butt" fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" d="M22,19.594 C22.883,19.85,23.906,20,25,20c3.314,0,6-1.343,6-3v-4" stroke-linejoin="miter" stroke-linecap="butt"></path> <line data-cap="butt" fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" x1="19" y1="13" x2="19" y2="16.401" stroke-linejoin="miter" stroke-linecap="butt"></line> <path data-cap="butt" fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" d="M22,23.596 C22.883,23.851,23.907,24,25,24c3.314,0,6-1.343,6-3v-4" stroke-linejoin="miter" stroke-linecap="butt"></path> <ellipse fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" cx="25" cy="9" rx="6" ry="3" stroke-linejoin="miter"></ellipse> <path data-cap="butt" data-color="color-2" fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" d="M10,19v4c0,1.657,2.686,3,6,3 s6-1.343,6-3v-4" stroke-linejoin="miter" stroke-linecap="butt"></path> <path data-cap="butt" data-color="color-2" fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" d="M10,23v4c0,1.657,2.686,3,6,3 s6-1.343,6-3v-4" stroke-linejoin="miter" stroke-linecap="butt"></path> <ellipse data-color="color-2" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" cx="16" cy="19" rx="6" ry="3" stroke-linejoin="miter"></ellipse></g>
    </SvgIcon>
  );
}

export default function ffOverview() {

  const [ ibff, setIBFF] = useState(null)
  const [ veIBFF, setVeIBFF] = useState(null)
  const [ rewards, setRewards] = useState(null)
  const [ assets, setAssets] = useState(null)
  const [ totalBalance, setTotalBalance ] = useState(0)

  useEffect(() => {
    const forexUpdated = () => {
      setIBFF(stores.fixedForexStore.getStore('ibff'))
      setVeIBFF(stores.fixedForexStore.getStore('veIBFF'))
      setRewards(stores.fixedForexStore.getStore('rewards'))
      const ass = stores.fixedForexStore.getStore('assets')
      setAssets(ass)

      calculateTotalBalance(ass)
    }

    setIBFF(stores.fixedForexStore.getStore('ibff'))
    setVeIBFF(stores.fixedForexStore.getStore('veIBFF'))
    setRewards(stores.fixedForexStore.getStore('rewards'))
    const ass = stores.fixedForexStore.getStore('assets')
    setAssets(ass)

    calculateTotalBalance(ass)

    stores.emitter.on(FIXED_FOREX_UPDATED, forexUpdated);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, forexUpdated);
    };
  }, []);

  const calculateTotalBalance = (ass) => {
    if(!ass) {
      return
    }

    let balance = 0

    for(let i = 0; i < ass.length; i++) {
      let asset = ass[i]
      if(asset && asset.gauge) {
        let pooledBalance = BigNumber(asset.gauge.userPoolBalance).times(asset.gauge.virtualPrice)
        let stakedBalance = BigNumber(asset.gauge.userGaugeBalance).times(asset.gauge.virtualPrice)
        let convexBalance = BigNumber(asset.convex.balance).times(asset.gauge.virtualPrice)
        let tot = BigNumber(asset.balance).plus(pooledBalance).plus(stakedBalance).plus(convexBalance).times(asset.price)
        balance = BigNumber(balance).plus(tot)
      }
    }

    setTotalBalance(balance)
  }

  return (
    <div className={ classes.container }>
        <Grid container spacing={4}>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Paper elevation={0} className={ classes.itemWrapGrid }>
            <Grid container spacing={0}>
              <Grid item lg={3} md={3} sm={3} xs={3} className={classes.iconWrap}>
                  <BalanceIcon className={ classes.overviewIcon } />
              </Grid>
              <Grid item lg={9} md={9} sm={9} xs={9} className={ classes.itemContent }>
                <Typography className={ classes.title }>KP3R Balance:</Typography>
                <div className={ classes.inline }>
                <Typography className={ classes.value }>{ formatCurrency(ibff ? ibff.balance : 0) }</Typography>
                <Typography className={ classes.valueSymbol }>{ ibff ? ibff.symbol : '' }</Typography>
                </div>
              </Grid>
            </Grid>
            </Paper>
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Paper elevation={0} className={ classes.itemWrapGrid }>
            <Grid container spacing={0}>
              <Grid item lg={3} md={3} sm={3} xs={3} className={classes.iconWrap}>
                  <VestedBalanceIcon className={ classes.overviewIcon } />
              </Grid>
              <Grid item lg={9} md={9} sm={9} xs={9} className={ classes.itemContent }>
                <Typography className={ classes.title }>Vested Balance:</Typography>
                <div className={ classes.inline }>
                  <Typography className={ classes.value }>{ formatCurrency((veIBFF && veIBFF.vestingInfo) ? veIBFF.vestingInfo.lockValue : 0) }</Typography>
                  <Typography className={ classes.valueSymbol }>{ veIBFF ? veIBFF.symbol : '' }</Typography>
                </div>
              </Grid>
            </Grid>
            </Paper>
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Paper elevation={0} className={ classes.itemWrapGrid }>
            <Grid container spacing={0}>
              <Grid item lg={3} md={3} sm={3} xs={3} className={classes.iconWrap}>
                  <IbBalanceIcon className={ classes.overviewIcon } />
              </Grid>
              <Grid item lg={9} md={9} sm={9} xs={9} className={ classes.itemContent }>
                <Typography className={ classes.title }>Iron Bank (ib*) Balances:</Typography>
                <div className={ classes.inline }>
                  <Typography className={ classes.value }>${ formatCurrency(totalBalance) }</Typography>
                </div>
              </Grid>
            </Grid>
            </Paper>
          </Grid>

        </Grid>
    </div>
  );
}
