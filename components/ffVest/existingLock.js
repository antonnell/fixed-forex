import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField, InputAdornment, CircularProgress, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
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
    <Paper elevation={0} className={ classes.container2 }>
      <div className={classes.toggleButtons}>
        <Button className={ `${activeTab === 'amount' ? classes.buttonActive : classes.button} ${ classes.topLeftButton }` } onClick={ toggleAmount }>
          <Typography variant='h5'>Increase Amount</Typography>
          <div className={ `${activeTab === 'amount' ? classes.activeIcon : ''}` }></div>
        </Button>
        <Button className={ `${activeTab === 'duration' ? classes.buttonActive : classes.button}  ${ classes.bottomLeftButton }` } onClick={ toggleDuration }>
          <Typography variant='h5'>Increase Duration</Typography>
          <div className={ `${activeTab === 'duration' ? classes.activeIcon : ''}` }></div>
        </Button>
      </div>
      <div className={ classes.reAddPadding }>
        {
          activeTab === 'amount' &&
          <LockAmount ibff={ ibff } veIBFF={ veIBFF }/>
        }
        {
          activeTab === 'duration' &&
          <LockDuration ibff={ ibff } veIBFF={ veIBFF }/>
        }
      </div>
    </Paper>
  );
}
