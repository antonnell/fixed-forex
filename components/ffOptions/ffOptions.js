import React, { useState, useEffect, useCallback } from 'react';
import { Paper } from '@material-ui/core';

import classes from './ffOptions.module.css';

import OptionsTable from './ffOptionsTable.js'

import stores from '../../stores'
import { FIXED_FOREX_UPDATED } from '../../stores/constants';

export default function ffOptions() {

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const [assets, setAssets] = useState([])

  useEffect(() => {
    const forexUpdated = () => {
      const as = stores.fixedForexStore.getStore('assets');
      setAssets(as)
      forceUpdate()
    }

    const as = stores.fixedForexStore.getStore('assets');
    setAssets(as)

    stores.emitter.on(FIXED_FOREX_UPDATED, forexUpdated);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, forexUpdated);
    };
  }, []);

  return (
    <Paper elevation={0}  className={ classes.container}>
      <OptionsTable assets={assets} />
    </Paper>
  );
}
