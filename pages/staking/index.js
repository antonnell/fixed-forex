import Head from 'next/head';
import Layout from '../../components/layout/layout.js';
import Tokens from '../../components/ffUniV3Tokens';
import Rewards from '../../components/ffUniV3Rewards';
import Overview from '../../components/ffStakeOverview';

import classes from './staking.module.css';

function Staking({ changeTheme }) {

  return (
    <Layout changeTheme={changeTheme}>
      <Head>
        <title>Fixed Forex</title>
      </Head>
      <div className={classes.ffContainer}>
        <Overview />
        <Tokens />
        <Rewards />
      </div>
    </Layout>
  );
}

export default Staking;
