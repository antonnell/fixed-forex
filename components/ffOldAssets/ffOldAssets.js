import React, { useState, useEffect, useCallback } from 'react';
import { Paper } from '@material-ui/core';

import classes from './ffOldAssets.module.css';

import AssetsTable from './ffOldAssetsTable.js'

import stores from '../../stores'
import { FIXED_FOREX_UPDATED } from '../../stores/constants';

export default function ffOldAssets() {

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const [assets, setAssets] = useState([])

  useEffect(() => {
    const forexUpdated = () => {
      setAssets(stores.fixedForexStore.getStore('oldAssets'))
      forceUpdate()
    }

    setAssets(stores.fixedForexStore.getStore('oldAssets'))

    stores.emitter.on(FIXED_FOREX_UPDATED, forexUpdated);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, forexUpdated);
    };
  }, []);

  return (
    <Paper elevation={0}  className={ classes.container}>
      <AssetsTable assets={assets} />
    </Paper>
  );
}
