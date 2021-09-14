import { Typography } from '@material-ui/core';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import BigNumber from 'bignumber.js';

import { formatCurrency } from '../../utils';
import classes from './ffAssetOverview.module.css';

export default function ffAssetOverview({ asset }) {

  let balance = 0
  if(asset && asset.gauge) {
    let pooledBalance = BigNumber(asset.gauge.userPoolBalance).times(asset.gauge.virtualPrice)
    let stakedBalance = BigNumber(asset.gauge.userGaugeBalance).times(asset.gauge.virtualPrice)
    balance = BigNumber(asset.balance).plus(pooledBalance).plus(stakedBalance)
  }

  return (
    <div className={ classes.container }>
      <div className={ classes.assetTitleContainer }>
        <div className={ classes.assetTitle }>
          <img className={ classes.assetIcon } src={ asset ? `https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/${asset.address}/logo-128.png` : '/unknown-logo.png'} alt='' height='60px' width='60px' />
          <div>
            <Typography className={ classes.assetName }>{ asset ? asset.name : '' }</Typography>
            <Typography className={ classes.assetPrice }>${ formatCurrency(asset ? asset.price : 0) }</Typography>
          </div>
        </div>
        <div className={ classes.assetBalance }>
          <AccountBalanceWalletIcon className={ classes.balanceIcon } />
          <div className={ classes.flex1 }>
            <Typography className={ classes.assetName } align='right'>{ formatCurrency(balance) }</Typography>
            <Typography className={ classes.assetPrice } align='right'>${ formatCurrency(asset ? BigNumber(asset.price).times(balance) : 0) }</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
