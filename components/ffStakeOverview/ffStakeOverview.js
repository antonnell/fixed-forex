import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField, InputAdornment, CircularProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Skeleton from '@material-ui/lab/Skeleton';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TimerIcon from '@material-ui/icons/Timer';

import BigNumber from 'bignumber.js';
import { formatCurrency } from '../../utils';
import classes from './ffStakeOverview.module.css';

import stores from '../../stores'
import { FIXED_FOREX_UPDATED } from '../../stores/constants';

export default function ffStakeOverview() {

  const [ uniV3Positions, setUniV3Positions] = useState([])
  const [ totalUniV3Positions, setTotalUniV3Positions] = useState(null)
  const [ stakingV3Positions, setStakingV3Positions] = useState([])
  const [ totalStakingV3Positions, setTotalStakingV3Positions] = useState(null)
  const [ totalRewards, setTotalRewards ] = useState(null)

  useEffect(() => {
    const forexUpdated = () => {
      calcTotals()
    }

    calcTotals()

    stores.emitter.on(FIXED_FOREX_UPDATED, forexUpdated);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, forexUpdated);
    };
  }, []);

  const calcTotals = () => {
    const uniPos = stores.fixedForexStore.getStore('uniV3Positions')
    if(uniPos) {
      setUniV3Positions(uniPos)
      setTotalUniV3Positions(uniPos.reduce((curr, acc) => { return BigNumber(curr).plus(acc.balance).toFixed(18) }, 0))
    }

    const stakingPos = stores.fixedForexStore.getStore('stakingV3Positions')
    if(stakingPos) {
      setStakingV3Positions(stakingPos)
      setTotalStakingV3Positions(stakingPos.reduce((curr, acc) => { return BigNumber(curr).plus(acc.balance).toFixed(18) }, 0))
      setTotalRewards(stakingPos.reduce((curr, acc) => { return BigNumber(curr).plus(acc.reward).toFixed(18) }, 0))
    }
  }

  return (
    <div className={ classes.container }>
      <div className={ classes.fieldsContainer }>
        <div className={ classes.field }>
          <AccountBalanceWalletIcon className={ classes.balanceIcon } />
          <div>
            <Typography className={ classes.title }>UNI-V3-POS Balance:</Typography>
            <div className={ classes.inline }>
              <Typography className={ classes.value }>{ formatCurrency(totalUniV3Positions) }</Typography>
              <Typography className={ classes.valueSymbol }>KP3R/ETH</Typography>
            </div>
          </div>
        </div>
        <div className={ classes.field }>
          <TimerIcon className={ classes.balanceIcon } />
          <div>
            <Typography className={ classes.title }>Staked Balance:</Typography>
            <div className={ classes.inline }>
              <Typography className={ classes.value }>{ formatCurrency(totalStakingV3Positions) }</Typography>
              <Typography className={ classes.valueSymbol }>KP3R/ETH</Typography>
            </div>
          </div>
        </div>
        <div className={ classes.field }>
          <AttachMoneyIcon className={ classes.balanceIcon } />
          <div>
            <Typography className={ classes.title }>Rewards Available:</Typography>
            <div className={ classes.inline }>
              <Typography className={ classes.value }>{ formatCurrency(totalRewards) }</Typography>
              <Typography className={ classes.valueSymbol }>rKP3R</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
