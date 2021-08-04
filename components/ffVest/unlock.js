import { Paper, Typography } from '@material-ui/core';
import classes from './ffVest.module.css';

export default function Unlock({ ibff, veIBFF }) {

  return (

    <Paper elevation={0} className={ classes.container }>
      I haven't built this yet. Your lock duration has expired. You can remove your ibff from the veIBFF contract or re-lock them.
    </Paper>
  );
}
