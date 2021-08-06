import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, CircularProgress } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import classes from './ffGauges.module.css';

import GaugesTable from './ffGaugesTable.js'

import stores from '../../stores'
import { FIXED_FOREX_UPDATED, FIXED_FOREX_VOTE, FIXED_FOREX_VOTE_RETURNED, ERROR } from '../../stores/constants';

export default function ffGauges() {

  const [ gauges, setGauges ] = useState([])
  const [ voteLoading, setVoteLoading ] = useState(false)
  const [ votes, setVotes ] = useState([])

  useEffect(() => {
    const forexUpdated = () => {
      const as = stores.fixedForexStore.getStore('assets');
      setGauges(as)

      setVotes(as.map((asset) => {
        return {
          address: asset.gauge.poolAddress,
          value: parseInt((asset && asset.gauge && asset.gauge.userVotePercent) ? asset.gauge.userVotePercent : 0)
        }
      }))

    }

    const as = stores.fixedForexStore.getStore('assets');
    setGauges(as)
    setVotes(as.map((asset) => {
      return {
        address: asset.gauge.poolAddress,
        value: parseInt((asset && asset.gauge && asset.gauge.userVotePercent) ? asset.gauge.userVotePercent : 0)
      }
    }))

    const voteReturned = () => {
      setVoteLoading(false)
    }

    stores.emitter.on(FIXED_FOREX_UPDATED, forexUpdated);
    stores.emitter.on(FIXED_FOREX_VOTE_RETURNED, voteReturned);
    stores.emitter.on(ERROR, voteReturned);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, forexUpdated);
      stores.emitter.removeListener(FIXED_FOREX_VOTE_RETURNED, voteReturned);
      stores.emitter.removeListener(ERROR, voteReturned);
    };
  }, []);

  const onVote = () => {
    setVoteLoading(true)
    stores.dispatcher.dispatch({ type: FIXED_FOREX_VOTE, content: { votes: votes }})
  }

  let totalVotes = votes.reduce((acc, curr) => { return BigNumber(acc).plus(curr.value).toNumber() }, 0 )

  return (
    <Paper elevation={0} className={ classes.container }>
      <GaugesTable gauges={gauges} setParentSliderValues={setVotes} defaultVotes={votes} />
      <div className={ classes.infoSection }>
        <Typography>Voting Power Used: </Typography>
        <Typography className={ `${BigNumber(totalVotes).gt(100) ? classes.errorText : classes.helpText}` }>{ totalVotes } %</Typography>
      </div>
      <div className={ classes.actionButtons }>
        <Button
          className={ classes.actionButton }
          variant='contained'
          size='large'
          color='primary'
          disabled={ voteLoading }
          onClick={ onVote }
          >
          <Typography className={ classes.actionButtonText }>{ voteLoading ? `Casting Votes` : `Cast Votes` }</Typography>
          { voteLoading && <CircularProgress size={10} className={ classes.loadingCircle } /> }
        </Button>
      </div>
    </Paper>
  );
}
