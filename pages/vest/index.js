import React, { useState, useEffect, useCallback } from 'react';
import BigNumber from 'bignumber.js';
import { Typography, Button, Paper, SvgIcon, Grid } from "@material-ui/core";
import Head from 'next/head';
import Layout from '../../components/layout/layout.js';
import Vesting from '../../components/ffVest';
import Overview from '../../components/ffVestOverview';
import Claim from '../../components/ffClaim';
import ClaimDistribution from '../../components/ffClaimDistirbution';

import classes from './vest.module.css';

import stores from '../../stores/index.js';
import { CONNECT_WALLET, ACCOUNT_CONFIGURED, FIXED_FOREX_UPDATED } from '../../stores/constants';
import { useRouter } from "next/router";
import Unlock from '../../components/unlock';

function BalanceIcon(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 64 64" stroke-width="1" className={className}>
      <g stroke-width="1" transform="translate(0, 0)"><rect data-color="color-2" x="9" y="10" fill="none" stroke="#4585d6" stroke-width="1" stroke-linecap="square" stroke-miterlimit="10" width="46" height="40" stroke-linejoin="miter"></rect> <line data-color="color-2" fill="none" stroke="#4585d6" stroke-width="1" stroke-linecap="square" stroke-miterlimit="10" x1="14" y1="57" x2="14" y2="61" stroke-linejoin="miter"></line> <line data-color="color-2" fill="none" stroke="#4585d6" stroke-width="1" stroke-linecap="square" stroke-miterlimit="10" x1="50" y1="57" x2="50" y2="61" stroke-linejoin="miter"></line> <rect x="2" y="3" fill="none" stroke="#4585d6" stroke-width="1" stroke-linecap="square" stroke-miterlimit="10" width="60" height="54" stroke-linejoin="miter"></rect> <line data-cap="butt" fill="none" stroke="#4585d6" stroke-width="1" stroke-miterlimit="10" x1="27.757" y1="25.757" x2="22.103" y2="20.103" stroke-linejoin="miter" stroke-linecap="butt"></line> <line data-cap="butt" fill="none" stroke="#4585d6" stroke-width="1" stroke-miterlimit="10" x1="36.243" y1="25.757" x2="41.897" y2="20.103" stroke-linejoin="miter" stroke-linecap="butt"></line> <line data-cap="butt" fill="none" stroke="#4585d6" stroke-width="1" stroke-miterlimit="10" x1="36.243" y1="34.243" x2="41.897" y2="39.897" stroke-linejoin="miter" stroke-linecap="butt"></line> <line data-cap="butt" fill="none" stroke="#4585d6" stroke-width="1" stroke-miterlimit="10" x1="27.757" y1="34.243" x2="22.103" y2="39.897" stroke-linejoin="miter" stroke-linecap="butt"></line> <circle fill="none" stroke="#4585d6" stroke-width="1" stroke-linecap="square" stroke-miterlimit="10" cx="32" cy="30" r="14" stroke-linejoin="miter"></circle> <circle fill="none" stroke="#4585d6" stroke-width="1" stroke-linecap="square" stroke-miterlimit="10" cx="32" cy="30" r="6" stroke-linejoin="miter"></circle></g>
    </SvgIcon>
  );
}

function Vest({ changeTheme }) {

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
    <Layout changeTheme={changeTheme} title={ '' }>
      <Head>
        <title>Fixed Forex</title>
      </Head>
      <div className={classes.ffContainer}>

        {account && account.address ?
          <div className={classes.connected}>
            <Overview />

            <Grid container spacing={0} className={classes.gridWrapper}>
              <Grid item lg={8} md={12} sm={12} xs={12}>
                <Vesting />
              </Grid>
              <Grid item lg={4} md={12} sm={12} xs={12} className={classes.xxx}>
                { !(BigNumber(ibff ? ibff.balance : 0).eq(0) && BigNumber(veIBFF && veIBFF.vestingInfo ? veIBFF.vestingInfo.locked : 0).eq(0)) &&
                  <Claim />
                }
                { !(BigNumber(ibff ? ibff.balance : 0).eq(0) && BigNumber(veIBFF && veIBFF.vestingInfo ? veIBFF.vestingInfo.locked : 0).eq(0)) &&
                  <ClaimDistribution />
                }
              </Grid>
            </Grid>
          </div>
           :
           <Paper className={classes.notConnectedContent}>
           <BalanceIcon className={ classes.overviewIcon } />
           <Typography className={classes.mainHeadingNC} variant='h1'>Vest</Typography>
           <Typography className={classes.mainDescNC} variant='body2'>
            Vesting your kp3r in the Fixed Forex gauge means that you will be locking up your assets in order to gain a voting right in how the protocol emits rewards.
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

export default Vest;
