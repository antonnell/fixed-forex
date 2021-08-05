import Head from 'next/head';
import Layout from '../../components/layout/layout.js';
import StakeSLP from '../../components/ffStake';
import StakeDistribution from '../../components/ffStakeDistribution';
import StakeOverview from '../../components/ffStakeOverview';

import classes from './stake.module.css';

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
