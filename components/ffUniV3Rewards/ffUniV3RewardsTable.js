import React from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography, Button, CircularProgress } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import stores from '../../stores'
import {
  ERROR,
  FIXED_FOREX_WITHDRAW_UNI,
  FIXED_FOREX_UNI_WITHDRAWN,
  FIXED_FOREX_GET_UNI_REWARDS,
  FIXED_FOREX_UNI_REWARDS_RETURNED
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
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Price Range',
  },
  {
    id: 'earned',
    numeric: true,
    disablePadding: false,
    label: 'Rewards',
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
          <TableCell key={headCell.id} align={headCell.numeric ? 'right' : 'left'} padding={'normal'} sortDirection={orderBy === headCell.id ? order : false}>
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
  cell: {
    position: 'relative'
  },
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
    fontWeight: '700 !important',
    boxShadow: 'none !important',
    width: '160px',
    marginLeft: '12px'
  },
  actionButtonText: {
    fontSize: '12px !important',
    textTransform: 'capitalize !important'
  },
  loadingCircle: {
    marginLeft: '6px !important'
  },
  doubleIcon: {
    width: '80px',
    height: '34px',
    position: 'relative'
  },
  imgLogoFirst: {
    position: 'absolute',
    left: '0px',
    top: '0px',
    borderRadius: '30px',
    border: '1px solid rgba(128, 128, 128, 0.2)',
    background: '#FFF'
  },
  imgLogoSecond: {
    position: 'absolute',
    left: '20px',
    top: '0px',
    borderRadius: '30px',
    border: '1px solid rgba(128, 128, 128, 0.2)',
    background: '#FFF'
  },
  greenDot: {
    borderRadius: '10px',
    width: '10px',
    height: '10px',
    background: 'green',
    position: 'absolute',
    right: '0px',
    top: '24px'
  },
  orangeDot: {
    borderRadius: '10px',
    width: '10px',
    height: '10px',
    background: 'orange',
    position: 'absolute',
    right: '0px',
    top: '24px'
  }
}));

export default function EnhancedTable({ tokens, rKP3R }) {
  const classes = useStyles();

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('balance');
  const [stakeLoading, setStakeLoading ] = React.useState(false);
  const [claimLoading, setClaimLoading] = React.useState(false);

  React.useEffect(() => {
    const uniDeposited = () => {
      setStakeLoading(false)
      setClaimLoading(false)
    }

    stores.emitter.on(FIXED_FOREX_UNI_WITHDRAWN, uniDeposited);
    stores.emitter.on(FIXED_FOREX_UNI_REWARDS_RETURNED, uniDeposited);

    stores.emitter.on(ERROR, uniDeposited);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UNI_WITHDRAWN, uniDeposited);
      stores.emitter.removeListener(FIXED_FOREX_UNI_REWARDS_RETURNED, uniDeposited);
      stores.emitter.removeListener(ERROR, uniDeposited);
    };
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const onStake = (token) => {
    setStakeLoading(true)
    stores.dispatcher.dispatch({ type: FIXED_FOREX_WITHDRAW_UNI, content: { tokenID: token.tokenID }})
  }

  const onClaim = (token) => {
    setClaimLoading(true)
    stores.dispatcher.dispatch({ type: FIXED_FOREX_GET_UNI_REWARDS, content: { tokenID: token.tokenID }})
  }

  if (!tokens) {
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
            { tokens.length === 0 &&
              <TableRow key={'nothing'}>
                <TableCell className={classes.cell} colspan={5}>
                  <Typography variant='h2'>No positions available</Typography>
                  <Typography >Create your Uniswap position <a className={ classes.dontUnderline } target='_blank' href='https://app.uniswap.org/#/add/ETH/0x1cEB5cB57C4D4E2b2433641b95Dd330A33185A44/10000'>here</a> and stake them above to start earning.</Typography>
                </TableCell>
              </TableRow>
            }
            { tokens.length > 0 &&
              stableSort(tokens, getComparator(order, orderBy)).map((row) => {
              if (!row) {
                return null;
              }

              return (
                <TableRow key={row.type+'_'+row.description}>
                  <TableCell className={classes.cell}>
                    <div className={ classes.inline }>
                      <div className={ classes.doubleIcon }>
                        <img className={ classes.imgLogoFirst } src={`https://assets.coingecko.com/coins/images/12966/large/kp3r_logo.jpg`} width='35' height='35' alt='' />
                        <img className={ classes.imgLogoSecond } src={`https://assets.coingecko.com/coins/images/279/large/ethereum.png`} width='35' height='35' alt='' />
                      </div>
                      <div>
                        <Typography variant="h2" className={classes.textSpaced}>
                          { formatCurrency(row?.balance) } KP3R / ETH
                        </Typography>
                        <Typography variant="h5" className={classes.textSpaced} color='textSecondary'>
                          Uniswap LP Position
                        </Typography>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    {
                      (row && row.prices) ? (
                        BigNumber(row.prices.currentPrice).gt(row.prices.lowPrice) && BigNumber(row.prices.currentPrice).lt(row.prices.highPrice) ? <div className={ classes.greenDot }></div> : <div className={ classes.orangeDot }></div>
                      ) : 'Fetching'
                    }
                    <Typography variant="h2" className={classes.textSpaced}>
                      {
                        row && row.prices && formatCurrency(row?.prices?.currentPrice)
                      } KP3R per ETH
                    </Typography>
                    <Typography variant="h5" className={classes.textSpaced} color='textSecondary'>
                      Min: { formatCurrency(row?.prices?.lowPrice) } -  Max: { formatCurrency(row?.prices?.highPrice) }
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    <Typography variant="h2" className={classes.textSpaced}>
                      { formatCurrency(row.reward) } rKP3R
                    </Typography>
                    <Typography variant="h5" className={classes.textSpaced} color='textSecondary'>
                      $ { formatCurrency(BigNumber(row.reward).times(rKP3R?.price)) }
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    <Button
                      className={ classes.buttonOverride }
                      variant='contained'
                      size='large'
                      color='primary'
                      disabled={ stakeLoading }
                      onClick={ () => { onStake(row) } }>
                      <Typography className={ classes.actionButtonText }>{ stakeLoading ? `Withdrawing` : `Withdraw` }</Typography>
                      { stakeLoading && <CircularProgress size={10} className={ classes.loadingCircle } /> }
                    </Button>
                    <Button
                      className={ classes.buttonOverride }
                      variant='contained'
                      size='large'
                      color='primary'
                      disabled={ claimLoading || BigNumber(row.reward).eq(0) }
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
