import React, { useState, useEffect } from 'react';

import { Typography, Paper, TextField, InputAdornment, Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import Head from 'next/head';
import Layout from '../../components/layout/layout.js';
import StakeSLP from '../../components/ffStake';
import StakeDistribution from '../../components/ffStakeDistribution';
import StakeOverview from '../../components/ffStakeOverview';

import classes from './stake.module.css';

import stores from '../../stores/index.js';
import { FIXED_FOREX_UPDATED } from '../../stores/constants';
import { formatCurrency } from '../../utils';

function Stake({ changeTheme }) {

  return (
    <Layout changeTheme={changeTheme}>
      <Head>
        <title>Fixed Forex</title>
      </Head>
      <div className={classes.ffContainer}>
        <StakeOverview />
        <StakeSLP />
        <StakeDistribution />
      </div>
    </Layout>
  );
}

export default Stake;
