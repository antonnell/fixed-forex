import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, CircularProgress } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import classes from './ffUniV3Tokens.module.css';

import RewardsTable from './ffUniV3TokensTable.js'

import stores from '../../stores'
import { FIXED_FOREX_UPDATED } from '../../stores/constants';

export default function ffClaimAll() {

  const [ loading, setLoading ] = useState(false)
  const [ tokens, setTokens ] = useState(null)
  const [ rKP3R, setRKP3R ] = useState(null)

  useEffect(() => {
    const forexUpdated = () => {
      setTokens(stores.fixedForexStore.getStore('uniV3Positions'))
      setRKP3R(stores.fixedForexStore.getStore('rKP3R'))
    }

    setTokens(stores.fixedForexStore.getStore('uniV3Positions'))
    setRKP3R(stores.fixedForexStore.getStore('rKP3R'))

    stores.emitter.on(FIXED_FOREX_UPDATED, forexUpdated);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, forexUpdated);
    };
  }, []);

  return (
    <Paper elevation={0} className={ classes.container }>
      <RewardsTable tokens={ tokens } rKP3R={ rKP3R } />
    </Paper>
  );
}
