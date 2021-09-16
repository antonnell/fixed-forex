import Head from 'next/head';
import Layout from '../../components/layout/layout.js';
import Overview from '../../components/ffOverview';
import OldAssets from '../../components/ffOldAssets';

import classes from './home.module.css';

function Withdraw({ changeTheme }) {

  return (
    <Layout changeTheme={changeTheme} title={ '' }>
      <Head>
        <title>Fixed Forex</title>
      </Head>
      <div className={classes.ffContainer}>
        <Overview />
        <OldAssets />
      </div>
    </Layout>
  );
}

export default Withdraw;
