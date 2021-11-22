import React from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography, Button, CircularProgress } from '@material-ui/core';
import BigNumber from 'bignumber.js';


import stores from '../../stores'
import {
  FIXED_FOREX_CLAIM_CURVE_REWARDS,
  FIXED_FOREX_CURVE_REWARD_CLAIMED,
  ERROR,
  FIXED_FOREX_CLAIM_DISTRIBUTION_REWARD,
  FIXED_FOREX_DISTRIBUTION_REWARD_CLAIMED,
  FIXED_FOREX_CLAIM_VESTING_REWARD,
  FIXED_FOREX_VESTING_REWARD_CLAIMED,
  FIXED_FOREX_CLAIM_RKP3R,
  FIXED_FOREX_RKP3R_CLAIMED,
} from '../../stores/constants';
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
    id: 'rewards',
    numeric: true,
    disablePadding: false,
    label: 'Rewards Available',
  },
  {
    id: 'claim',
    numeric: true,
    disablePadding: false,
    label: '',
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
    borderBottom: '1px solid rgba(128, 128, 128, 0.32)',
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
    borderBottom: '1px solid rgba(128, 128, 128, 0.32)',
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
  tableContainer: {
    overflowX: 'hidden'
  },
  buttonOverride: {
    boxShadow: 'none !important',
    minWidth: '235px',
    marginTop: '15px',
    background: 'gold',
    color: '#000',
  },
  actionButtonText: {
    fontWeight: '700 !important',
    fontSize: '13px !important',
    textTransform: 'capitalize !important'
  },
  loadingCircle: {
    marginLeft: '6px !important',
    color: '#FFF !important',
  },
  overrideTableHead: {
    borderBottom: '1px solid rgba(104,108,122,0.2) !important',
  },
}));

export default function EnhancedTable({ claimable, crv, ibEUR, rKP3R }) {
  const classes = useStyles();

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('balance');
  const [claimLoading, setClaimLoading ] = React.useState(false)

  React.useEffect(() => {
    const rewardClaimed = () => {
      setClaimLoading(false)
    }

    stores.emitter.on(FIXED_FOREX_CURVE_REWARD_CLAIMED, rewardClaimed);
    stores.emitter.on(FIXED_FOREX_DISTRIBUTION_REWARD_CLAIMED, rewardClaimed);
    stores.emitter.on(FIXED_FOREX_VESTING_REWARD_CLAIMED, rewardClaimed);
    stores.emitter.on(FIXED_FOREX_RKP3R_CLAIMED, rewardClaimed);

    stores.emitter.on(ERROR, rewardClaimed);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_CURVE_REWARD_CLAIMED, rewardClaimed);
      stores.emitter.removeListener(FIXED_FOREX_DISTRIBUTION_REWARD_CLAIMED, rewardClaimed);
      stores.emitter.removeListener(FIXED_FOREX_VESTING_REWARD_CLAIMED, rewardClaimed);
      stores.emitter.removeListener(FIXED_FOREX_RKP3R_CLAIMED, rewardClaimed);
      stores.emitter.removeListener(ERROR, rewardClaimed);
    };
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const onClaim = (asset) => {
    console.log(asset)
    setClaimLoading(true)

    if(asset.gauge) {
      // this is a gauge
      stores.dispatcher.dispatch({ type: FIXED_FOREX_CLAIM_CURVE_REWARDS, content: { asset: asset.gauge }})
    } else if(asset.type === 'Fixed Forex' && asset.description === 'Fee Claim') {
      stores.dispatcher.dispatch({ type: FIXED_FOREX_CLAIM_DISTRIBUTION_REWARD, content: {  }})
    } else if(gauge.type === 'Fixed Forex' && gauge.description === 'Vesting Rewards') {
      stores.dispatcher.dispatch({ type: FIXED_FOREX_CLAIM_VESTING_REWARD, content: {  }})
    } else if(gauge.type === 'Fixed Forex' && gauge.description === 'Redeemable KP3R') {
      stores.dispatcher.dispatch({ type: FIXED_FOREX_CLAIM_RKP3R, content: {  }})
    }

  }

  if (!claimable) {
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

  return (
    <div className={classes.root}>
      <TableContainer className={ classes.tableContainer }>
        <Table className={classes.table} aria-labelledby="tableTitle" size={'medium'} aria-label="enhanced table">
          <EnhancedTableHead classes={classes} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody>
            {stableSort(claimable, getComparator(order, orderBy)).map((row) => {
              if (!row) {
                return null;
              }

              return (
                <TableRow key={row.type+'_'+row.description}>
                  <TableCell className={classes.cell}>
                    <div className={ classes.inline }>
                      {
                        row?.type === 'Fixed Forex' && <img className={ classes.imgLogo } src={`/images/ff-icon.svg`} width='35' height='35' alt='' />}
                      {
                        row?.type !== 'Fixed Forex' && <img className={ classes.imgLogo } src={`https://raw.githubusercontent.com/yearn/yearn-assets/master/icons/multichain-tokens/1/${row.address}/logo-128.png`} width='35' height='35' alt='' />
                      }
                      <div>
                        <Typography variant="h2" className={classes.textSpaced}>
                          { row?.type }
                        </Typography>
                        <Typography variant="h5" className={classes.textSpaced} color='textSecondary'>
                          { row?.description }
                        </Typography>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    <Typography variant="h2" className={classes.textSpaced}>
                      { formatCurrency(row?.earned) } { row.symbol }
                    </Typography>
                    <Typography variant="h5" className={classes.textSpaced} color='textSecondary'>
                      ${
                        row.symbol === 'CRV' &&
                        formatCurrency(BigNumber(row?.earned).times(crv?.price))
                      }
                      {
                        row.symbol === 'ibEUR' &&
                        formatCurrency(BigNumber(row?.earned).times(ibEUR?.price))
                      }
                      {
                        (row.symbol === 'rKP3R' || row.symbol === 'kp3R') &&
                        formatCurrency(BigNumber(row?.earned).times(rKP3R?.price))

                      }
                      {
                        !['CRV', 'ibEUR', 'rKP3R', 'kp3R'].includes(row.symbol) &&
                        formatCurrency(0)
                      }
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    <Button
                      className={ classes.buttonOverride }
                      variant='contained'
                      size='large'
                      color='primary'
                      disabled={ claimLoading }
                      onClick={ () => { onClaim(row) } }>
                      <Typography className={ classes.actionButtonText }>{ claimLoading ? `Claiming` : `Claim` }</Typography>
                      { claimLoading && <CircularProgress size={10} className={ classes.loadingCircle } /> }
                    </Button>
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
