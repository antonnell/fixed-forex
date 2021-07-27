import React, { useState, useEffect } from 'react';

import { Typography, Paper, TextField, InputAdornment, Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import Head from 'next/head';
import Layout from '../../components/layout/layout.js';
import YcdpOverview from '../../components/ycdpOverview';
import YcdpQuickAction from '../../components/ycdpQuickAction';
import YcdpTable from '../../components/ycdpTable';

import classes from './asset.module.css';

import stores from '../../stores/index.js';
import { FIXED_FOREX_UPDATED } from '../../stores/constants';
import { formatCurrency } from '../../utils';

function YCDP({ changeTheme }) {

  const [cdpAssets, setCDPAssets] = useState([{}, {}, {}]);

  useEffect(function () {
    const fixedForexUpdated = () => {
    };
    //set default assets


    //register emitters
    stores.emitter.on(FIXED_FOREX_UPDATED, fixedForexUpdated);

    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, fixedForexUpdated);
    };
  }, []);

  return (
    <Layout changeTheme={changeTheme}>
      <Head>
        <title>YCDP</title>
      </Head>
      <div className={classes.cdpContainer}>
        <YcdpOverview />
        <YcdpQuickAction />
        <div className={ classes.cdpTableContainer } >
          <YcdpTable cdpAssets={ cdpAssets } />
        </div>
      </div>
    </Layout>
  );
}

export default YCDP;
