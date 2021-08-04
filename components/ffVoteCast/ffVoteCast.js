import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField, InputAdornment, CircularProgress, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import BigNumber from 'bignumber.js';
import Skeleton from '@material-ui/lab/Skeleton';
import moment from 'moment';
import { formatCurrency } from '../../utils';
import classes from './ffVoteCast.module.css';
import stores from '../../stores'
import {
  ERROR,
  FIXED_FOREX_UPDATED,
  MAX_UINT256,
  FIXED_FOREX_VOTE,
  FIXED_FOREX_VOTE_RETURNED,
} from '../../stores/constants';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

export default function ffVoteCast() {

  const [ voteLoading, setVoteLoading ] = useState(false)

  const [ veIBFF, setVEIBFF ] = useState(null)

  const [ amount, setAmount ] = useState('');
  const [ amountError, setAmountError ] = useState(false);

  const [ gauge, setGauge ] = useState('')
  const [ gaugeError, setGaugeError ] = useState('')

  const [ withdrawAmount, setWithdrawAmount ] = useState('');
  const [ withdrawAmountError, setWithdrawAmountError ] = useState(false);

  useEffect(() => {
    const forexUpdated = () => {
      setVEIBFF(stores.fixedForexStore.getStore('veIBFF'))
    }

    const voteReturned = () => {
      setVoteLoading(false)
    }

    const errorReturned = () => {
      setVoteLoading(false)
    }

    setVEIBFF(stores.fixedForexStore.getStore('veIBFF'))

    stores.emitter.on(FIXED_FOREX_UPDATED, forexUpdated);
    stores.emitter.on(FIXED_FOREX_VOTE_RETURNED, voteReturned);
    stores.emitter.on(ERROR, errorReturned);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, forexUpdated);
      stores.emitter.removeListener(FIXED_FOREX_VOTE_RETURNED, voteReturned);
      stores.emitter.removeListener(ERROR, errorReturned);
    };
  }, []);

  const onAmountChanged = (newVal) => {
    setAmount(newVal)
  }

  const onVote = () => {
    setStakeLoading(true)
    stores.dispatcher.dispatch({ type: FIXED_FOREX_VOTE, content: { amount, gauge } })
  }

  return (
    <Paper elevation={0} className={ classes.container }>
      <div className={ classes.inputsContainer }>
        <div className={classes.textField}>
          <div className={classes.inputTitleContainer}>
            <div className={classes.inputTitle}>
              <Typography variant="h5" className={ classes.inputTitleText }>
                Gauge:
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
                  <img src={ `images/Sushi.png` } alt="" width={30} height={30} />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={classes.textField}>
          <div className={classes.inputTitleContainer}>
            <div className={classes.inputTitle}>
              <Typography variant="h5" className={ classes.inputTitleText }>
                Vote Percent:
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
          />
        </div>
      </div>
      <div className={ classes.actionsContainer }>
        <Button
          variant='contained'
          size='large'
          color='primary'
          disabled={ voteLoading }
          onClick={ onVote }
          >
          <Typography className={ classes.actionButtonText }>{ voteLoading ? `Voting` : `Cast your Vote` }</Typography>
          { voteLoading && <CircularProgress size={10} className={ classes.loadingCircle } /> }
        </Button>
      </div>
    </Paper>
  );
}
