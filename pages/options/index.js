import Head from 'next/head';
import { Typography, Button, Paper, SvgIcon } from "@material-ui/core";
import Layout from '../../components/layout/layout.js';
import OptionsOverview from '../../components/ffOptionsOverview';
import FFOptions from '../../components/ffOptions';

import React, { useState, useEffect } from 'react';
import { CONNECT_WALLET, ACCOUNT_CONFIGURED } from '../../stores/constants';
import stores from '../../stores';
import { useRouter } from "next/router";
import Unlock from '../../components/unlock';

import classes from './options.module.css';

function BalanceIcon(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 64 64" stroke-width="1" className={className}>
      <g stroke-width="1" transform="translate(0, 0)"><path d="M57,37A24,24,0,0,1,9,37V9L33,3,57,9Z" fill="none" stroke="#4585d6" stroke-linecap="square" stroke-miterlimit="10" stroke-width="1" stroke-linejoin="miter"></path><circle cx="33" cy="38" r="1" fill="none" stroke="#4585d6" stroke-linecap="square" stroke-miterlimit="10" stroke-width="1" data-color="color-2" stroke-linejoin="miter"></circle><rect x="23" y="31" width="20" height="14" fill="none" stroke="#4585d6" stroke-linecap="square" stroke-miterlimit="10" stroke-width="1" data-color="color-2" stroke-linejoin="miter"></rect><path d="M27,31V23a6,6,0,0,1,6-6h0a6,6,0,0,1,6,6v8" fill="none" stroke="#4585d6" stroke-linecap="square" stroke-miterlimit="10" stroke-width="1" data-color="color-2" stroke-linejoin="miter"></path></g>
    </SvgIcon>
  );
}

function Options({ changeTheme }) {

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
          <Typography className={classes.mainHeading} variant='h1'>rKP3R Options</Typography>
          <Typography className={classes.mainDesc} variant='body2'>
            You can redeem rKP3R for the KP3R CALL option at 50% discount at any time, once created, you have 24 hours to exercise the CALL.
          </Typography>
          <OptionsOverview />
          <FFOptions />
        </div>
         :
         <Paper className={classes.notConnectedContent}>
         <BalanceIcon className={ classes.overviewIcon } />
         <Typography className={classes.mainHeadingNC} variant='h1'>rKP3R Options</Typography>
         <Typography className={classes.mainDescNC} variant='body2'>
           You can redeem rKP3R for the KP3R CALL option at 50% discount at any time, once created, you have 24 hours to exercise the CALL.
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

export default Options;
