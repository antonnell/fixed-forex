import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Typography, Paper, TextField, InputAdornment, Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import Head from 'next/head';
import Layout from '../../../../components/layout/layout.js';
import FfAssetOverview from '../../../../components/ffAssetOverview'
import FFCurveLiquidity from '../../../../components/ffCurveLiquidity'
import FFCurveGauge from '../../../../components/ffCurveGauge'

import classes from './curve.module.css';

import stores from '../../../../stores/index.js';
import { FIXED_FOREX_UPDATED } from '../../../../stores/constants';
import { formatCurrency } from '../../../../utils';

function Asset({ changeTheme }) {

  const router = useRouter();
  const [asset, setAsset] = useState(null);

  useEffect(function () {
    const fixedForexUpdated = () => {
      const ass = stores.fixedForexStore.getAsset(router.query.address)
      setAsset(ass)
    };

    //set asset
    const ass = stores.fixedForexStore.getAsset(router.query.address)
    setAsset(ass)

    //register emitters
    stores.emitter.on(FIXED_FOREX_UPDATED, fixedForexUpdated);

    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, fixedForexUpdated);
    };
  }, []);

  return (
    <Layout changeTheme={changeTheme}>
      <Head>
        <title>Fixed Forex</title>
      </Head>
      <div className={classes.container}>
        <FfAssetOverview asset={ asset } />
        <FFCurveLiquidity asset={ asset } />
      </div>
    </Layout>
  );
}

export default Asset;
