import React, { useState, useEffect } from 'react';

import { Typography, Switch, Button, SvgIcon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles';
import { useRouter } from "next/router";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

import { CONNECT_WALLET,CONNECTION_DISCONNECTED, ACCOUNT_CONFIGURED, ACCOUNT_CHANGED, FIXED_FOREX_BALANCES_RETURNED, FIXED_FOREX_CLAIM_VECLAIM, FIXED_FOREX_VECLAIM_CLAIMED, FIXED_FOREX_UPDATED, ERROR } from '../../stores/constants';

import Unlock from '../unlock';

import stores from '../../stores';
import { formatAddress } from '../../utils';

import classes from './welcomeHeader.module.css';
import HelpIcon from '@material-ui/icons/Help';

function WrongNetworkIcon(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 64 64" stroke-width="1" className={className}>
      <g stroke-width="2" transform="translate(0, 0)"><path fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" d="M33.994,42.339 C36.327,43.161,38,45.385,38,48c0,3.314-2.686,6-6,6c-2.615,0-4.839-1.673-5.661-4.006" stroke-linejoin="miter"></path> <path fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" d="M47.556,32.444 C43.575,28.462,38.075,26,32,26c-6.075,0-11.575,2.462-15.556,6.444" stroke-linejoin="miter"></path> <path fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" d="M59.224,21.276 C52.256,14.309,42.632,10,32,10c-10.631,0-20.256,4.309-27.224,11.276" stroke-linejoin="miter"></path> <line data-color="color-2" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="10" y1="54" x2="58" y2="6" stroke-linejoin="miter"></line></g>
      </SvgIcon>
  );
}

