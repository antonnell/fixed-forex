import { Typography } from '@material-ui/core';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import { formatCurrency } from '../../utils';
import classes from './ffAssetOverview.module.css';

export default function ffAssetOverview({ asset }) {

  return (
    <div className={ classes.container }>
      <div className={ classes.assetTitleContainer }>
        <div className={ classes.assetTitle }>
          <img className={ classes.assetIcon } src={ asset ? `https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/${asset.address}/logo-128.png` : '/unknown-logo.png'} alt='' height='60px' width='60px' />
          <div>
            <Typography className={ classes.assetName }>{ asset ? asset.name : '' }</Typography>
            <Typography className={ classes.assetPrice }>{formatCurrency(0.032)} ETH</Typography>
          </div>
        </div>
        <div className={ classes.assetBalance }>
          <AccountBalanceWalletIcon className={ classes.balanceIcon } />
          <div className={ classes.flex1 }>
            <Typography className={ classes.assetName } align='right'>{ formatCurrency(asset ? asset.balance : 0) }</Typography>
            <Typography className={ classes.assetPrice }  align='right'>0.032 ETH</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
