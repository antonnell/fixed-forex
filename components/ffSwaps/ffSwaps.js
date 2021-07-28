import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField, InputAdornment, CircularProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import BigNumber from 'bignumber.js';
import Skeleton from '@material-ui/lab/Skeleton';

import { formatCurrency } from '../../utils';
import classes from './ffSwaps.module.css';

import CallSplitIcon from '@material-ui/icons/CallSplit';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

export default function ffSwaps() {

  const [ assets, setAssets ] = useState([])

  const [fromAsset, setFromAsset] = useState(null);
  const [fromAmount, setFromAmount] = useState('');

  const [toAsset, setToAsset] = useState(null);
  const [toAmount, setToAmount] = useState('');

  const onAssetChanged = (type, newVal) => {
    switch (type) {
      case 'from':
        fromFromAsset(newVal)
        break;
      case 'to':
        setToAsset(newVal)
        break;
      default:

    }
  }

  const onAmountChanged = (type, newVal) => {
    switch (type) {
      case 'from':
        setFromAmount(newVal)
        break;
      case 'to':
        setToAmount(newVal)
        break;
      default:

    }
  }

  const onAmountPercentChanged = (type, percent) => {
    switch (type) {
      case 'from':
        if(!fromAsset) { return; }
        setDepositAmount(BigNumber(fromAsset.balance).times(percent).div(100).toFixed(fromAsset.decimals))
        break;
      case 'to':
        if(!toAsset) { return; }
        setWithdrawAmount(BigNumber(toAsset.balance).times(percent).div(100).toFixed(toAsset.decimals))
        break;
      default:

    }
  }

  const renderInput = (type, label, onAmountChange, onAmountChangePercent, amountValue, onAssetChange, assetValue) => {
    return (
      <div className={classes.textField}>
        <div className={classes.inputTitleContainer}>
          <div className={classes.inputTitle}>
            <Typography variant="h5" className={ classes.inputTitleText }>
              { label }
            </Typography>
          </div>
          <div className={classes.balances}>
            <Typography
              variant="h5"
              onClick={() => {
                onAmountChangePercent(type, 100);
              }}
              className={classes.value}
              noWrap
            >
              Balance: {!assetValue?.balance ? '0.00' : formatCurrency(assetValue.balance)}
            </Typography>
          </div>
        </div>
        <div className={ classes.autocompleteContainer }>
          <Autocomplete
            options={assets}
            value={assetValue}
            onChange={ (e, newVal) => { onAssetChange(type, newVal) } }
            getOptionLabel={(option) => option.label}
            style={{ width: '55%', marginRight: '5px' }}
            renderOption={(option) => (
              <React.Fragment>
                <img
                  src={option && option.icon ? option.icon : `tokens/unknown-logo.png`}
                  alt=""
                  width={30}
                  height={30}
                  style={{ marginRight: '10px' }}
                />
                <span className={classes.color} style={{ backgroundColor: option.color }} />
                <div className={classes.text}>
                  {option.label}
                  <br />
                </div>
              </React.Fragment>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  ...{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img
                          src={assetValue && assetValue.icon ? assetValue.icon : `tokens/unknown-logo.png`}
                          alt=""
                          width={30}
                          height={30}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
                label="Token"
                variant="outlined"
              />
            )}
          />
          <TextField variant="outlined" style={{ width: '40%' }} placeholder="0.00" value={amountValue} label="Amount" onChange={onAmountChange} />
        </div>
      </div>
    )
  }

  return (
    <Paper elevation={0} className={ classes.container }>
      <div className={ classes.inputsContainer }>
        <div className={ classes.inputContainer }>
          { renderInput('from', 'From:', onAmountChanged, onAmountPercentChanged, fromAmount, onAssetChanged, fromAsset) }
        </div>
        <div className={ classes.inputContainer }>
          { renderInput('to', 'To:', onAmountChanged, onAmountPercentChanged, toAmount, onAssetChanged, toAsset) }
        </div>
        <div className={ classes.infoContainer }>
          <div className={ classes.infoField }>
            <CallSplitIcon className={ classes.infoIcon } />
            <div className={ classes.infoTexts }>
              <Typography className={ classes.infoText }>Route Used:</Typography>
              <Typography >SUSHISWAP</Typography>
            </div>
          </div>
          <div className={ classes.infoField }>
            <AttachMoneyIcon className={ classes.infoIcon } />
            <div className={ classes.infoTexts }>
              <Typography className={ classes.infoText }>Estimated Receive Amount:</Typography>
              <Typography >123.32 ibEUR</Typography>
            </div>
          </div>
        </div>
      </div>
      <div className={ classes.actionsContainer }>
        <Button
          variant='contained'
          size='large'
          color='primary'
          >
          <Typography className={ classes.actionButtonText }>Approve Transaction</Typography>
        </Button>
        <Button
          variant='contained'
          size='large'
          color='primary'
          >
          <Typography className={ classes.actionButtonText }>Swap</Typography>
        </Button>
      </div>
    </Paper>
  );
}
