import Head from 'next/head';
import Layout from '../../components/layoutWelcome/layoutWelcome.js';
import Overview from '../../components/WelcomeOverview';

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

export default Welcome;
