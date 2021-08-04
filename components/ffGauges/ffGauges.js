import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField, InputAdornment, CircularProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Skeleton from '@material-ui/lab/Skeleton';

import { formatCurrency } from '../../utils';
import classes from './ffGauges.module.css';

import GaugesTable from './ffGaugesTable.js'

import stores from '../../stores'
import { FIXED_FOREX_UPDATED } from '../../stores/constants';

export default function ffGauges() {

  const [gauges, setGauges] = useState([])

  useEffect(() => {
    const forexUpdated = () => {
      const as = stores.fixedForexStore.getStore('assets');
      setGauges(as)
    }

    const as = stores.fixedForexStore.getStore('assets');
    setGauges(as)

    stores.emitter.on(FIXED_FOREX_UPDATED, forexUpdated);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, forexUpdated);
    };
  }, []);

  return (
    <div className={ classes.container}>
      <Typography variant="h5" className={ classes.title}>Available Pools</Typography>
      <Paper elevation={0} className={ classes.tableContainer }>
        <GaugesTable gauges={gauges} />
      </Paper>
    </div>
  );
}
