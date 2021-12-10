import React, { useState, useEffect } from 'react';
import { Paper, Grid, Typography, Button, TextField, InputAdornment, CircularProgress, Tooltip, Select, MenuItem } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { formatCurrency } from '../../utils';
import classes from './ffCurveGauge.module.css';
import stores from '../../stores'
import {
  ERROR,
  FIXED_FOREX_APPROVE_STAKE_CURVE,
  FIXED_FOREX_STAKE_CURVE_APPROVED,
  FIXED_FOREX_STAKE_CURVE,
  FIXED_FOREX_CURVE_STAKED,
  FIXED_FOREX_UNSTAKE_CURVE,
  FIXED_FOREX_CURVE_UNSTAKED,
  FIXED_FOREX_APPROVE_STAKE_CONVEX,
  FIXED_FOREX_STAKE_CONVEX_APPROVED,
  FIXED_FOREX_STAKE_CONVEX,
  FIXED_FOREX_CONVEX_STAKED,
  FIXED_FOREX_UNSTAKE_CONVEX,
  FIXED_FOREX_CONVEX_UNSTAKED
} from '../../stores/constants';

export default function ffCurveGauge({ asset }) {

  const [ approvalLoading, setApprovalLoading ] = useState(false)
  const [ depositLoading, setDepositLoading ] = useState(false)

  const [ amount, setAmount ] = useState('');
  const [ amountError/*, setAmountError*/ ] = useState(false);

  const [ withdrawAmount, setWithdrawAmount ] = useState('');
  const [ withdrawAmountError/*, setWithdrawAmountError*/ ] = useState(false);

  const [ activeTab, setActiveTab ] = useState('deposit')

  const [ protocol, setProtocol ] = useState('Curve')

  useEffect(() => {
    const approveReturned = () => {
      setApprovalLoading(false)
    }

    const depositReturned = () => {
      setDepositLoading(false)
    }

    const errorReturned = () => {
      setDepositLoading(false)
      setApprovalLoading(false)
    }

    stores.emitter.on(FIXED_FOREX_STAKE_CURVE_APPROVED, approveReturned);
    stores.emitter.on(FIXED_FOREX_CURVE_STAKED, depositReturned);
    stores.emitter.on(FIXED_FOREX_CURVE_UNSTAKED, depositReturned);
    stores.emitter.on(FIXED_FOREX_STAKE_CONVEX_APPROVED, approveReturned);
    stores.emitter.on(FIXED_FOREX_CONVEX_STAKED, depositReturned);
    stores.emitter.on(FIXED_FOREX_CONVEX_UNSTAKED, depositReturned);
    stores.emitter.on(ERROR, errorReturned);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_STAKE_CURVE_APPROVED, approveReturned);
      stores.emitter.removeListener(FIXED_FOREX_CURVE_STAKED, depositReturned);
      stores.emitter.removeListener(FIXED_FOREX_CURVE_UNSTAKED, depositReturned);
      stores.emitter.removeListener(FIXED_FOREX_STAKE_CONVEX_APPROVED, approveReturned);
      stores.emitter.removeListener(FIXED_FOREX_CONVEX_STAKED, depositReturned);
      stores.emitter.removeListener(FIXED_FOREX_CONVEX_UNSTAKED, depositReturned);
      stores.emitter.removeListener(ERROR, errorReturned);
    };
  }, []);

  const setAmountPercent = (input, percent) => {
    if(input === 'amount') {
      setAmount(BigNumber(asset.gauge.userPoolBalance).times(percent).div(100).toFixed(18));
    } else if (input === 'withdrawAmount') {

      if(protocol === 'Curve') {
        setWithdrawAmount(BigNumber(asset.gauge.userGaugeBalance).times(percent).div(100).toFixed(18));
      } else {
        setWithdrawAmount(BigNumber(asset.convex.balance).times(percent).div(100).toFixed(18));
      }

    }
  }

  const onApprove = () => {
    setApprovalLoading(true)

    if(protocol === 'Curve') {
      stores.dispatcher.dispatch({ type: FIXED_FOREX_APPROVE_STAKE_CURVE, content: { asset, amount } })
    } else {
      stores.dispatcher.dispatch({ type: FIXED_FOREX_APPROVE_STAKE_CONVEX, content: { asset, amount } })
    }
  }

  const onDeposit = () => {
    setDepositLoading(true)

    if(protocol === 'Curve') {
      stores.dispatcher.dispatch({ type: FIXED_FOREX_STAKE_CURVE, content: { asset, amount } })
    } else {
      stores.dispatcher.dispatch({ type: FIXED_FOREX_STAKE_CONVEX, content: { asset, amount } })
    }
  }

  const onWithdraw = () => {
    setDepositLoading(true)

    if(protocol === 'Curve') {
      stores.dispatcher.dispatch({ type: FIXED_FOREX_UNSTAKE_CURVE, content: { asset, withdrawAmount } })
    } else {
      stores.dispatcher.dispatch({ type: FIXED_FOREX_UNSTAKE_CONVEX, content: { asset, withdrawAmount } })
    }
  }

  const toggleDeposit = () => {
    setActiveTab('deposit')
  }

  const toggleWithdraw = () => {
    setActiveTab('withdraw')
  }

  const formatApproved = (am) => {
    if(BigNumber(am).gte(1000000000000000)) {
      return 'Approved Forever'
    }

    return `Approved ${formatCurrency(am)}`
  }

  let depositApprovalNotRequired = false
  if(asset && asset.gauge) {
    if(protocol === 'Curve') {
      depositApprovalNotRequired = BigNumber(asset.gauge.poolGaugeAllowance).gte(amount) || ((!amount || amount === '') && BigNumber(asset.gauge.poolGaugeAllowance).gt(0) )
    } else {
      depositApprovalNotRequired = BigNumber(asset.convex.poolGaugeAllowance).gte(amount) || ((!amount || amount === '') && BigNumber(asset.convex.poolGaugeAllowance).gt(0) )
    }
  }

  return (
    <div className={ classes.container}>
      <div className={ classes.inline }>
        <Typography variant="h5" className={classes.title}>Stake in Gauge</Typography>
      </div>
      <Tooltip placement="top-left" title="Earn Rewards. Providing liquidity to these LP’s allows you to hedge against USD risk, or simply have exposure in your own preferred currency, while earning LP incentives.">
        <div className={classes.helpIcon}>?</div>
      </Tooltip>
      <Paper elevation={0} className={ classes.lpOptionsContainer }>
        <Grid container spacing={0}>
          <Grid item lg={12} md={12} xs={12}>
            <div className={classes.toggleButtons}>
              <Grid container spacing={0}>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <Paper className={ `${activeTab === 'deposit' ? classes.buttonActive : classes.button} ${ classes.topLeftButton }` } onClick={ toggleDeposit } disabled={ depositLoading || approvalLoading }>
                    <Typography variant='h5'>Stake</Typography>
                    <div className={ `${activeTab === 'deposit' ? classes.activeIcon : ''}` }></div>
                  </Paper>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <Paper className={ `${activeTab === 'withdraw' ? classes.buttonActive : classes.button}  ${ classes.bottomLeftButton }` } onClick={ toggleWithdraw } disabled={ depositLoading || approvalLoading }>
                    <Typography variant='h5'>Unstake</Typography>
                    <div className={ `${activeTab === 'withdraw' ? classes.activeIcon : ''}` }></div>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
            <div className={ classes.reAddPadding }>
              <Grid container spacing={0}>
                <Grid item lg={9} xs={12}>
                  <div className={ classes.inputsContainer }>
                  {
                    activeTab === 'deposit' &&
                    <>
                      <Grid container spacing={2}>
                        <Grid item lg={12} xs={12}>
                          <div className={classes.textField}>
                            <div className={classes.inputTitleContainer}>
                              <div className={classes.inputTitle}>
                                <Typography variant="h5" className={ classes.inputTitleText }>
                                  Protocol:
                                </Typography>
                              </div>
                            </div>
                            <Select
                              value={protocol}
                              onChange={(e) => { setProtocol(e.target.value) }}
                              variant="outlined"
                              fullWidth
                              className={ classes.inputSelect }
                            >
                              <MenuItem value={'Curve'}>
                                <div className={ classes.inline }>
                                  <img className={ classes.lpOptionIcon } src='/images/Curve.png' alt='Curve Logo' width={ 30 } height={ 30 } />
                                  <Typography>Stake in Curve</Typography>
                                </div>
                              </MenuItem>
                              <MenuItem value={'Convex'}>
                                <div className={ classes.inline }>
                                  <img className={ classes.lpOptionIcon } src='/images/Convex.png' alt='Convex Logo' width={ 30 } height={ 30 } />
                                  <Typography>Stake in Convex</Typography>
                                </div>
                              </MenuItem>
                            </Select>
                          </div>
                        </Grid>
                        <Grid item lg={12} xs={12}>
                          <div className={classes.textField}>
                            <div className={classes.inputTitleContainer}>
                              <div className={classes.inputTitle}>
                                <Typography variant="h5" className={ classes.inputTitleText }>
                                  Stake Amount:
                                </Typography>
                              </div>
                              <div className={classes.balances}>
                                <Typography
                                  variant="h5"
                                  onClick={() => {
                                    setAmountPercent('amount', 100);
                                  }}
                                  className={classes.value}
                                  noWrap
                                >
                                  Balance: {formatCurrency(asset && asset.gauge ? asset.gauge.userPoolBalance : 0)}
                                </Typography>
                              </div>
                            </div>
                            <TextField
                              variant="outlined"
                              fullWidth
                              placeholder="0.00"
                              value={amount}
                              error={amountError}
                              onChange={(e) => {
                                setAmount(e.target.value);
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <img src={ `/tokens/unknown-logo.png` } alt="" width={30} height={30} />
                                  </InputAdornment>
                                ),
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Typography>{asset?.gauge?.poolSymbol}</Typography>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </>
                  }
                  {
                    activeTab === 'withdraw' &&
                    <>
                      <Grid container spacing={2}>
                        <Grid item lg={12} xs={12}>
                          <div className={classes.textField}>
                            <div className={classes.inputTitleContainer}>
                              <div className={classes.inputTitle}>
                                <Typography variant="h5" className={ classes.inputTitleText }>
                                  Protocol:
                                </Typography>
                              </div>
                            </div>
                            <Select
                              value={protocol}
                              onChange={(e) => { setProtocol(e.target.value) }}
                              variant="outlined"
                              fullWidth
                              className={ classes.inputSelect }
                            >
                              <MenuItem value={'Curve'}>
                                <div className={ classes.inline }>
                                  <img className={ classes.lpOptionIcon } src='/images/Curve.png' alt='Curve Logo' width={ 30 } height={ 30 } />
                                  <Typography>Unstake from Curve</Typography>
                                </div>
                              </MenuItem>
                              <MenuItem value={'Convex'}>
                                <div className={ classes.inline }>
                                  <img className={ classes.lpOptionIcon } src='/images/Convex.png' alt='Convex Logo' width={ 30 } height={ 30 } />
                                  <Typography>Unstake from Convex</Typography>
                                </div>
                              </MenuItem>
                            </Select>
                          </div>
                        </Grid>
                        <Grid item lg={12} xs={12}>
                          <div className={classes.textField}>
                            <div className={classes.inputTitleContainer}>
                              <div className={classes.inputTitle}>
                                <Typography variant="h5" className={ classes.inputTitleText }>
                                  Unstake Amount:
                                </Typography>
                              </div>
                              <div className={classes.balances}>
                                <Typography
                                  variant="h5"
                                  onClick={() => {
                                    setAmountPercent('withdrawAmount', 100);
                                  }}
                                  className={classes.value}
                                  noWrap
                                >
                                  Balance: {formatCurrency( protocol === 'Curve' ? asset?.gauge?.userGaugeBalance : asset?.convex?.balance )}
                                </Typography>
                              </div>
                            </div>
                            <TextField
                              variant="outlined"
                              fullWidth
                              placeholder="0.00"
                              value={withdrawAmount}
                              error={withdrawAmountError}
                              onChange={(e) => {
                                setWithdrawAmount(e.target.value);
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <img src={ `/tokens/unknown-logo.png` } alt="" width={30} height={30} />
                                  </InputAdornment>
                                ),
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Typography>{asset?.gauge?.poolSymbol}</Typography>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </>
                  }
                </div>
                </Grid>
                <Grid item lg={3} xs={12} className={classes.buttonWrap}>
                {
                  activeTab === 'deposit' &&
                  <div className={ classes.actionsContainer }>
                    <Button
                      className={ classes.multiApprovalButton }
                      variant='contained'
                      size='large'
                      color='primary'

                      disabled={ depositApprovalNotRequired || approvalLoading }
                      onClick={ () => { onApprove() } }
                      >
                      <Typography className={ classes.actionButtonText }>{ depositApprovalNotRequired ? formatApproved( protocol === 'Curve' ? asset?.gauge?.poolGaugeAllowance : asset?.convex?.poolGaugeAllowance) : (approvalLoading ? `Approving` : `Approve ${ protocol === 'Curve' ? 'Curve' : 'Convex' }`)}</Typography>
                      { approvalLoading && <CircularProgress size={10} className={ classes.loadingCircle } /> }
                    </Button>
                    <Button
                      variant='contained'
                      size='large'
                      color='primary'
                      className={classes.buttonOverride}
                      disabled={ depositLoading || !depositApprovalNotRequired }
                      onClick={ onDeposit }
                      >
                      <Typography className={ classes.actionButtonText }>{ depositLoading ? `Staking` : `Stake` }</Typography>
                      { depositLoading && <CircularProgress size={10} className={ classes.loadingCircle } /> }
                    </Button>
                  </div>
                }
                {
                  activeTab === 'withdraw' &&
                  <div className={ classes.actionsContainer }>
                    <Button
                      variant='contained'
                      size='large'
                      color='primary'
                      className={classes.buttonOverride}
                      disabled={ depositLoading }
                      onClick={ onWithdraw }
                      >
                      <Typography className={ classes.actionButtonText }>{ depositLoading ? `Unstaking` : `Unstake` }</Typography>
                      { depositLoading && <CircularProgress size={10} className={ classes.loadingCircle } /> }
                    </Button>
                  </div>
                }
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
