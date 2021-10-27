import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { Paper, Grid, Typography, Button, TextField, InputAdornment, CircularProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Skeleton from '@material-ui/lab/Skeleton';

import classes from './ffWelcomeOverview.module.css';


import { CONNECT_WALLET, ACCOUNT_CONFIGURED, ACCOUNT_CHANGED, FIXED_FOREX_BALANCES_RETURNED, FIXED_FOREX_CLAIM_VECLAIM, FIXED_FOREX_VECLAIM_CLAIMED, FIXED_FOREX_UPDATED, ERROR } from '../../stores/constants';

import Unlock from '../unlock';

import stores from '../../stores';
import { formatAddress } from '../../utils';


export default function ffWelcomeOverview() {

  const router = useRouter();

  function handleNavigate(route) {
    router.push(route);
  }

  const accountStore = stores.accountStore.getStore('account');
  const [account, setAccount] = useState(accountStore);
  const [toggleAboutModal, setToggleAboutModal] = useState(false);
  const [unlockOpen, setUnlockOpen] = useState(false);
  const [chainInvalid, setChainInvalid] = useState(false)

  useEffect(() => {
    const accountConfigure = () => {
      const accountStore = stores.accountStore.getStore('account');
      setAccount(accountStore);
      closeUnlock();
    };
    const connectWallet = () => {
      onAddressClicked();
    };
    const accountChanged = () => {
      const invalid = stores.accountStore.getStore('chainInvalid');
      setChainInvalid(invalid)
    }
    stores.dispatcher.register(payload => {

      switch (payload.type) {
      case 'CONFIGURE_FIXED_FOREX':
      if( payload.content.connected===true){
        router.push('/dashboard')
      }else{
        router.push('/welcome')
      }
    }

    });

    const invalid = stores.accountStore.getStore('chainInvalid');
    setChainInvalid(invalid)

    stores.emitter.on(ACCOUNT_CONFIGURED, accountConfigure);
    stores.emitter.on(CONNECT_WALLET, connectWallet);
    stores.emitter.on(ACCOUNT_CHANGED, accountChanged);
    return () => {
      stores.emitter.removeListener(ACCOUNT_CONFIGURED, accountConfigure);
      stores.emitter.removeListener(CONNECT_WALLET, connectWallet);
      stores.emitter.removeListener(ACCOUNT_CHANGED, accountChanged);
    };
  }, []);

  const onAddressClicked = () => {
    setUnlockOpen(true);
  };

  const closeUnlock = () => {
    setUnlockOpen(false);
  };

  return (
    <div className={ classes.container }>
      <div className={ classes.containerBG }>
      </div>
      <div className={ classes.fieldsContainer }>

        <br /><br /><br />

        <Grid container spacing={3} className={classes.testColor}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography variant="h1" className={classes.welcomeTitle}>Welcome to <span className={classes.blueTxt}>Fixed Forex</span></Typography>
            <Typography variant="body2" className={classes.welcomeSubtitle}>
              Supply Collateral to Borrow Iron Bank Assets. Fixed Forex provides an alternative to USD denominated stable coins. It allows liquidity providers exposure to currencies such as EUR, KRW, GBP, CHF, AUD, and JPY.
            </Typography>
            <Button
               className={classes.connectBtn}
              disableElevation
              variant="contained"
              onClick={onAddressClicked}>
              {account && account.address && <div className={`${classes.accountIcon} ${classes.metamask}`}></div>}
              <Typography className={classes.headBtnTxt}>{account && account.address ? formatAddress(account.address) : 'Connect Wallet'}</Typography>
            </Button>
            {unlockOpen && <Unlock modalOpen={unlockOpen} closeModal={closeUnlock} />}
            <Button onClick={() => router.push('/dashboard')} className={classes.continueBtn}>
              Continue to App
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
