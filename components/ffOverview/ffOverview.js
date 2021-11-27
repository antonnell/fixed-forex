import React, { useState, useEffect } from 'react';
import { Paper, Grid, Typography, SvgIcon, Button, TextField, InputAdornment, CircularProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Skeleton from '@material-ui/lab/Skeleton';
import BigNumber from 'bignumber.js';

import { formatCurrency } from '../../utils';
import classes from './ffOverview.module.css';

import stores from '../../stores'
import { FIXED_FOREX_UPDATED } from '../../stores/constants';

function BalanceIcon(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 32 32" stroke-width="1" className={className}>
    <g stroke-width="2" transform="translate(0, 0)"><line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="28" y1="12" x2="25" y2="12" stroke-linejoin="miter"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="21" y1="12" x2="19" y2="12" stroke-linejoin="miter"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="15" y1="12" x2="13" y2="12" stroke-linejoin="miter"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="9" y1="12" x2="7" y2="12" stroke-linejoin="miter"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="3" y1="12" x2="1" y2="12" stroke-linejoin="miter"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="28" y1="26" x2="25" y2="26" stroke-linejoin="miter"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="21" y1="26" x2="19" y2="26" stroke-linejoin="miter"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="15" y1="26" x2="13" y2="26" stroke-linejoin="miter"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="9" y1="26" x2="7" y2="26" stroke-linejoin="miter"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="3" y1="26" x2="1" y2="26" stroke-linejoin="miter"></line> <path fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" d="M28,16V8h-6H9H4 C2.343,8,1,6.657,1,5v21c0,2.209,1.791,4,4,4h23v-8" stroke-linejoin="miter"></path> <path data-color="color-2" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" d="M31,22h-7 c-1.657,0-3-1.343-3-3v0c0-1.657,1.343-3,3-3h7V22z" stroke-linejoin="miter"></path> <path fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" d="M22,4V2H4 C2.343,2,1,3.343,1,5v0c0,1.657,1.343,3,3,3" stroke-linejoin="miter"></path></g>
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
      <div className={ classes.fieldsContainer }>
        <Grid container spacing={3}>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <div className={ classes.field }>
              <div className={classes.iconWrap}>
                <BalanceIcon className={ classes.overviewIcon } />
              </div>
              <div>
                <Typography className={ classes.title }>KP3R Balance:</Typography>
                <div className={ classes.inline }>
                  <Typography className={ classes.value }>{ formatCurrency(ibff ? ibff.balance : 0) }</Typography>
                  <Typography className={ classes.valueSymbol }>{ ibff ? ibff.symbol : '' }</Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <div className={ classes.field }>
              <div className={classes.iconWrap}>
                <VestedBalanceIcon className={ classes.overviewIcon } />
              </div>
              <div>
                <Typography className={ classes.title }>Vested Balance:</Typography>
                <div className={ classes.inline }>
                  <Typography className={ classes.value }>{ formatCurrency((veIBFF && veIBFF.vestingInfo) ? veIBFF.vestingInfo.lockValue : 0) }</Typography>
                  <Typography className={ classes.valueSymbol }>{ veIBFF ? veIBFF.symbol : '' }</Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <div className={ classes.field }>
              <div className={classes.iconWrap}>
                <IbBalanceIcon className={ classes.overviewIcon } />
              </div>
              <div>
                <Typography className={ classes.title }>ib* Balances:</Typography>
                <div className={ classes.inline }>
                  <Typography className={ classes.value }>${ formatCurrency(totalBalance) }</Typography>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
