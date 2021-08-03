import React, { useState, useEffect } from 'react';
import BigNumber from 'bignumber.js';

import Head from 'next/head';
import Layout from '../../components/layout/layout.js';
import Vesting from '../../components/ffVest';
import Overview from '../../components/ffOverview';
import Claim from '../../components/ffClaim';

import classes from './vest.module.css';

import stores from '../../stores/index.js';
import { FIXED_FOREX_UPDATED } from '../../stores/constants';
import { formatCurrency } from '../../utils';

function Vest({ changeTheme }) {

  const [ ibff, setIBFF] = useState(null)
  const [ veIBFF, setVeIBFF] = useState(null)

  useEffect(() => {
    const forexUpdated = () => {
      setIBFF(stores.fixedForexStore.getStore('ibff'))
      setVeIBFF(stores.fixedForexStore.getStore('veIBFF'))
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
        <Overview />
        <Vesting />
        { !(ibff && veIBFF && BigNumber(ibff.balance).eq(0) && BigNumber(veIBFF.balance).eq(0)) &&
          <Claim />
        }
      </div>
    </Layout>
  );
}

export default Vest;
