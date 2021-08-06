import React, { useState, useEffect } from 'react';
import { Typography, Paper, Grid, Button, TextField, InputAdornment, CircularProgress } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import Autocomplete from '@material-ui/lab/Autocomplete';

import BigNumber from 'bignumber.js';

import { formatCurrency } from '../../utils';

import classes from './ffMintBurn.module.css';

export default function ffMintBurn() {

  const [ loading, setLoading ] = useState(false)

  const [ activeTab, setActiveTab ] = useState('deposit')

  const [ assets, setAssets ] = useState([])

  const [depositAsset, setDepositAsset] = useState(null);
  const [depositAmount, setDepositAmount] = useState('');

  const [mintAsset, setMintAsset] = useState(null);
  const [mintAmount, setMintAmount] = useState('');

  const [withdrawAsset, setWithdrawAsset] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const [burnAsset, setBurnAsset] = useState(null);
  const [burnAmount, setBurnAmount] = useState('');

  const onAssetChanged = (type, newVal) => {
    switch (type) {
      case 'deposit':
        setDepositAsset(newVal)
        break;
      case 'withdraw':
        setWithdrawAsset(newVal)
        break;
      case 'mint':
        setMintAsset(newVal)
        break;
      case 'burn':
        setBurnAsset(newVal)
        break;
      default:

    }
  }

  const onAmountChanged = (type, newVal) => {
    switch (type) {
      case 'deposit':
        setDepositAmount(newVal)
        break;
      case 'withdraw':
        setWithdrawAmount(newVal)
        break;
      case 'mint':
        setMintAmount(newVal)
        break;
      case 'burn':
        setBurnAmount(newVal)
        break;
      default:

    }
  }

  const onAmountPercentChanged = (type, percent) => {
    switch (type) {
      case 'deposit':
        if(!depositAsset) { return; }
        setDepositAmount(BigNumber(depositAsset.balance).times(percent).div(100).toFixed(depositAsset.decimals))
        break;
      case 'withdraw':
        if(!withdrawAsset) { return; }
        setWithdrawAmount(BigNumber(withdrawAsset.balance).times(percent).div(100).toFixed(withdrawAsset.decimals))
        break;
      case 'mint':
        if(!mintAsset) { return; }
        setMintAmount(BigNumber(mintAsset.balance).times(percent).div(100).toFixed(mintAsset.decimals))
        break;
      case 'burn':
        if(!burnAsset) { return; }
        setBurnAmount(BigNumber(burnAsset.balance).times(percent).div(100).toFixed(burnAsset.decimals))
        break;
      default:

    }
  }

  const toggleDeposit = () => {
    setActiveTab('deposit')
  }

  const toggleWithdraw = () => {
    setActiveTab('withdraw')
  }

  const renderInput = (type, label, onAmountChange, onAmountChangePercent, amountValue, onAssetChange, assetValue) => {
    return (
      <div className={classes.textField}>
        <div className={classes.inputTitleContainer}>
          <div className={classes.inputTitle}>
            <Typography variant="h5" noWrap>
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
              Balance: {!assetValue?.balance ? <Skeleton /> : formatCurrency(assetValue.balance)}
            </Typography>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
          <Autocomplete
            options={assets}
            value={assetValue}
            onChange={ (e, newVal) => { onAssetChange(type, newVal) } }
            getOptionLabel={(option) => option.label}
            style={{ width: '55%', marginRight: '5px' }}
            renderOption={(option) => (
              <React.Fragment>
                <img
                  src={option && option.icon ? option.icon : 'https://raw.githubusercontent.com/x33q/cryptologos/main/unknown-logo.png'}
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
                          src={assetValue && assetValue.icon ? assetValue.icon : 'https://raw.githubusercontent.com/x33q/cryptologos/main/unknown-logo.png'}
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
    <Paper elevation={0} className={classes.container}>
      <Grid container spacing={0}>
        <Grid item lg={2} md={3} xs={12}>
        <div className={classes.toggleButtons}>
          <Grid container spacing={0}>
            <Grid item lg={12} md={12} sm={6} xs={6}>
              <Button className={ `${activeTab === 'deposit' ? classes.buttonActive : classes.button} ${ classes.topLeftButton }` } onClick={ toggleDeposit }>
                <Typography variant='h5'>Deposit / Mint</Typography>
                <div className={ `${activeTab === 'deposit' ? classes.activeIcon : ''}` }></div>
              </Button>
            </Grid>
            <Grid item lg={12} md={12} sm={6} xs={6}>
              <Button className={ `${activeTab === 'withdraw' ? classes.buttonActive : classes.button}  ${ classes.bottomLeftButton }` } onClick={ toggleWithdraw }>
                <Typography variant='h5'>Withdraw / Burn</Typography>
                <div className={ `${activeTab === 'withdraw' ? classes.activeIcon : ''}` }></div>
              </Button>
            </Grid>
          </Grid>
        </div>
        </Grid>
        <Grid item lg={10} md={9}>
        <div className={ classes.reAddPadding }>
          <Grid container spacing={0}>
            <Grid item lg={9} xs={12}>
              <div className={ classes.inputsContainer }>

                  {
                    activeTab === 'deposit' &&
                    <>
                      { renderInput('deposit', 'Deposit', onAmountChanged, onAmountPercentChanged, depositAmount, onAssetChanged, depositAsset) }
                      { renderInput('mint', 'Mint', onAmountChanged, onAmountPercentChanged, mintAmount, onAssetChanged, mintAsset) }
                    </>
                  }
                  {
                    activeTab === 'withdraw' &&
                    <>
                      { renderInput('withdraw', 'Withdraw', onAmountChanged, onAmountPercentChanged, withdrawAmount, onAssetChanged, withdrawAsset) }
                      { renderInput('burn', 'Burn', onAmountChanged, onAmountPercentChanged, burnAmount, onAssetChanged, burnAsset) }
                    </>
                  }
              </div>
            </Grid>
            <Grid item lg={3} xs={12} className={classes.buttonWrap}>
              {
                activeTab === 'deposit' &&
                <div className={ classes.actionsContainer }>
                  <Button
                    variant='contained'
                    size='large'
                    color='white'
                    className={classes.buttonOverride}>
                    <Typography className={ classes.actionButtonText }>Approve</Typography>
                  </Button>
                  <Button
                    variant='contained'
                    size='large'
                    color='white'
                    className={classes.buttonOverride}>
                    <Typography className={ classes.actionButtonText }>Deposit & Mint</Typography>
                  </Button>
                </div>
              }
              {
                activeTab === 'withdraw' &&
                <div className={ classes.actionsContainer }>
                  <Button
                    variant='contained'
                    size='large'
                    color='white'
                    className={classes.buttonOverride}>
                    <Typography className={ classes.actionButtonText }>Approve</Typography>
                  </Button>
                  <Button
                    variant='contained'
                    size='large'
                    color='white'
                    className={classes.buttonOverride}>
                    <Typography className={ classes.actionButtonText }>Withdraw & Burn</Typography>
                  </Button>
                </div>
              }
            </Grid>
          </Grid>
        </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
