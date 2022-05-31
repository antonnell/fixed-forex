import React, { useState, useEffect } from 'react';
import { Paper, Grid, Typography, Button, TextField, InputAdornment, CircularProgress, SvgIcon } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Skeleton from '@material-ui/lab/Skeleton';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BigNumber from 'bignumber.js';

import { formatCurrency } from '../../utils';
import classes from './ffVoteOverview.module.css';

import stores from '../../stores'
import { FIXED_FOREX_UPDATED } from '../../stores/constants';

import GaugeVotesPie from './gaugeVotePie'

function MyVotesIcon(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 48 48" strokeWidth="1" className={className}>
      <g strokeWidth="2" transform="translate(0, 0)"><path data-cap="butt" data-color="color-2" fill="none" stroke="#ffffff" strokeWidth="2" strokeMiterlimit="10" d="M19,24.153V30L8.454,32.812 C5.828,33.513,4,35.891,4,38.61V46h40v-7.39c0-2.718-1.828-5.097-4.454-5.797L29,30v-5.847" strokeLinejoin="miter" strokeLinecap="butt"></path> <path fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M24,26L24,26 c-5.523,0-10-6.477-10-12v-2c0-5.523,4.477-10,10-10h0c5.523,0,10,4.477,10,10v2C34,19.523,29.523,26,24,26z" strokeLinejoin="miter"></path></g>
    </SvgIcon>
  );
}

function TotalVotesIcon(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 48 48" strokeWidth="1" className={className}>
      <g strokeWidth="2" transform="translate(0, 0)"><path data-color="color-2" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M9,13L9,13 c-2.209,0-4-1.791-4-4v0c0-2.209,1.791-4,4-4h0c2.209,0,4,1.791,4,4v0C13,11.209,11.209,13,9,13z" strokeLinejoin="miter"></path> <path data-cap="butt" data-color="color-2" fill="none" stroke="#ffffff" strokeWidth="2" strokeMiterlimit="10" d="M12,43H6L5,32l-3-1v-9 c0-2.209,1.791-4,4-4h6c1.454,0,2.727,0.777,3.427,1.937" strokeLinejoin="miter" strokeLinecap="butt"></path> <path data-color="color-2" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M39,13 L39,13c2.209,0,4-1.791,4-4v0c0-2.209-1.791-4-4-4h0c-2.209,0-4,1.791-4,4v0C35,11.209,36.791,13,39,13z" strokeLinejoin="miter"></path> <path data-cap="butt" data-color="color-2" fill="none" stroke="#ffffff" strokeWidth="2" strokeMiterlimit="10" d="M36,43h6l1-11l3-1v-9 c0-2.209-1.791-4-4-4h-6c-1.454,0-2.727,0.777-3.427,1.937" strokeLinejoin="miter" strokeLinecap="butt"></path> <path fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M24,14L24,14 c-3.314,0-6-2.686-6-6v0c0-3.314,2.686-6,6-6h0c3.314,0,6,2.686,6,6v0C30,11.314,27.314,14,24,14z" strokeLinejoin="miter"></path> <path fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M29,46H19l-1-12l-4-1V23 c0-2.209,1.791-4,4-4h12c2.209,0,4,1.791,4,4v10l-4,1L29,46z" strokeLinejoin="miter"></path></g>
    </SvgIcon>
  );
}

export default function ffVoteOverview() {

  const [ gauges, setGauges ] = useState([])
  const [ ibff, setIBFF] = useState(null)
  const [ veIBFF, setVeIBFF] = useState(null)

  useEffect(() => {
    const forexUpdated = () => {
      setIBFF(stores.fixedForexStore.getStore('ibff'))
      setVeIBFF(stores.fixedForexStore.getStore('veIBFF'))
      setGauges(stores.fixedForexStore.getStore('assets'))
    }

    setIBFF(stores.fixedForexStore.getStore('ibff'))
    setVeIBFF(stores.fixedForexStore.getStore('veIBFF'))
    setGauges(stores.fixedForexStore.getStore('assets'))

    stores.emitter.on(FIXED_FOREX_UPDATED, forexUpdated);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, forexUpdated);
    };
  }, []);

  return (
    <div className={ classes.container }>
      <div className={ classes.fieldsContainer }>
      <Grid container spacing={2}>
        <Grid item lg={4} md={12} sm={12}>
          <div className={ classes.field }>
          <div className={classes.iconWrap}>
            <MyVotesIcon className={ classes.overviewIcon } />
          </div>
            <div>
              <Typography className={ classes.title }>Your Voting Power:</Typography>
              <div className={ classes.inline }>
                <Typography className={ classes.value }>{ formatCurrency((veIBFF && veIBFF.vestingInfo) ? veIBFF.vestingInfo.votePower : 0) }</Typography>
                <Typography className={ classes.valueSymbol }>{ veIBFF ? veIBFF.symbol : '' }</Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <div className={ classes.field }>
          <div className={classes.iconWrap}>
            <TotalVotesIcon className={ classes.overviewIcon } />
          </div>
            <div>
              <Typography className={ classes.title }>Total Voting Power:</Typography>
              <div className={ classes.inline }>
                <Typography className={ classes.value }>{ formatCurrency((veIBFF && veIBFF.vestingInfo) ? veIBFF.vestingInfo.totalSupply : 0) }</Typography>
                <Typography className={ classes.valueSymbol }>{ veIBFF ? veIBFF.symbol : '' }</Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <div className={ classes.field }>
            <div className={ classes.pieField }>
              <GaugeVotesPie data={gauges.map((gauge) => {
                return {
                  description: `${gauge?.gauge?.coin0?.symbol} - ${gauge?.gauge?.coin1?.symbol}`,
                  value: BigNumber(gauge?.gauge?.votePercent).toNumber()
                }
              })} />
            </div>
          </div>
        </Grid>
      </Grid>
      </div>
    </div>
  );
}
