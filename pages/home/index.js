import Head from 'next/head';
import { Typography, Button, Paper, SvgIcon } from "@material-ui/core";
import Layout from '../../components/layout/layout.js';
import Swap from '../../components/ffSwaps';
import Overview from '../../components/ffOverview';
import Assets from '../../components/ffAssets';

import React, { useState, useEffect } from 'react';
import { CONNECT_WALLET, ACCOUNT_CONFIGURED } from '../../stores/constants';
import stores from '../../stores';
import { useRouter } from "next/router";
import Unlock from '../../components/unlock';


import classes from './home.module.css';

function BalanceIcon(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 64 64" stroke-width="1" className={className}>
      <g stroke-width="1" transform="translate(0, 0)"><path data-color="color-2" fill="none" stroke="#4585d6" stroke-width="1" stroke-linecap="square" stroke-miterlimit="10" d="M40,28 c0-3.8,6-10,6-10s6,6.2,6,10s-3,6-6,6S40,31.8,40,28z" stroke-linejoin="miter"></path> <path data-color="color-2" fill="none" stroke="#4585d6" stroke-width="1" stroke-linecap="square" stroke-miterlimit="10" d="M20,14 c0-3.8,6-10,6-10s6,6.2,6,10s-3,6-6,6S20,17.8,20,14z" stroke-linejoin="miter"></path> <path data-cap="butt" fill="none" stroke="#4585d6" stroke-width="1" stroke-miterlimit="10" d="M10,34h2c4.6,0,9.6,2.4,12,6h8 c4,0,8,4,8,8H22" stroke-linejoin="miter" stroke-linecap="butt"></path> <path data-cap="butt" fill="none" stroke="#4585d6" stroke-width="1" stroke-miterlimit="10" d="M38.8,44H52c7.2,0,8,4,8,4L31.4,59.6 c-2.2,1-4.8,0.8-7-0.2L10,52" stroke-linejoin="miter" stroke-linecap="butt"></path> <rect x="2" y="30" fill="none" stroke="#4585d6" stroke-width="1" stroke-linecap="square" stroke-miterlimit="10" width="8" height="26" stroke-linejoin="miter"></rect></g>
    </SvgIcon>
  );
}

function Home({ changeTheme }) {

  const accountStore = stores.accountStore.getStore('account');
  const router = useRouter();
  const [account, setAccount] = useState(accountStore);
  const [unlockOpen, setUnlockOpen] = useState(false);

  useEffect(() => {
    const accountConfigure = () => {
      const accountStore = stores.accountStore.getStore('account');
      setAccount(accountStore);
      closeUnlock();
    };
    const connectWallet = () => {
      onAddressClicked();
    };

    stores.emitter.on(ACCOUNT_CONFIGURED, accountConfigure);
    stores.emitter.on(CONNECT_WALLET, connectWallet);
    return () => {
      stores.emitter.removeListener(ACCOUNT_CONFIGURED, accountConfigure);
      stores.emitter.removeListener(CONNECT_WALLET, connectWallet);
    };
  }, []);

  const onAddressClicked = () => {
    setUnlockOpen(true);
  };

  const closeUnlock = () => {
    setUnlockOpen(false);
  };

  return (
    <Layout changeTheme={changeTheme} title={ '' }>
      <Head>
        <title>Fixed Forex</title>
      </Head>
      <div className={classes.ffContainer}>

        {account && account.address ?
          <div className={classes.connected}>
            <Typography className={classes.mainHeading} variant='h1'>CRV Liquidity Providing</Typography>
            <Typography className={classes.mainDesc} variant='body2'>
              Earn Rewards. Providing liquidity to these LP’s allows you to hedge against USD risk, or simply have exposure in your own preferred currency, while earning LP incentives.
            </Typography>
            <Overview />
            <Assets />
          </div>
           :
           <Paper className={classes.notConnectedContent}>
           <BalanceIcon className={ classes.overviewIcon } />
           <Typography className={classes.mainHeadingNC} variant='h1'>Curve Liquidity Pools</Typography>
           <Typography className={classes.mainDescNC} variant='body2'>
             Earn Rewards. Providing liquidity to these LP’s allows you to hedge against USD risk, or simply have exposure in your own preferred currency, while earning LP incentives.
           </Typography>
           <Button
             disableElevation
             className={classes.buttonConnect}
             variant="contained"
             onClick={onAddressClicked}>
             {account && account.address && <div className={`${classes.accountIcon} ${classes.metamask}`}></div>}
             <Typography>Connect Wallet to Continue</Typography>
           </Button>
           </Paper>
         }
         {unlockOpen && <Unlock modalOpen={unlockOpen} closeModal={closeUnlock} />}

      </div>
    </Layout>
  );
}

// <Swap />

export default Home;
