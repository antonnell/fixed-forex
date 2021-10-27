import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField, InputAdornment, CircularProgress, RadioGroup, Radio, FormControlLabel, Grid } from '@material-ui/core';
import classes from './ffVest.module.css';

import LockAmount from './lockAmount'
import LockDuration from './lockDuration'

export default function existingLock({ ibff, veIBFF }) {

  const [ activeTab, setActiveTab ] = useState('amount')

  const toggleAmount = () => {
    setActiveTab('amount')
  }

  const toggleDuration = () => {
    setActiveTab('duration')
  }

  return (
    <div>

    <Grid container spacing={5}>

      <Grid item lg={12} md={6} sm={12} xs={12}>
        <Typography className={ classes.title2} variant="h2">Increase Vest Amount:</Typography>
        <Paper elevation={0} className={ classes.container2 }>
        <LockAmount ibff={ ibff } veIBFF={ veIBFF }/>
        </Paper>
      </Grid>

      <Grid item lg={12} md={6} sm={12} xs={12}>
        <Typography className={ classes.title2} variant="h2">Increase Vest Duration:</Typography>
        <Paper elevation={0} className={ classes.container2 }>
        <LockDuration ibff={ ibff } veIBFF={ veIBFF }/>
        </Paper>
      </Grid>

    </Grid>


    </div>
  );
}
