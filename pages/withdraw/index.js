import Head from 'next/head';
import { Typography, Button, Paper, SvgIcon } from "@material-ui/core";
import Layout from '../../components/layout/layout.js';
import Overview from '../../components/ffOverview';
import OldAssets from '../../components/ffOldAssets';

import classes from './withdraw.module.css';

import React, { useState, useEffect } from 'react';
import { CONNECT_WALLET, ACCOUNT_CONFIGURED } from '../../stores/constants';
import stores from '../../stores';
import { useRouter } from "next/router";
import Unlock from '../../components/unlock';

function BalanceIcon(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 64 64" strokeWidth="1" className={className}>
      <g strokeWidth="1" transform="translate(0, 0)"><path d="M49,41l6.331-3.8a4.415,4.415,0,0,1,5.983,1.4h0A4.413,4.413,0,0,1,60.3,44.475L49,53.229a6,6,0,0,1-2.218,1.076L26.527,59.368a6,6,0,0,1-4.714-.783L7,49H2V33l9.958-1.66a6,6,0,0,1,3.859.651L25,37l14.911.785A4.315,4.315,0,0,1,44,42.094h0a4.316,4.316,0,0,1-3.886,4.3L24,48" fill="none" stroke="#4585d6" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1" strokeLinejoin="miter"></path><circle cx="39" cy="16" r="12" fill="none" stroke="#4585d6" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1" data-color="color-2" strokeLinejoin="miter"></circle><rect x="35.464" y="12.464" width="7.071" height="7.071" strokeWidth="1" fill="none" stroke="#4585d6" strokeLinecap="square" strokeMiterlimit="10" transform="translate(0.109 32.263) rotate(-45)" data-color="color-2" strokeLinejoin="miter"></rect></g>
    </SvgIcon>
  );
}

function Withdraw({ changeTheme }) {

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
            <Typography className={classes.mainHeading} variant='h1'>Withdraw Inactive</Typography>
            <Typography className={classes.mainDesc} variant='body2'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </Typography>
            <Overview />
            <OldAssets />
          </div>
           :
           <Paper className={classes.notConnectedContent}>
           <BalanceIcon className={ classes.overviewIcon } />
           <Typography className={classes.mainHeadingNC} variant='h1'>Withdraw Inactive</Typography>
           <Typography className={classes.mainDescNC} variant='body2'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
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

export default Withdraw;
