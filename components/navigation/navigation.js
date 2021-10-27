import React, { useState, useEffect } from 'react';
import { Typography, Paper, Switch, Button, Tooltip } from '@material-ui/core';
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
            'CRV LP',
            'home',
          )}
          {/*renderSubNav(
            'Uniswap LP',
            'staking',
          )*/}
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
        </div>
      </React.Fragment>
    );
  };

  /*

  <div className={ classes.subAssets }>
    {renderSubNav(
      'ibAUD',
      'asset/0x3F1B0278A9ee595635B61817630cC19DE792f506/curve',
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0x3F1B0278A9ee595635B61817630cC19DE792f506/logo-128.png" alt="" height="30px" width="30px" />,
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0x3F1B0278A9ee595635B61817630cC19DE792f506/logo-128.png" alt="" height="30px" width="30px" />,
    )}
    {renderSubNav(
      'ibCHF',
      'asset/0x9c2C8910F113181783c249d8F6Aa41b51Cde0f0c/curve',
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0x9c2C8910F113181783c249d8F6Aa41b51Cde0f0c/logo-128.png" alt="" height="30px" width="30px" />,
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0x9c2C8910F113181783c249d8F6Aa41b51Cde0f0c/logo-128.png" alt="" height="30px" width="30px" />,
    )}
    {renderSubNav(
      'ibEUR',
      'asset/0x96E61422b6A9bA0e068B6c5ADd4fFaBC6a4aae27/curve',
      <img className={classes.subIcon} src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0x96E61422b6A9bA0e068B6c5ADd4fFaBC6a4aae27/logo-128.png" alt="" height="30px" width="30px" />,
      <img className={classes.subIcon} src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0x96E61422b6A9bA0e068B6c5ADd4fFaBC6a4aae27/logo-128.png" alt="" height="30px" width="30px" />,
    )}
    {renderSubNav(
      'ibGBP',
      'asset/0xD6Ac1CB9019137a896343Da59dDE6d097F710538/curve',
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0xD6Ac1CB9019137a896343Da59dDE6d097F710538/logo-128.png" alt="" height="30px" width="30px" />,
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0xD6Ac1CB9019137a896343Da59dDE6d097F710538/logo-128.png" alt="" height="30px" width="30px" />,
    )}
    {renderSubNav(
      'ibJPY',
      'asset/0x8818a9bb44Fbf33502bE7c15c500d0C783B73067/curve',
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0x8818a9bb44Fbf33502bE7c15c500d0C783B73067/logo-128.png" alt="" height="30px" width="30px" />,
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0x8818a9bb44Fbf33502bE7c15c500d0C783B73067/logo-128.png" alt="" height="30px" width="30px" />,
    )}
    {renderSubNav(
      'ibKRW',
      'asset/0x95dFDC8161832e4fF7816aC4B6367CE201538253/curve',
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0x95dFDC8161832e4fF7816aC4B6367CE201538253/logo-128.png" alt="" height="30px" width="30px" />,
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0x95dFDC8161832e4fF7816aC4B6367CE201538253/logo-128.png" alt="" height="30px" width="30px" />,
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

  const renderNav = (title, link) => {
    return (
      <div
        className={classes.navigationOptionContainer}
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

      <div className={classes.socials}>
        <Tooltip title={ 'This project is in early beta. Please be cautious when using this UI and all smart contracts this UI interfaces with. You should only use this interface if you understand and accept the risks involved.' }>
          <img src='/images/icon-warning.svg' className={ classes.warningIcon } onClick={ openWarning }/>
        </Tooltip>
      </div>
      <Typography className={classes.smallVersion}>Version 0.6.0-beta</Typography>
      { warningOpen &&
        <FFWarning close={ closeWarning } />
      }
    </Paper>
  );
}

export default withTheme(Navigation);
