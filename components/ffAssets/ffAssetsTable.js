import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography, Tooltip } from '@material-ui/core';
import { useRouter } from "next/router";
import BigNumber from 'bignumber.js';

import { formatCurrency } from '../../utils';

function descendingComparator(a, b, orderBy) {
  if (!a || !b) {
    return 0;
  }

  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'asset', numeric: false, disablePadding: false, label: 'Asset' },
  {
    id: 'balance',
    numeric: true,
    disablePadding: false,
    label: 'Wallet',
  },
  {
    id: 'poolBalance',
    numeric: true,
    disablePadding: false,
    label: 'Curve LP',
  },
  {
    id: 'stakedBalance',
    numeric: true,
    disablePadding: false,
    label: 'Staked in Curve',
  },
  {
    id: 'convexBalance',
    numeric: true,
    disablePadding: false,
    label: 'Staked in Convex',
  },
  {
    id: '',
    numeric: true,
    disablePadding: false,
    label: 'Actions',
  }
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell className={classes.overrideTableHead} key={headCell.id} align={headCell.numeric ? 'right' : 'left'} padding={'normal'} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={createSortHandler(headCell.id)}>
              <Typography variant="h5">{headCell.label}</Typography>
              {orderBy === headCell.id ? <span className={classes.visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span> : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  assetTableRow: {
    '&:hover': {
      background: 'rgba(104,108,122,0.05)',
    }
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  inline: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: '12px',
  },
  textSpaced: {
    lineHeight: '1.5',
  },
  cell: {},
  cellSuccess: {
    color: '#4eaf0a',
  },
  cellAddress: {
    cursor: 'pointer',
  },
  aligntRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  skelly: {
    marginBottom: '12px',
    marginTop: '12px',
  },
  skelly1: {
    marginBottom: '12px',
    marginTop: '24px',
  },
  skelly2: {
    margin: '12px 6px',
  },
  tableBottomSkelly: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  assetInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    padding: '24px',
    width: '100%',
    flexWrap: 'wrap',
    borderBottom: '1px solid rgba(104, 108, 122, 0.25)',
    background: 'radial-gradient(circle, rgba(63,94,251,0.7) 0%, rgba(47,128,237,0.7) 48%) rgba(63,94,251,0.7) 100%',
  },
  assetInfoError: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    padding: '24px',
    width: '100%',
    flexWrap: 'wrap',
    borderBottom: '1px rgba(104, 108, 122, 0.25)',
    background: '#dc3545',
  },
  infoField: {
    flex: 1,
  },
  flexy: {
    padding: '6px 0px',
  },
  overrideCell: {
    padding: '0px',
  },
  hoverRow: {
    cursor: 'pointer',
  },
  statusLiquid: {
    color: '#dc3545',
  },
  statusWarning: {
    color: '#FF9029',
  },
  statusSafe: {
    color: 'green',
  },
  imgLogo: {
    marginRight: '12px'
  },
  overrideTableHead: {
    borderBottom: '1px solid rgba(104,108,122,0.2) !important',
  },
}));

export default function EnhancedTable({ assets }) {
  const classes = useStyles();
  const router = useRouter();

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('balance');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  if (!assets) {
    return (
      <div className={classes.root}>
        <Skeleton variant="rect" width={'100%'} height={40} className={classes.skelly1} />
        <Skeleton variant="rect" width={'100%'} height={70} className={classes.skelly} />
        <Skeleton variant="rect" width={'100%'} height={70} className={classes.skelly} />
        <Skeleton variant="rect" width={'100%'} height={70} className={classes.skelly} />
        <Skeleton variant="rect" width={'100%'} height={70} className={classes.skelly} />
        <Skeleton variant="rect" width={'100%'} height={70} className={classes.skelly} />
      </div>
    );
  }

  const onView = (asset) => {
    router.push(`/asset/${asset.address}/curve`)
  }

  const showCurveTooltip = (row) => {
    return <div className={ classes.tooltipContainer }>
      <Typography>Token APY based on current prices and reward rates. Stake veCRV to acheive up to 2.5x the CRV rewards.</Typography>
      <Typography>Fees ~ { formatCurrency(row.gauge.apy) }%</Typography>
      <Typography>CRV ~ { formatCurrency(row.gauge.apyBase) }% -> { formatCurrency(row.gauge.apyBoosted) }%</Typography>
      <Typography>rKP3R ~ Unknown</Typography>
    </div>
  }

  return (
    <div className={classes.root}>
      <TableContainer>
        <Table className={classes.table} aria-labelledby="tableTitle" size={'medium'} aria-label="enhanced table">
          <EnhancedTableHead classes={classes} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody>
            {stableSort(assets, getComparator(order, orderBy)).map((row, index) => {
              if (!row) {
                return null;
              }
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow key={labelId} className={classes.assetTableRow} onClick={ () => { onView(row) } }>
                  <TableCell className={classes.cell}>
                    <div className={ classes.inline }>
                      <img className={ classes.imgLogo } src={`https://raw.githubusercontent.com/yearn/yearn-assets/master/icons/multichain-tokens/1/${row.address}/logo-128.png`} width='35' height='35' alt='' onError={(e)=>{e.target.onerror = null; e.target.src="/tokens/unknown-logo.png"}} />
                      <div>
                        <Typography variant="h2" className={classes.textSpaced}>
                          { row.symbol }
                        </Typography>
                        <Typography variant="h5" className={classes.textSpaced} color='textSecondary'>
                          { row.name }
                        </Typography>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    <Typography variant="h2" className={classes.textSpaced}>
                      { formatCurrency(row.balance) }
                    </Typography>
                    <Typography variant="h5" className={classes.textSpaced} color='textSecondary'>
                      { row.symbol }
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    <Typography variant="h2" className={classes.textSpaced}>
                      { formatCurrency(row.gauge.userPoolBalance) }
                    </Typography>
                    <Tooltip title={ 'Variable APY based on todays trading activity' }>
                      <Typography variant="h5" className={classes.textSpaced} color='textSecondary'>
                        { formatCurrency(row.gauge.apy) }%
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    <Typography variant="h2" className={classes.textSpaced}>
                      { formatCurrency(row.gauge.userGaugeBalance) }
                    </Typography>
                    <Tooltip title={ showCurveTooltip(row) }>
                      <Typography variant="h5" className={classes.textSpaced} color='textSecondary'>
                        { formatCurrency(BigNumber(row.gauge.apyBase).plus(row.gauge.apy).plus(row.gauge.rKP3RAPY)) }% -> { formatCurrency(BigNumber(row.gauge.apyBoosted).plus(row.gauge.apy).plus(row.gauge.rKP3RAPY)) }%
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    <Typography variant="h2" className={classes.textSpaced}>
                      { formatCurrency(row.convex.balance) }
                    </Typography>
                    <Typography variant="h5" className={classes.textSpaced} color='textSecondary'>
                      { row.gauge.poolSymbol }
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    <Button variant='outlined' color='primary' onClick={ () => { onView(row) } }>View</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
