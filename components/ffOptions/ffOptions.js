import React, { useState, useEffect, useCallback } from 'react';
import { Paper } from '@material-ui/core';

import classes from './ffOptions.module.css';

import OptionsTable from './ffOptionsTable.js'

import stores from '../../stores'
import { FIXED_FOREX_UPDATED } from '../../stores/constants';

export default function ffOptions() {

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const [oKP3ROptions, setOKP3ROptions] = useState([])

  useEffect(() => {
    const forexUpdated = () => {
      setOKP3ROptions(stores.fixedForexStore.getStore('oKP3ROptions'))
      forceUpdate()
    }

    setOKP3ROptions(stores.fixedForexStore.getStore('oKP3ROptions'))

    stores.emitter.on(FIXED_FOREX_UPDATED, forexUpdated);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, forexUpdated);
    };
  }, []);

  return (
    <Paper elevation={0}  className={ classes.container}>
      <OptionsTable oKP3ROptions={oKP3ROptions} />
    </Paper>
  );
}
