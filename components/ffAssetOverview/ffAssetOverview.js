import { Typography, SvgIcon, Grid } from '@material-ui/core';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import BigNumber from 'bignumber.js';
import { formatCurrency } from '../../utils';

import classes from './ffAssetOverview.module.css';

function BalanceIcon(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 48 48" stroke-width="1" className={className}>
      <g stroke-width="2" transform="translate(0, 0)"><path data-color="color-2" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" d="M28,46v-8 c0-2.2-1.8-4-4-4l0,0c-2.2,0-4,1.8-4,4v8" stroke-linejoin="miter"></path> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="2" y1="32" x2="2" y2="26" stroke-linejoin="miter"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="46" y1="32" x2="46" y2="26" stroke-linejoin="miter"></line> <polyline data-cap="butt" fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" points="10.8,32 2,32 2,46 8,46 " stroke-linejoin="miter" stroke-linecap="butt"></polyline> <polyline data-cap="butt" fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" points="37.2,32 46,32 46,46 40,46 " stroke-linejoin="miter" stroke-linecap="butt"></polyline> <polygon fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" points="34,16 14,16 8,46 40,46 " stroke-linejoin="miter"></polygon> <polyline fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" points="40,4 40,16 8,16 8,4 " stroke-linejoin="miter"></polyline> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="16" y1="4" x2="16" y2="8" stroke-linejoin="miter"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="24" y1="8" x2="24" y2="4" stroke-linejoin="miter"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="32" y1="4" x2="32" y2="8" stroke-linejoin="miter"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="8" y1="8" x2="40" y2="8" stroke-linejoin="miter"></line></g>
    </SvgIcon>
  );
}

function StakedIcon(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 48 48" stroke-width="2" className={className}>
      <g stroke-width="2" transform="translate(0, 0)"><line data-cap="butt" x1="23" y1="25" x2="45" y2="3" fill="none" stroke="#ffffff" stroke-miterlimit="10" stroke-width="2" stroke-linecap="butt" stroke-linejoin="miter"></line> <line data-color="color-2" x1="5" y1="4" x2="17" y2="16" fill="none" stroke="#ffffff" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="miter"></line> <line data-color="color-2" x1="5" y1="16" x2="17" y2="4" fill="none" stroke="#ffffff" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="miter"></line> <line data-color="color-2" x1="32" y1="31" x2="44" y2="43" fill="none" stroke="#ffffff" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="miter"></line> <line data-color="color-2" x1="32" y1="43" x2="44" y2="31" fill="none" stroke="#ffffff" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="miter"></line> <circle cx="11" cy="37" r="8" fill="none" stroke="#ffffff" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="miter"></circle> <polyline points="31 3 45 3 45 17" fill="none" stroke="#ffffff" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="miter"></polyline></g>
    </SvgIcon>
  );
}

export default function ffAssetOverview({ asset }) {

  let balance = 0
  if(asset && asset.gauge && asset.convex && asset.yearn) {
    let pooledBalance = BigNumber(asset.gauge.userPoolBalance).times(asset.gauge.virtualPrice)
    let stakedBalance = BigNumber(asset.gauge.userGaugeBalance).times(asset.gauge.virtualPrice)
    let convexBalance = BigNumber(asset.convex.balance).times(asset.gauge.virtualPrice)
    let yearnBalance = BigNumber(asset.yearn.userVaultBalance)
    balance = BigNumber(asset.balance).plus(pooledBalance).plus(convexBalance).plus(stakedBalance).plus(yearnBalance)
  }

  return (
    <div className={ classes.container }>

      <Grid container spacing={3} className={ classes.assetTitleContainer }>
        <Grid item lg={4} md={4} sm={12} xs={12}>
        <div className={ classes.assetTitle }>
          <img className={ classes.assetIcon } src={ asset ? `https://raw.githubusercontent.com/yearn/yearn-assets/master/icons/multichain-tokens/1/${asset.address}/logo-128.png` : '/unknown-logo.png'} alt='' height='60px' width='60px' />
          <div>
            <Typography className={ classes.assetName }>{ asset ? asset.name : '' }</Typography>
            <Typography className={ classes.assetPrice }>${ formatCurrency(asset ? asset.price : 0) }</Typography>
          </div>
        </div>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
        <div className={ classes.assetBalance }>
          <div className={classes.iconWrap}>
            <BalanceIcon className={ classes.overviewIcon } />
          </div>
          <div className={ classes.flex1 }>
            <Typography className={ classes.title }>ib* Balances:</Typography>
            <Typography className={ classes.stakedAmount }>{ formatCurrency(balance) }</Typography>
            <Typography className={ classes.assetSymbol }>${ formatCurrency(asset ? BigNumber(asset.price).times(balance) : 0) }</Typography>
          </div>
        </div>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
        <div className={ classes.assetBalance }>
          <div className={classes.iconWrap}>
            <StakedIcon className={ classes.overviewIcon } />
          </div>
          <div className={ classes.flex1 }>
            <Typography className={ classes.title }>Total Staked:</Typography>
            <Typography className={ classes.stakedAmount }>{formatCurrency(BigNumber((asset && asset.gauge && asset.gauge.userGaugeBalance) ? asset.gauge.userGaugeBalance : 0).plus((asset && asset.convex && asset.convex.balance) ? asset.convex.balance : 0).plus((asset && asset.yearn && asset.yearn.balance) ? asset.yearn.balance : 0))}</Typography>
            <Typography className={ classes.assetSymbol }>{asset?.gauge?.poolSymbol}</Typography>
          </div>
        </div>
        </Grid>
      </Grid>
    </div>
  );
}
