import React, { useState, useEffect } from 'react';
import { Paper, Grid, Typography, Button, TextField, InputAdornment, CircularProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Skeleton from '@material-ui/lab/Skeleton';
import { useRouter } from "next/router";

import classes from './ffLPOptions.module.css';

export default function ffLPOptions({ asset }) {

  const router = useRouter();

  const localNav = (screen) => {
    router.push(`${router.asPath}/${screen}`)
  }

  const navigate = (url) => {
    window.open(url, '_blank')
  }

  return (
    <div className={ classes.container}>
      <Typography variant="h5" className={ classes.title}>LP Opportunities</Typography>
      <Paper elevation={0} className={ classes.lpOptionsContainer }>

        <Grid container spacing={0}>
          <Grid item lg={4} xs={12}>
            <div className={ classes.lpOption1 } onClick={ () => { localNav('curve') } }>
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
          </Grid>
          <Grid item lg={4} xs={12}>
            <div className={ classes.lpOption2 } onClick={ () => { navigate(`https://app.sushi.com/add/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/${asset ? asset.address : ''}`) } }>
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
          </Grid>
          <Grid item lg={4} xs={12}>
            <div className={ classes.lpOption3 } onClick={ () => { navigate('https://yearn.fi/lend') } }>
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
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
