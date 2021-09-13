import Head from 'next/head';
import Layout from '../../components/layout/layout.js';
import ClaimAll from '../../components/ffClaimAll';
import Overview from '../../components/ffOverview';

import classes from './rewards.module.css';

function Rewards({ changeTheme }) {

  return (
    <Layout changeTheme={changeTheme}>
      <Head>
        <title>Fixed Forex</title>
      </Head>
      <div className={classes.ffContainer}>
        <Overview />
        <ClaimAll />
      </div>
    </Layout>
  );
}

export default Rewards;
