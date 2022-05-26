import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField, InputAdornment, CircularProgress, SvgIcon, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Skeleton from '@material-ui/lab/Skeleton';

import { formatCurrency } from '../../utils';
import classes from './ffStakeOverview.module.css';

import stores from '../../stores'
import { FIXED_FOREX_UPDATED, FIXED_FOREX_CLAIM_RKP3R, FIXED_FOREX_RKP3R_CLAIMED, ERROR } from '../../stores/constants';

function BalanceIcon(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 32 32" strokeWidth="1" className={className}>
    <g strokeWidth="2" transform="translate(0, 0)"><line fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="28" y1="12" x2="25" y2="12" strokeLinejoin="miter"></line> <line fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="21" y1="12" x2="19" y2="12" strokeLinejoin="miter"></line> <line fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="15" y1="12" x2="13" y2="12" strokeLinejoin="miter"></line> <line fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="9" y1="12" x2="7" y2="12" strokeLinejoin="miter"></line> <line fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="3" y1="12" x2="1" y2="12" strokeLinejoin="miter"></line> <line fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="28" y1="26" x2="25" y2="26" strokeLinejoin="miter"></line> <line fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="21" y1="26" x2="19" y2="26" strokeLinejoin="miter"></line> <line fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="15" y1="26" x2="13" y2="26" strokeLinejoin="miter"></line> <line fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="9" y1="26" x2="7" y2="26" strokeLinejoin="miter"></line> <line fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="3" y1="26" x2="1" y2="26" strokeLinejoin="miter"></line> <path fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M28,16V8h-6H9H4 C2.343,8,1,6.657,1,5v21c0,2.209,1.791,4,4,4h23v-8" strokeLinejoin="miter"></path> <path data-color="color-2" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M31,22h-7 c-1.657,0-3-1.343-3-3v0c0-1.657,1.343-3,3-3h7V22z" strokeLinejoin="miter"></path> <path fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M22,4V2H4 C2.343,2,1,3.343,1,5v0c0,1.657,1.343,3,3,3" strokeLinejoin="miter"></path></g>
  </SvgIcon>
  );
}

function VestedBalanceIcon(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 32 32" strokeWidth="1" className={className}>
      <g strokeWidth="2" transform="translate(0, 0)"><polyline fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" points="14,8 14,14 8,14 " strokeLinejoin="miter"></polyline> <path data-cap="butt" data-color="color-2" fill="none" stroke="#ffffff" strokeWidth="2" strokeMiterlimit="10" d="M19,20v4c0,1.657,2.686,3,6,3 s6-1.343,6-3v-4" strokeLinejoin="miter" strokeLinecap="butt"></path> <path data-cap="butt" data-color="color-2" fill="none" stroke="#ffffff" strokeWidth="2" strokeMiterlimit="10" d="M19,24v4c0,1.657,2.686,3,6,3 s6-1.343,6-3v-4" strokeLinejoin="miter" strokeLinecap="butt"></path> <ellipse data-color="color-2" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" cx="25" cy="20" rx="6" ry="3" strokeLinejoin="miter"></ellipse> <path fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M15,26.962 C14.67,26.987,14.336,27,14,27C6.82,27,1,21.18,1,14S6.82,1,14,1c6.843,0,12.452,5.288,12.962,12" strokeLinejoin="miter"></path></g>
    </SvgIcon>
  );
}

export default function ffStakeOverview() {

  const [ rKP3R, setRKP3R ] = useState(null)
  const [ oKP3ROptions, setOKP3ROptions ] = useState(null)
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    const forexUpdated = () => {
      setRKP3R(stores.fixedForexStore.getStore('rKP3R'))
      setOKP3ROptions(stores.fixedForexStore.getStore('setOKP3ROptions'))
    }
    const claimReturned = () => {
      setLoading(false)
    }

    setRKP3R(stores.fixedForexStore.getStore('rKP3R'))
    setOKP3ROptions(stores.fixedForexStore.getStore('setOKP3ROptions'))

    stores.emitter.on(FIXED_FOREX_UPDATED, forexUpdated);
    stores.emitter.on(FIXED_FOREX_RKP3R_CLAIMED, claimReturned);
    stores.emitter.on(ERROR, claimReturned);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, forexUpdated);
      stores.emitter.removeListener(FIXED_FOREX_RKP3R_CLAIMED, claimReturned);
      stores.emitter.removeListener(ERROR, claimReturned);
    };
  }, []);

  const onClaim = () => {
    setLoading(true)
    stores.dispatcher.dispatch({ type: FIXED_FOREX_CLAIM_RKP3R, content: {  }})
  }

  return (
    <div className={ classes.container }>

      <Grid container spacing={0} className={ classes.fieldsContainer }>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <div className={ classes.field }>
            <div className={classes.iconWrap}>
              <BalanceIcon className={ classes.overviewIcon } />
            </div>
            <div>
              <Typography className={ classes.title }>rKP3R Balance:</Typography>
              <div className={ classes.inline }>
                <Typography className={ classes.value }>{ formatCurrency(rKP3R ? rKP3R.balance : 0) }</Typography>
                <Typography className={ classes.valueSymbol }>{ rKP3R ? rKP3R.symbol : '' }</Typography>
              </div>
            </div>
            <Button variant='contained' className={ classes.claimButton } onClick={ onClaim } disabled={ loading }>
              { loading ? `Claiming` : `Claim Now` }
              { loading && <CircularProgress size={10} className={ classes.loadingCircle } /> }
            </Button>
          </div>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
        <div className={ classes.field }>
          <div className={classes.iconWrap}>
            <VestedBalanceIcon className={ classes.overviewIcon } />
          </div>
          <div>
            <Typography className={ classes.title }>Options:</Typography>
            <div className={ classes.inline }>
              <Typography className={ classes.value }>{ oKP3ROptions ? oKP3ROptions.length : 0 }</Typography>
              <Typography className={ classes.valueSymbol }>{ '' }</Typography>
            </div>
          </div>
        </div>
        </Grid>
      </Grid>

    </div>
  );
}
