import { Paper, Typography, Button, TextField, InputAdornment, CircularProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Skeleton from '@material-ui/lab/Skeleton';

import { formatCurrency } from '../../utils';
import classes from './ffOverview.module.css';

export default function ffOverview() {
  return (
    <div className={ classes.container }>
      <div className={ classes.fieldsContainer }>
        <div className={ classes.field }>
          <Typography className={ classes.title }>IBFF Balance:</Typography>
          <Typography className={ classes.value }>30101.00</Typography>
        </div>
        <div>
          <Typography className={ classes.title }>Locked Balance:</Typography>
          <Typography className={ classes.value }>30101.00</Typography>
        </div>
        <div>
          <Typography className={ classes.title }>Rewards Available:</Typography>
          <Typography className={ classes.value }>301.00</Typography>
        </div>
      </div>
    </div>
  );
}
