import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField, InputAdornment, CircularProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Skeleton from '@material-ui/lab/Skeleton';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TimerIcon from '@material-ui/icons/Timer';

import { formatCurrency } from '../../utils';
import classes from './ffStakeOverview.module.css';

import stores from '../../stores'
import { FIXED_FOREX_UPDATED, FIXED_FOREX_CLAIM_RKP3R, FIXED_FOREX_RKP3R_CLAIMED, ERROR } from '../../stores/constants';

export default function ffStakeOverview() {

  const [ rKP3R, setRKP3R ] = useState(null)
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    const forexUpdated = () => {
      setRKP3R(stores.fixedForexStore.getStore('rKP3R'))
    }
    const claimReturned = () => {
      setLoading(false)
    }

    setRKP3R(stores.fixedForexStore.getStore('rKP3R'))

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
      <div className={ classes.fieldsContainer }>
        <div className={ classes.field }>
          <AccountBalanceWalletIcon className={ classes.balanceIcon } />
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
        <div className={ classes.field }>
          <TimerIcon className={ classes.balanceIcon } />
          <div>
            <Typography className={ classes.title }>Options:</Typography>
            <div className={ classes.inline }>
              <Typography className={ classes.value }>{ formatCurrency(0) }</Typography>
              <Typography className={ classes.valueSymbol }>{ '' }</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
