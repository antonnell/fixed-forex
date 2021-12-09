import Head from 'next/head';
import { Typography, Button, Paper, SvgIcon } from "@material-ui/core";
import Layout from '../../components/layout/layout.js';
import SwapComponent from '../../components/ffSwap';
import Overview from '../../components/ffStakeOverview';

import React, { useState, useEffect } from 'react';
import { CONNECT_WALLET, ACCOUNT_CONFIGURED } from '../../stores/constants';
import stores from '../../stores';
import Unlock from '../../components/unlock';

import classes from './swap.module.css';

function Swap({ changeTheme }) {

  const accountStore = stores.accountStore.getStore('account');
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
    <Layout changeTheme={changeTheme}>
      <Head>
        <title>Fixed Forex</title>
      </Head>
      <div className={classes.ffContainer}>
        {account && account.address ?
          <SwapComponent />
           :
           <Paper className={classes.notConnectedContent}>
             <UniswapIcon className={ classes.overviewIcon } />
             <Typography className={classes.mainHeadingNC} variant='h1'>Uniswap Liquidity Pool</Typography>
             <Typography className={classes.mainDescNC} variant='body2'>
               Stake your KP3R + ETH Uniswap position to earn KP3R rewards on top of your current Uniswap fees.
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

export default Swap;
