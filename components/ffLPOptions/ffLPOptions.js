import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField, InputAdornment, CircularProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Skeleton from '@material-ui/lab/Skeleton';

import { formatCurrency } from '../../utils';
import classes from './ffLPOptions.module.css';

import stores from '../../stores'
import { FIXED_FOREX_UPDATED } from '../../stores/constants';

export default function ffLPOptions({ asset }) {

  const navigate = (url) => {
    window.open(url, '_blank')
  }

  return (
    <div className={ classes.container}>
      <Typography variant="h5" className={ classes.title}>LP Opportunities</Typography>
      <Paper elevation={0} className={ classes.lpOptionsContainer }>
        <div className={ classes.lpOption } onClick={ () => { navigate('https://curve.fi') } }>
          <div className={ classes.lpOptionTitle }>
            <img className={ classes.lpOptionIcon } src='/images/Curve.png' alt='Curve Logo' width={ 60 } height={ 60 } />
            <div>
              <Typography className={ classes.lpOptionName }>Curve.fi</Typography>
              <Typography className={ classes.lpOptionDescription }>Pool LP</Typography>
            </div>
          </div>
          {
            <div className={ classes.activeIcon }></div>
          }
        </div>
        <div className={ classes.lpOption } onClick={ () => { navigate(`https://app.sushi.com/add/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/${asset ? asset.address : ''}`) } }>
          <div className={ classes.lpOptionTitle }>
            <img className={ classes.lpOptionIcon } src='/images/Sushi.png' alt='Sushi Logo' width={ 60 } height={ 60 } />
            <div>
              <Typography className={ classes.lpOptionName }>Sushi</Typography>
              <Typography className={ classes.lpOptionDescription }>Pair LP</Typography>
            </div>
          </div>
          {
            <div className={ classes.activeIcon }></div>
          }
        </div>
        <div className={ classes.lpOption } onClick={ () => { navigate('https://yearn.fi/lend') } }>
          <div className={ classes.lpOptionTitle }>
            <img className={ classes.lpOptionIcon } src='/images/yearn-fi.svg' alt='Yearn.fi logo' width={ 60 } height={ 60 } />
            <div>
              <Typography className={ classes.lpOptionName }>Yearn.fi</Typography>
              <Typography className={ classes.lpOptionDescription }>Lend LP</Typography>
            </div>
          </div>
          {
            <div className={ classes.activeIcon }></div>
          }
        </div>
      </Paper>
    </div>
  );
}