const StyledSwitch = withStyles((theme) => ({
  root: {
    width: 58,
    height: 32,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    paddingTop: 1.5,
    width: '75%',
    margin: 'auto',
    '&$checked': {
      transform: 'translateX(28px)',
      color: 'rgba(128,128,128, 1)',
      width: '30%',
      '& + $track': {
        backgroundColor: 'rgba(0,0,0, 0.3)',
        opacity: 1,
      },
    },
    '&$focusVisible $thumb': {
      color: '#ffffff',
      border: '6px solid #fff',
    },
  },
  track: {
    borderRadius: 32 / 2,
    border: '1px solid rgba(128,128,128, 0.2)',
    backgroundColor: 'rgba(0,0,0, 0)',
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

function Header(props) {

  const accountStore = stores.accountStore.getStore('account');
  const router = useRouter();

  const [account, setAccount] = useState(accountStore);
  const [toggleAboutModal, setToggleAboutModal] = useState(false);
  const [darkMode, setDarkMode] = useState(props.theme.palette.type === 'dark' ? true : false);
  const [unlockOpen, setUnlockOpen] = useState(false);
  const [chainInvalid, setChainInvalid] = useState(false)
  const [claimable, setClaimable] = useState(0)
  const [loading, setLoading] = useState(false)

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
    const balancesReturned = () => {
      const rewards = stores.fixedForexStore.getStore('rewards')
      setClaimable(rewards?.veClaimRewards?.claimable)
    }
    const claimedReturned = () => {
      const rewards = stores.fixedForexStore.getStore('rewards')
      setClaimable(rewards?.veClaimRewards?.claimable)
      setLoading(false)
    }

    const invalid = stores.accountStore.getStore('chainInvalid');
    setChainInvalid(invalid)

    stores.emitter.on(ACCOUNT_CONFIGURED, accountConfigure);
    stores.emitter.on(CONNECT_WALLET, connectWallet);
    stores.emitter.on(ACCOUNT_CHANGED, accountChanged);
    stores.emitter.on(FIXED_FOREX_UPDATED, balancesReturned);
    stores.emitter.on(FIXED_FOREX_BALANCES_RETURNED, balancesReturned);
    stores.emitter.on(FIXED_FOREX_VECLAIM_CLAIMED, claimedReturned);
    stores.emitter.on(ERROR, claimedReturned);
    return () => {
      stores.emitter.removeListener(ACCOUNT_CONFIGURED, accountConfigure);
      stores.emitter.removeListener(CONNECT_WALLET, connectWallet);
      stores.emitter.removeListener(ACCOUNT_CHANGED, accountChanged);
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, balancesReturned);
      stores.emitter.removeListener(FIXED_FOREX_BALANCES_RETURNED, balancesReturned);
      stores.emitter.removeListener(FIXED_FOREX_VECLAIM_CLAIMED, claimedReturned);
      stores.emitter.removeListener(ERROR, claimedReturned);
    };
  }, []);

  const handleToggleChange = (event, val) => {
    setDarkMode(val);
    props.changeTheme(val);
  };

  const onAddressClicked = () => {
    setUnlockOpen(true);
  };

  const closeUnlock = () => {
    setUnlockOpen(false);
  };

  useEffect(function () {
    const localStorageDarkMode = window.localStorage.getItem('yearn.finance-dark-mode');
    setDarkMode(localStorageDarkMode ? localStorageDarkMode === 'dark' : false);
  }, []);

  const navigate = (url) => {
    router.push(url)
  }

  const callClaim = () => {
    setLoading(true)
    stores.dispatcher.dispatch({ type: FIXED_FOREX_CLAIM_VECLAIM, content: {} })
  }

  const switchChain =async()=>{
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId:'0x1' }],
      });
    } catch (switchError) {
      console.log("switch error",switchError)
    }
  }

  return (
    <div>
      <Paper elevation={0} className={classes.headerContainer}>
        {
          props.title && <Typography className={ classes.pageTitle }>
            { props.title }
          </Typography>
        }
        <a onClick={() => router.push('/')} className={classes.linkz}>
        <SvgIcon
          viewBox="0 0 149 26"
          fill="none"
          width="120px"
          height="26px"
          className={classes.yearnLogo}
        >
        <g>
        	<ellipse fill="#FFFFFF" class="st0" cx="11.1" cy="13" rx="10.9" ry="10.9"/>
        	<g>
        		<rect x="40.2" y="8.7" width="4.4" height="13.9"/>
        		<path d="M32.6,4.9c-0.5,0.7-0.8,1.6-0.8,2.8v1H30v2.8h1.8v11.1h4.4V11.5h2.6V8.7h-2.6V8c0-1.5,1-1.7,2.6-1.6V3.2
        			C36.2,2.9,33.7,3.3,32.6,4.9z"/>
        		<rect x="40.2" y="3.1" width="4.4" height="3.6"/>
        		<polygon points="60.2,8.7 55.5,8.7 53.6,12.2 53.5,12.2 51.4,8.7 46.4,8.7 50.8,15.3 45.9,22.6 50.8,22.6 53.3,18.4 53.3,18.4
        			55.6,22.6 60.8,22.6 56,15.2 		"/>
        		<path d="M72.2,10c-1.2-1.1-2.8-1.7-4.8-1.7c-4.2,0-7.1,3.2-7.1,7.3c0,4.2,2.8,7.4,7.4,7.4c1.8,0,3.2-0.5,4.3-1.3
        			c1.2-0.8,2-2,2.3-3.3h-4.3c-0.4,0.9-1.1,1.4-2.3,1.4c-1.8,0-2.9-1.2-3.1-3h10C74.7,13.9,73.9,11.5,72.2,10z M64.7,14.1
        			c0.3-1.7,1.2-2.7,2.9-2.7c1.4,0,2.5,1.1,2.6,2.7H64.7z"/>
        		<path d="M85.6,10.2L85.6,10.2c-0.9-1.2-2-2-4-2c-3.6,0-6.1,3-6.1,7.4c0,4.6,2.5,7.4,6.1,7.4c1.8,0,3.3-0.9,4.1-2.3h0.1v1.9H90V3.1
        			h-4.4V10.2z M82.7,19.5C81,19.5,80,18,80,15.6c0-2.3,1-4,2.8-4c1.9,0,2.9,1.7,2.9,4C85.7,17.9,84.6,19.5,82.7,19.5z"/>
        		<path d="M96.2,6.1c0-1.1,0.4-1.6,1.8-1.6h0.7V3c-0.1,0-0.8,0-1,0c-2.1,0-3.3,0.9-3.3,3v2.5h-2v1.4h2v12.7h1.7V9.9h2.6V8.5h-2.6
        			V6.1z"/>
        		<path d="M105.9,8.2c-4,0-6.5,3.2-6.5,7.4c0,4.2,2.5,7.4,6.5,7.4c4,0,6.5-3.2,6.5-7.4C112.4,11.4,110,8.2,105.9,8.2z M105.9,21.5
        			c-3.2,0-4.8-2.7-4.8-6c0-3.3,1.6-6,4.8-6c3.1,0,4.8,2.7,4.8,6C110.7,18.8,109.1,21.5,105.9,21.5z"/>
        		<path d="M116.3,11.1L116.3,11.1l-0.1-2.6h-1.7v14h1.7v-8c0-1.7,0.7-3,1.8-3.8c0.9-0.6,2-0.8,3-0.7V8.5c-0.1,0-0.2-0.1-0.5-0.1
        			C118.6,8.4,117.1,9.5,116.3,11.1z"/>
        		<path d="M127.9,8.2c-3.9,0-6.4,3.2-6.4,7.4c0,4.2,2.3,7.4,6.5,7.4c3.2,0,5.1-1.8,5.7-4.6h-1.6c-0.5,1.9-1.8,3.2-4.1,3.2
        			c-3.2,0-4.7-2.5-4.8-5.6h10.7C134,11.9,132.4,8.2,127.9,8.2z M127.9,9.6c2.9,0,4.2,2.2,4.3,4.9h-8.9
        			C123.6,11.7,125.1,9.6,127.9,9.6z"/>
        		<polygon points="141.3,15 145.8,8.5 143.9,8.5 140.3,13.9 140.2,13.9 136.5,8.5 134.6,8.5 139.3,15.1 134,22.6 135.9,22.6
        			140.2,16.2 140.3,16.2 144.7,22.6 146.7,22.6 		"/>
        	</g>
        	<path id="Path_28" fill="#2D7DDB" d="M18.3,12.2l-6.1,7H6.3l6.9-7.9h8.7c-0.2-1.4-0.7-2.8-1.5-4.1h-5.2l-6.1,7H3.2l6.9-7.9h9.7
        		C16.1,1.5,9.2,0.5,4.3,4.2c-4.8,3.7-5.8,10.6-2.1,15.4c3.7,4.8,10.6,5.8,15.4,2.1c2.7-2.1,4.4-5.3,4.3-8.8c0-0.3,0-0.5,0-0.7
        		L18.3,12.2z"/>
        </g>
        </SvgIcon>
        </a>

        <div className={classes.themeSelectContainer}>
          <StyledSwitch
            icon={<Brightness2Icon className={classes.switchIcon} />}
            checkedIcon={<WbSunnyOutlinedIcon className={classes.switchIcon} />}
            checked={darkMode}
            onChange={handleToggleChange}
          />
        </div>


        <Button
          disableElevation
          className={classes.accountButton}
          variant="contained"
          color={props.theme.palette.type === 'dark' ? 'primary' : 'secondary'}
          onClick={onAddressClicked}>
          {account && account.address && <div className={`${classes.accountIcon} ${classes.metamask}`}></div>}
          <Typography className={classes.headBtnTxt}>{account && account.address ? formatAddress(account.address) : 'Connect Wallet'}</Typography>
        </Button>
        {unlockOpen && <Unlock modalOpen={unlockOpen} closeModal={closeUnlock} />}
    </Paper>
    {chainInvalid ? (
      <div className={classes.chainInvalidError}>
        <div className={classes.ErrorContent}>
          <WrongNetworkIcon className={ classes.networkIcon } />
          <Typography className={classes.ErrorTxt}>
            The chain you're connected to isn't supported. Please check that your wallet is connected to Ethereum Mainnet.
          </Typography>
          <Button className={classes.switchNetworkBtn} variant="contained" onClick={()=>switchChain()} >Switch to Ethereum Mainnet</Button>
        </div>
      </div>
    ) : null}
    </div>
  );
}

export default withTheme(Header);
