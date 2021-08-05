import React, { useState, useEffect, useCallback } from 'react';
import BigNumber from 'bignumber.js';

import Head from 'next/head';
import Layout from '../../components/layout/layout.js';
import VoteOverview from '../../components/ffVoteOverview';
import CastVote from '../../components/ffVoteCast';
import Gauges from '../../components/ffGauges';

import classes from './vote.module.css';

import stores from '../../stores/index.js';
import { FIXED_FOREX_UPDATED } from '../../stores/constants';
import { formatCurrency } from '../../utils';

function Vote({ changeTheme }) {

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [ ibff, setIBFF] = useState(null)
  const [ veIBFF, setVeIBFF] = useState(null)

  useEffect(() => {
    const forexUpdated = () => {
      setIBFF(stores.fixedForexStore.getStore('ibff'))
      setVeIBFF(stores.fixedForexStore.getStore('veIBFF'))
      forceUpdate()
    }

    setIBFF(stores.fixedForexStore.getStore('ibff'))
    setVeIBFF(stores.fixedForexStore.getStore('veIBFF'))

    stores.emitter.on(FIXED_FOREX_UPDATED, forexUpdated);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, forexUpdated);
    };
  }, []);

  return (
    <Layout changeTheme={changeTheme}>
      <Head>
        <title>Fixed Forex</title>
      </Head>
      <div className={classes.ffContainer}>
        <VoteOverview />
        <Gauges />
      </div>
    </Layout>
  );
}

export default Vote;
