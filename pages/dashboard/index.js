import Head from 'next/head';
import { Typography, Button, Paper, SvgIcon, Grid, Avatar } from "@material-ui/core";
import Layout from '../../components/layout/layout.js';
import ClaimAll from '../../components/ffDashboardClaimAll';
import Overview from '../../components/ffDashboardOverview';
import VoteOverview from '../../components/ffDashboardVoteOverview';
import MintOverview from '../../components/ffDashboardMintOverview';

import classes from './dashboard.module.css';

import React, { useState, useEffect } from 'react';
import { CONNECT_WALLET, ACCOUNT_CONFIGURED } from '../../stores/constants';
import stores from '../../stores';
import { useRouter } from "next/router";
import Unlock from '../../components/unlock';
import { formatAddress } from '../../utils';

function BalanceIcon(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 64 64" stroke-width="1" className={className}>
      <g stroke-width="1" transform="translate(0.5, 0.5)"><line data-color="color-2" x1="9" y1="39" x2="13" y2="39" fill="none" stroke="#4585d6" stroke-linecap="square" stroke-miterlimit="10" stroke-width="1" stroke-linejoin="miter"></line><line data-color="color-2" x1="32" y1="16" x2="32" y2="20" fill="none" stroke="#4585d6" stroke-linecap="square" stroke-miterlimit="10" stroke-width="1" stroke-linejoin="miter"></line><line data-color="color-2" x1="48.263" y1="22.737" x2="45.435" y2="25.565" fill="none" stroke="#4585d6" stroke-linecap="square" stroke-miterlimit="10" stroke-width="1" stroke-linejoin="miter"></line><line data-color="color-2" x1="55" y1="39" x2="51" y2="39" fill="none" stroke="#4585d6" stroke-linecap="square" stroke-miterlimit="10" stroke-width="1" stroke-linejoin="miter"></line><line data-color="color-2" x1="28.464" y1="35.464" x2="16" y2="23" fill="none" stroke="#4585d6" stroke-linecap="square" stroke-miterlimit="10" stroke-width="1" stroke-linejoin="miter"></line><circle data-color="color-2" cx="31.999" cy="39" r="5" fill="none" stroke="#4585d6" stroke-linecap="square" stroke-miterlimit="10" stroke-width="1" stroke-linejoin="miter"></circle><path d="M57.372,55A30,30,0,1,0,6.628,55Z" fill="none" stroke="#4585d6" stroke-linecap="square" stroke-miterlimit="10" stroke-width="1" stroke-linejoin="miter"></path></g>
      </SvgIcon>
  );
}

function Rewards({ changeTheme }) {

  function handleNavigate(route) {
    router.push(route);
  }

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
    <Layout changeTheme={changeTheme}>
      <Head>
        <title>Dashboard - Fixed Forex</title>
      </Head>
      <div className={classes.ffContainer}>

        {account && account.address ?

          <>

          <Paper elevation={0} className={classes.accountInfo}>

            <div className={classes.accountWrap}>

            <Grid container spacing={0}>

              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className={classes.avatarWrap}>
                  <Avatar className={classes.walletAvatar}>x0</Avatar>
                </div>
                <Typography className={classes.walletAddress}>{account && account.address ? formatAddress(account.address) : 'Connect Wallet'}</Typography>
              </Grid>
            </Grid>

            </div>

          </Paper>

          <div className={classes.connected}>

            <Grid container spacing={5} className={classes.contentGrid}>

              <Grid item lg={9} md={12} sm={12} xs={12}>
                <Grid container spacing={0}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Typography className={classes.mainHeading} variant='h1'>Collateral</Typography>
                    <Paper elevation={0} onClick={() => router.push('/mint')} className={classes.viewCollateral}>View</Paper>
                    <MintOverview />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Typography className={classes.mainHeading} variant='h1'>Vesting</Typography>
                    <Paper elevation={0} onClick={() => router.push('/vest')} className={classes.viewVesting}>View</Paper>
                    <Overview />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Typography className={classes.mainHeading} variant='h1'>Voting</Typography>
                    <Paper elevation={0} onClick={() => router.push('/vote')} className={classes.viewVoting}>View</Paper>
                    <VoteOverview />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item lg={3} md={12} sm={12} xs={12}>
              <Typography className={classes.mainHeading} variant='h1'>Rewards</Typography>
              <ClaimAll />
              </Grid>

            </Grid>

          </div>
          </>
           :
           <Paper className={classes.notConnectedContent}>
           <BalanceIcon className={ classes.overviewIcon } />
           <Typography className={classes.mainHeadingNC} variant='h1'>Dashboard</Typography>
           <Typography className={classes.mainDescNC} variant='body2'>
            An overview Assets.
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

export default Rewards;
