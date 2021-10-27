import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Paper, Grid, Typography, Tooltip } from '@material-ui/core';

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import Head from 'next/head';
import Layout from '../../../../components/layout/layout.js';
import FfAssetOverview from '../../../../components/ffAssetOverview'
import FFCurveLiquidity from '../../../../components/ffCurveLiquidity'
import FFCurveGauge from '../../../../components/ffCurveGauge'
import FFClaimCurveGauge from '../../../../components/ffClaimCurveGauge'
import FFClaimCurveRKP3RGauge from '../../../../components/ffClaimCurveRKP3RGauge'

import classes from './curve.module.css';

import stores from '../../../../stores/index.js';
import { FIXED_FOREX_UPDATED } from '../../../../stores/constants';
import { formatCurrency } from '../../../../utils';

function Asset({ changeTheme }) {

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const router = useRouter();
  const [asset, setAsset] = useState(null);

  useEffect(function () {
    const fixedForexUpdated = () => {
      const ass = stores.fixedForexStore.getAsset(router.query.address)
      setAsset(ass)
      forceUpdate()
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

  useEffect(function () {
    //set asset
    const ass = stores.fixedForexStore.getAsset(router.query.address)
    setAsset(ass)
  }, [router.query.address])

  return (
    <Layout changeTheme={changeTheme}>
      <Head>
        <title>Fixed Forex</title>
      </Head>
      <div className={classes.container}>

        <div className={classes.backBtn} onClick={() => router.push('/home')}>
        <Tooltip placement="top" title="Back">
        <KeyboardBackspaceIcon />
        </Tooltip>
        </div>

        <FfAssetOverview asset={ asset } />


        <Grid container className={classes.xxxContainer} spacing={0}>
          <Grid className={classes.xxx} item lg={8} md={12} sm={12} xs={12}>
            <FFCurveLiquidity asset={ asset } />
            <FFCurveGauge asset={ asset } />
          </Grid>
          <Grid className={classes.columnRight} item lg={4} md={12} sm={12} xs={12}>
          <Typography variant="h5" className={ classes.title}>Claimable Rewards</Typography>
          <div className={classes.rewardsWrap}>
          <FFClaimCurveGauge asset={ asset } />
          <FFClaimCurveRKP3RGauge asset={ asset } />
          </div>
          </Grid>
        </Grid>



      </div>
    </Layout>
  );
}

export default Asset;
