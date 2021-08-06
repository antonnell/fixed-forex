import { Paper, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import classes from './ffVest.module.css';

export default function loading({ ibff, veIBFF }) {

  return (

    <Paper elevation={0} className={ classes.container }>
      <Skeleton className={ classes.loadingSkeleton }/>
    </Paper>
  );
}
