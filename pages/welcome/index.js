import Head from 'next/head';
import Layout from '../../components/layoutWelcome/layoutWelcome.js';
import Swap from '../../components/ffSwaps';
import Overview from '../../components/WelcomeOverview';
import Assets from '../../components/ffAssets';

import classes from './welcome.module.css';

function Welcome({ changeTheme }) {

  return (
    <Layout changeTheme={changeTheme} title={ '' }>
      <Head>
        <title>Welcome to Fixed Forex</title>
      </Head>
      <div className={classes.ffContainer}>
        <Overview />
      </div>
    </Layout>
  );
}

// <Swap />

export default Welcome;
