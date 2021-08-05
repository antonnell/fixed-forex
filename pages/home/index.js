import Head from 'next/head';
import Layout from '../../components/layout/layout.js';
import Swap from '../../components/ffSwaps';
import Overview from '../../components/ffOverview';
import Assets from '../../components/ffAssets';

import classes from './home.module.css';

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
