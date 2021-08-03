import React, { useState, useEffect } from 'react';

import { Typography, Paper, TextField, InputAdornment, Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import Head from 'next/head';
import Layout from '../../components/layout/layout.js';
import Swap from '../../components/ffSwaps';
import Overview from '../../components/ffOverview';
import Assets from '../../components/ffAssets';

import classes from './home.module.css';

import stores from '../../stores/index.js';
import { FIXED_FOREX_UPDATED } from '../../stores/constants';
import { formatCurrency } from '../../utils';

function Home({ changeTheme }) {

  return (
    <Layout changeTheme={changeTheme}>
      <Head>
        <title>Fixed Forex</title>
      </Head>
      <div className={classes.ffContainer}>
        <Overview />
        <Assets />
      </div>
    </Layout>
  );
}

// <Swap />

export default Home;
