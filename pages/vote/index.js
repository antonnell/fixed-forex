import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Button, Paper, SvgIcon } from "@material-ui/core";
import Head from 'next/head';
import Layout from '../../components/layout/layout.js';
import VoteOverview from '../../components/ffVoteOverview';
import Gauges from '../../components/ffGauges';

import { useRouter } from "next/router";
import Unlock from '../../components/unlock';

import classes from './vote.module.css';

import stores from '../../stores/index.js';
import { CONNECT_WALLET, ACCOUNT_CONFIGURED, FIXED_FOREX_UPDATED } from '../../stores/constants';
import { formatCurrency } from '../../utils';

function BalanceIcon(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 64 64" strokeWidth="1" className={className}>
      <g strokeWidth="1" transform="translate(0, 0)"><path data-cap="butt" d="M21,60H50.664a6,6,0,0,0,5.857-4.7l5.334-24A6,6,0,0,0,56,24H36V12c0-9-8-9-8-9a60.277,60.277,0,0,1-3,15c-2.021,5.417-8.636,9.546-10,15" fill="none" stroke="#9400D3" strokeMiterlimit="10" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter"></path><rect data-color="color-2" x="2" y="27" width="13" height="33" fill="none" stroke="#9400D3" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1" strokeLinejoin="miter"></rect></g>
    </SvgIcon>
  );
}

function Vote({ changeTheme }) {

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

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [ ibff, setIBFF] = useState(null)
  const [ veIBFF, setVeIBFF] = useState(null)

  useEffect(() => {
    const forexUpdated = () => {
      setIBFF(stores.fixedForexStore.getStore('ibff'))
      setVeIBFF(stores.fixedForexStore.getStore('veIBFF'))
      forceUpdate()
    }

    setIBFF(stores.fixedForexStore.getStore('ibff'))
    setVeIBFF(stores.fixedForexStore.getStore('veIBFF'))

    stores.emitter.on(FIXED_FOREX_UPDATED, forexUpdated);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, forexUpdated);
    };
  }, []);

  return (
    <Layout changeTheme={changeTheme}>
      <Head>
        <title>Fixed Forex</title>
      </Head>
      <div className={classes.ffContainer}>

        {account && account.address ?
          <div className={classes.connected}>
            <Typography className={classes.mainHeading} variant='h1'>Vote</Typography>
            <Typography className={classes.mainDesc} variant='body2'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </Typography>
            <VoteOverview />
            <Gauges />
          </div>
           :
           <Paper className={classes.notConnectedContent}>
           <BalanceIcon className={ classes.overviewIcon } />
           <Typography className={classes.mainHeadingNC} variant='h1'>Vote</Typography>
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

export default Vote;
