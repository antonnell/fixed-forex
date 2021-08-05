import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';
import Layout from '../../../components/layout/layout.js';
import FfAssetOverview from '../../../components/ffAssetOverview'
import FfMintBurn from '../../../components/ffMintBurn';
import FfLPOptions from '../../../components/ffLPOptions';

import classes from './asset.module.css';

import stores from '../../../stores/index.js';
import { FIXED_FOREX_UPDATED } from '../../../stores/constants';
import { formatCurrency } from '../../../utils';

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
        <FfAssetOverview asset={ asset } />
        <FfMintBurn asset={ asset } />
        <FfLPOptions asset={ asset } />
      </div>
    </Layout>
  );
}

export default Asset;
