import React, { useState, useEffect } from 'react';
import { Typography, Paper, Switch, Button, Tooltip, Grid } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import { useRouter } from 'next/router';
import FFWarning  from '../ffWarning';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import TimerIcon from '@material-ui/icons/Timer';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import SpaceBarIcon from '@material-ui/icons/SpaceBar';
import WarningIcon from '@material-ui/icons/Warning';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import TableChartIcon from '@material-ui/icons/TableChart';
import BuildIcon from '@material-ui/icons/Build';

import { SvgIcon } from "@material-ui/core";

import Unlock from '../unlock';

import stores from '../../stores';
import { formatAddress } from '../../utils';

import classes from './navigation.module.css';

const StyledSwitch = withStyles((theme) => ({
  root: {
    width: 58,
    height: 32,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(28px)',
      color: '#212529',
      '& + $track': {
        backgroundColor: '#ffffff',
        opacity: 1,
      },
    },
    '&$focusVisible $thumb': {
      color: '#ffffff',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 32 / 2,
    border: `1px solid #212529`,
    backgroundColor: '#212529',
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

function Navigation(props) {
  const router = useRouter();

  const account = stores.accountStore.getStore('account');

  const [darkMode, setDarkMode] = useState(false);
  const [unlockOpen, setUnlockOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);

  function handleNavigate(route) {
    router.push(route);
  }

  const onMenuClicked = () => {
    setMenuOpen(!menuOpen);
  };

  const handleToggleChange = (event, val) => {
    setDarkMode(val);
    props.changeTheme(val);
  };

  const onAddressClicked = () => {
    setUnlockOpen(true);
  };

  const closoeUnlock = () => {
    setUnlockOpen(false);
  };

  useEffect(function () {
    const localStorageDarkMode = window.localStorage.getItem('yearn.finance-dark-mode');
    setDarkMode(localStorageDarkMode ? localStorageDarkMode === 'dark' : false);

    const localStorageWarningAccepted = window.localStorage.getItem('fixed.forex-warning-accepted');
    setWarningOpen(localStorageWarningAccepted ? localStorageWarningAccepted !== 'accepted' : true);
  }, []);

  useEffect(
    function () {
      setDarkMode(props.theme.palette.type === 'dark' ? true : false);
    },
    [props.theme],
  );

  const activePath = router.asPath;
  const renderNavs = () => {
    return (
      <React.Fragment>
        {renderNav(
          'Dashboard',
          'dashboard',
        )}
        {renderSubNav(
          'Swap',
          'swap',
        )}
        <div className={classes.sectionDivider}></div>
        {renderSectionHeader(
          'Collateral'
        )}
        {renderNav(
          'Mint Assets',
          'mint',
        )}
        <div className={classes.sectionDivider}></div>
        {renderSectionHeader(
          'Liquidity Providing'
        )}
        <div className={ classes.subAssets }>
          {renderSubNav(
            'Curve + Convex + Yearn',
            'home',
          )}
          {renderSubNav(
            'Uniswap',
            'staking',
          )}
          {renderSubNav(
            'Withdraw Inactive',
            'withdraw',
          )}
        </div>
        <div className={classes.sectionDivider}></div>
        {renderSectionHeader(
          'Rewards'
        )}
        <div className={ classes.subAssets }>
          {renderSubNav(
            'rKP3R Options',
            'options',
          )}
          {renderSubNav(
            'Claim',
            'rewards',
          )}
        </div>
        <div className={classes.sectionDivider}></div>
        {renderSectionHeader(
          'Governance'
        )}
        <div className={ classes.subAssets }>
          {renderSubNav(
            'Vest',
            'vest',
          )}
          {renderSubNav(
            'Vote',
            'vote',
          )}
          <div className={classes.sectionDivider}></div>
          {renderSectionHeader(
            'Stats'
          )}
          {renderNav(
            'Stats',
            'ffDashboard',
            'https://fixedforex.live/'
          )}
        </div>
      </React.Fragment>
    );
  };

  /*

  <div className={ classes.subAssets }>
    {renderSubNav(
      'ibAUD',
      'asset/0x3F1B0278A9ee595635B61817630cC19DE792f506/curve',
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/yearn/yearn-assets/master/icons/multichain-tokens/1/0x3F1B0278A9ee595635B61817630cC19DE792f506/logo-128.png" alt="" height="30px" width="30px" />,
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/yearn/yearn-assets/master/icons/multichain-tokens/1/0x3F1B0278A9ee595635B61817630cC19DE792f506/logo-128.png" alt="" height="30px" width="30px" />,
    )}
    {renderSubNav(
      'ibCHF',
      'asset/0x9c2C8910F113181783c249d8F6Aa41b51Cde0f0c/curve',
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/yearn/yearn-assets/master/icons/multichain-tokens/1/0x9c2C8910F113181783c249d8F6Aa41b51Cde0f0c/logo-128.png" alt="" height="30px" width="30px" />,
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/yearn/yearn-assets/master/icons/multichain-tokens/1/0x9c2C8910F113181783c249d8F6Aa41b51Cde0f0c/logo-128.png" alt="" height="30px" width="30px" />,
    )}
    {renderSubNav(
      'ibEUR',
      'asset/0x96E61422b6A9bA0e068B6c5ADd4fFaBC6a4aae27/curve',
      <img className={classes.subIcon} src="https://raw.githubusercontent.com/yearn/yearn-assets/master/icons/multichain-tokens/1/0x96E61422b6A9bA0e068B6c5ADd4fFaBC6a4aae27/logo-128.png" alt="" height="30px" width="30px" />,
      <img className={classes.subIcon} src="https://raw.githubusercontent.com/yearn/yearn-assets/master/icons/multichain-tokens/1/0x96E61422b6A9bA0e068B6c5ADd4fFaBC6a4aae27/logo-128.png" alt="" height="30px" width="30px" />,
    )}
    {renderSubNav(
      'ibGBP',
      'asset/0xD6Ac1CB9019137a896343Da59dDE6d097F710538/curve',
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/yearn/yearn-assets/master/icons/multichain-tokens/1/0xD6Ac1CB9019137a896343Da59dDE6d097F710538/logo-128.png" alt="" height="30px" width="30px" />,
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/yearn/yearn-assets/master/icons/multichain-tokens/1/0xD6Ac1CB9019137a896343Da59dDE6d097F710538/logo-128.png" alt="" height="30px" width="30px" />,
    )}
    {renderSubNav(
      'ibJPY',
      'asset/0x8818a9bb44Fbf33502bE7c15c500d0C783B73067/curve',
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/yearn/yearn-assets/master/icons/multichain-tokens/1/0x8818a9bb44Fbf33502bE7c15c500d0C783B73067/logo-128.png" alt="" height="30px" width="30px" />,
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/yearn/yearn-assets/master/icons/multichain-tokens/1/0x8818a9bb44Fbf33502bE7c15c500d0C783B73067/logo-128.png" alt="" height="30px" width="30px" />,
    )}
    {renderSubNav(
      'ibKRW',
      'asset/0x95dFDC8161832e4fF7816aC4B6367CE201538253/curve',
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/yearn/yearn-assets/master/icons/multichain-tokens/1/0x95dFDC8161832e4fF7816aC4B6367CE201538253/logo-128.png" alt="" height="30px" width="30px" />,
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/yearn/yearn-assets/master/icons/multichain-tokens/1/0x95dFDC8161832e4fF7816aC4B6367CE201538253/logo-128.png" alt="" height="30px" width="30px" />,
    )}
  </div>

  */

  const openWarning = () => {
    setWarningOpen(true)
  }

  const closeWarning = () => {
    window.localStorage.setItem('fixed.forex-warning-accepted', 'accepted');
    setWarningOpen(false)
  }

  const renderSectionHeader = (title) => {
    return (
      <div
        className={classes.navigationOptionContainer}
      >
        <div className={classes.navigationOptionNotSelected}></div>
        <Typography variant="h2" className={ classes.sectionText}>{title}</Typography>
      </div>
    );
  };

  const renderNav = (title, link, anotherLink) => {
    return (
      <div
        className={classes.navigationOptionContainer}
        onClick={() => {

          if(anotherLink) {
            window.open(anotherLink, '_blank')
          } else {
            handleNavigate('/' + link);
          }

        }}
      >
        {activePath.includes('/' + link) ? (
          <div className={darkMode ? classes.navigationOptionSelectedWhite : classes.navigationOptionSelected}></div>
        ) : (
          <div className={classes.navigationOptionNotSelected}></div>
        )}
        <Typography variant="h2" className={ classes.subtitleText}>{title}</Typography>
        { anotherLink && '↗'}
      </div>
    );
  };

  const renderSubNav = (title, link) => {
    return (
      <div
        className={classes.navigationSubOptionContainer}
        onClick={() => {
          handleNavigate('/' + link);
        }}
      >
        {activePath.includes('/' + link) ? (
          <div className={darkMode ? classes.navigationOptionSelectedWhite : classes.navigationOptionSelected}></div>
        ) : (
          <div className={classes.navigationOptionNotSelected}></div>
        )}
        <Typography variant="h2" className={ classes.subtitleText}>{title}</Typography>
      </div>
    );
  };

  return (
    <Paper elevation={0} className={classes.navigationContainer}>
      <div className={classes.navigationHeading}>
        <a onClick={() => router.push('/dashboard')} className={classes.linkz}>
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
      </div>

      <div className={classes.navigationContent}>{renderNavs()}</div>

      {menuOpen && (
        <Paper elevation={0} className={classes.navigationContentMobile}>
          <div className={classes.menuIcon}>
            <Button color={props.theme.palette.type === 'light' ? 'primary' : 'secondary'} onClick={onMenuClicked} disableElevation>
              <CloseIcon fontSize={'large'} />
            </Button>
          </div>

          <div className={classes.navigationHeading}>
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
          </div>

          <div className={classes.navigationContentNavs}>{renderNavs()}</div>
          <div className={classes.headerThings}>
            <div className={classes.themeSelectContainer}>
              <StyledSwitch
                icon={<Brightness2Icon className={classes.switchIcon} />}
                checkedIcon={<WbSunnyOutlinedIcon className={classes.switchIcon} />}
                checked={darkMode}
                onChange={handleToggleChange}
              />
            </div>
            <Button disableElevation className={classes.accountButton} variant="contained" color="secondary" onClick={onAddressClicked}>
              <div className={`${classes.accountIcon} ${classes.metamask}`}></div>
              <Typography variant="h5">{account ? formatAddress(account.address) : 'Connect Wallet'}</Typography>
            </Button>

            {unlockOpen && <Unlock modalOpen={unlockOpen} closeModal={closoeUnlock} />}
          </div>
        </Paper>
      )}

      <div className={classes.menuIcon}>
        <Button color={props.theme.palette.type === 'light' ? 'primary' : 'secondary'} onClick={onMenuClicked} disableElevation>
          <MenuIcon fontSize={'large'} />
        </Button>
      </div>

      {props.backClicked && (
        <div className={classes.backButtonContainer}>
          <div className={classes.backButton}>
            <Button color={props.theme.palette.type === 'light' ? 'primary' : 'secondary'} onClick={props.backClicked} disableElevation>
              <ArrowBackIcon fontSize={'large'} />
            </Button>
          </div>
        </div>
      )}

      {/*<div className={classes.socials}>
        <Tooltip title={ 'This project is in early beta. Please be cautious when using this UI and all smart contracts this UI interfaces with. You should only use this interface if you understand and accept the risks involved.' }>
          <img src='/images/icon-warning.svg' className={ classes.warningIcon } onClick={ openWarning }/>
        </Tooltip>
      </div>*/}
      <div className={classes.socials}>
        <Grid className={classes.socialgrid} container spacing={1}>
          <Grid item xs={6}>
            <a
              className={`${classes.socialButton}`}
              href="https://twitter.com/thekeep3r"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg version="1.1" width="22" height="22" viewBox="0 0 24 24">
                <path
                  fill={props.theme.palette.type === "light" ? "#676c7b" : "#FFF"}
                  d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"
                />
              </svg>
            </a>
          </Grid>
          <Grid item xs={6}>
            <a
              className={`${classes.socialButton}`}
              href="https://t.me/keep3r_official"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="24px" height="24px" version="1.1">
                <path fill={props.theme.palette.type === "light" ? "#676c7b" : "#FFF"} d="M18.384,22.779c0.322,0.228 0.737,0.285 1.107,0.145c0.37,-0.141 0.642,-0.457 0.724,-0.84c0.869,-4.084 2.977,-14.421 3.768,-18.136c0.06,-0.28 -0.04,-0.571 -0.26,-0.758c-0.22,-0.187 -0.525,-0.241 -0.797,-0.14c-4.193,1.552 -17.106,6.397 -22.384,8.35c-0.335,0.124 -0.553,0.446 -0.542,0.799c0.012,0.354 0.25,0.661 0.593,0.764c2.367,0.708 5.474,1.693 5.474,1.693c0,0 1.452,4.385 2.209,6.615c0.095,0.28 0.314,0.5 0.603,0.576c0.288,0.075 0.596,-0.004 0.811,-0.207c1.216,-1.148 3.096,-2.923 3.096,-2.923c0,0 3.572,2.619 5.598,4.062Zm-11.01,-8.677l1.679,5.538l0.373,-3.507c0,0 6.487,-5.851 10.185,-9.186c0.108,-0.098 0.123,-0.262 0.033,-0.377c-0.089,-0.115 -0.253,-0.142 -0.376,-0.064c-4.286,2.737 -11.894,7.596 -11.894,7.596Z"/>
              </svg>
            </a>
          </Grid>
          <Grid item xs={6}>
            <a
              className={`${classes.socialButton}`}
              href="https://discord.gg/FSNfbEKDWV"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg version="1.1" width="20" height="24" viewBox="0 0 24 24">
                <path
                  fill={props.theme.palette.type === "light" ? "#676c7b" : "#FFF"}
                  d="M22,24L16.75,19L17.38,21H4.5A2.5,2.5 0 0,1 2,18.5V3.5A2.5,2.5 0 0,1 4.5,1H19.5A2.5,2.5 0 0,1 22,3.5V24M12,6.8C9.32,6.8 7.44,7.95 7.44,7.95C8.47,7.03 10.27,6.5 10.27,6.5L10.1,6.33C8.41,6.36 6.88,7.53 6.88,7.53C5.16,11.12 5.27,14.22 5.27,14.22C6.67,16.03 8.75,15.9 8.75,15.9L9.46,15C8.21,14.73 7.42,13.62 7.42,13.62C7.42,13.62 9.3,14.9 12,14.9C14.7,14.9 16.58,13.62 16.58,13.62C16.58,13.62 15.79,14.73 14.54,15L15.25,15.9C15.25,15.9 17.33,16.03 18.73,14.22C18.73,14.22 18.84,11.12 17.12,7.53C17.12,7.53 15.59,6.36 13.9,6.33L13.73,6.5C13.73,6.5 15.53,7.03 16.56,7.95C16.56,7.95 14.68,6.8 12,6.8M9.93,10.59C10.58,10.59 11.11,11.16 11.1,11.86C11.1,12.55 10.58,13.13 9.93,13.13C9.29,13.13 8.77,12.55 8.77,11.86C8.77,11.16 9.28,10.59 9.93,10.59M14.1,10.59C14.75,10.59 15.27,11.16 15.27,11.86C15.27,12.55 14.75,13.13 14.1,13.13C13.46,13.13 12.94,12.55 12.94,11.86C12.94,11.16 13.45,10.59 14.1,10.59Z"
                />
              </svg>
            </a>
          </Grid>
          <Grid item xs={6}>
            <a
              className={`${classes.socialButton}`}
              href="https://github.com/antonnell/fixed-forex"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg version="1.1" width="23" height="24" viewBox="0 0 24 24">
                <path
                  fill={props.theme.palette.type === "light" ? "#676c7b" : "#FFF"}
                  d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
                />
              </svg>
            </a>
          </Grid>
        </Grid>
      </div>
      <Typography className={classes.smallVersion}>Version 0.7.0</Typography>
      { warningOpen &&
        <FFWarning close={ closeWarning } />
      }
    </Paper>
  );
}

export default withTheme(Navigation);
