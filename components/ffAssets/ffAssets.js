import { Paper, Typography, Button, TextField, InputAdornment, CircularProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Skeleton from '@material-ui/lab/Skeleton';

import { formatCurrency } from '../../utils';
import classes from './ffAssets.module.css';

import AssetsTable from './ffAssetsTable.js'

export default function ffAssets() {
  return (
    <div className={ classes.container}>
      <Typography variant="h5" className={ classes.title}>Forex Assets</Typography>
      <Paper elevation={0} className={ classes.tableContainer }>
        <AssetsTable />
      </Paper>
    </div>
  );
}
