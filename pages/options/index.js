import Head from 'next/head';
import Layout from '../../components/layout/layout.js';
import OptionsOverview from '../../components/ffOptionsOverview';
import FFOptions from '../../components/ffOptions';

import classes from './options.module.css';

function Options({ changeTheme }) {

  return (
    <Layout changeTheme={changeTheme} title={ '' }>
      <Head>
        <title>Fixed Forex</title>
      </Head>
      <div className={classes.ffContainer}>
        <OptionsOverview />
        <FFOptions />
      </div>
    </Layout>
  );
}

export default Options;
