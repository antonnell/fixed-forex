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
    console.log(route)
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
          'Assets',
          'home',
          <SwapHorizIcon className={classes.icon} color={darkMode ? 'white' : 'rgb(33, 37, 41)'} altColor={darkMode ? 'rgb(33, 37, 41)' : 'white'} />,
          <SwapHorizIcon className={classes.icon} color={darkMode ? 'white' : 'rgb(33, 37, 41)'} altColor={darkMode ? 'rgb(33, 37, 41)' : 'white'} />,
        )}
        <div className={ classes.subAssets }>
          {renderSubNav(
            'ibEUR',
            'asset/0x96E61422b6A9bA0e068B6c5ADd4fFaBC6a4aae27/curve',
            <img className={classes.subIcon} src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0x96E61422b6A9bA0e068B6c5ADd4fFaBC6a4aae27/logo-128.png" alt="" height="30px" width="30px" />,
            <img className={classes.subIcon} src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0x96E61422b6A9bA0e068B6c5ADd4fFaBC6a4aae27/logo-128.png" alt="" height="30px" width="30px" />,
          )}
          {renderSubNav(
            'ibKRW',
            'asset/0x95dFDC8161832e4fF7816aC4B6367CE201538253/curve',
            <img className={classes.subIcon}  src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0x95dFDC8161832e4fF7816aC4B6367CE201538253/logo-128.png" alt="" height="30px" width="30px" />,
            <img className={classes.subIcon}  src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0x95dFDC8161832e4fF7816aC4B6367CE201538253/logo-128.png" alt="" height="30px" width="30px" />,
          )}
        </div>
        {renderNav(
          'Vest',
          'vest',
          <TimerIcon className={classes.icon} color={darkMode ? 'white' : 'rgb(33, 37, 41)'} altColor={darkMode ? 'rgb(33, 37, 41)' : 'white'} />,
          <TimerIcon className={classes.icon} color={darkMode ? 'white' : 'rgb(33, 37, 41)'} altColor={darkMode ? 'rgb(33, 37, 41)' : 'white'} />,
        )}
        {renderNav(
          'Vote',
          'vote',
          <HowToVoteIcon className={classes.icon} color={darkMode ? 'white' : 'rgb(33, 37, 41)'} altColor={darkMode ? 'rgb(33, 37, 41)' : 'white'} />,
          <HowToVoteIcon className={classes.icon} color={darkMode ? 'white' : 'rgb(33, 37, 41)'} altColor={darkMode ? 'rgb(33, 37, 41)' : 'white'} />,
        )}
        {/*renderNav(
          'Stake',
          'stake',
          <SpaceBarIcon className={classes.icon} color={darkMode ? 'white' : 'rgb(33, 37, 41)'} altColor={darkMode ? 'rgb(33, 37, 41)' : 'white'} />,
          <SpaceBarIcon className={classes.icon} color={darkMode ? 'white' : 'rgb(33, 37, 41)'} altColor={darkMode ? 'rgb(33, 37, 41)' : 'white'} />,
        )*/}
      </React.Fragment>
    );
  };

  const openWarning = () => {
    setWarningOpen(true)
  }

  const closeWarning = () => {
    window.localStorage.setItem('fixed.forex-warning-accepted', 'accepted');
    setWarningOpen(false)
  }

  const renderNav = (title, link, icon, iconSelected) => {
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
        {activePath.includes('/' + link) ? iconSelected : icon}
        <Typography variant="h2">{title}</Typography>
      </div>
    );
  };

  const renderSubNav = (title, link, icon, iconSelected) => {
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
        {activePath.includes('/' + link) ? iconSelected : icon}
        <Typography variant="h2" className={ classes.subtitleText}>{title}</Typography>
      </div>
    );
  };

  return (
    <Paper elevation={0} className={classes.navigationContainer}>
      <div className={classes.navigationHeading}>
        <a onClick={() => router.push('/')} className={classes.linkz}>
          <Typography className={classes.ffTitle}>Fixed Forex</Typography>
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
          <YearnIcon
            color={darkMode ? 'white' : 'rgb(33, 37, 41)'}
            altColor={darkMode ? 'rgb(255, 255, 255)' : 'white'}
            width="123px"
            height="42.3px"
            className={classes.yearnLogo}
          />
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
      <Typography className={classes.smallVersion}>Version 0.1.1-beta</Typography>
      { warningOpen &&
        <FFWarning close={ closeWarning } />
      }
    </Paper>
  );
}

export default withTheme(Navigation);
