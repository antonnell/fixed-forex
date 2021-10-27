import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography, CircularProgress, SvgIcon } from '@material-ui/core';
import { useRouter } from "next/router";
import moment from 'moment';
import BigNumber from 'bignumber.js';

import { formatCurrency } from '../../utils';
import stores from '../../stores'
import { FIXED_FOREX_REDEEM_OPTION, FIXED_FOREX_OPTION_REDEEMED, ERROR, FIXED_FOREX_APPROVE_REDEEM_OPTION, FIXED_FOREX_REDEEM_OPTION_APPROVED } from '../../stores/constants';

function NoneIcon(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 64 64" stroke-width="1" className={className}>
    <g stroke-width="2" transform="translate(0, 0)"><path d="M15.029,48.971A24,24,0,0,1,48.971,15.029" fill="none" stroke="#686c7a" stroke-miterlimit="10" stroke-width="2" data-cap="butt" stroke-linecap="butt" stroke-linejoin="miter"></path><path d="M52.789,20A24.006,24.006,0,0,1,20,52.789" fill="none" stroke="#686c7a" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="miter"></path><line x1="60" y1="4" x2="4" y2="60" fill="none" stroke="#686c7a" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2" data-color="color-2" stroke-linejoin="miter"></line></g>
    </SvgIcon>
  );
}

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
  { id: 'id', numeric: false, disablePadding: false, label: 'Option' },
  {
    id: 'amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
  },
  {
    id: 'strike',
    numeric: true,
    disablePadding: false,
    label: 'Strike',
  },
  {
    id: 'expiry',
    numeric: true,
    disablePadding: false,
    label: 'Expiry',
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
  tableContainer: {
    overflowX: 'hidden'
  },
  buttonOverride: {
    color: '#FFF !important',
    fontWeight: '700 !important',
    boxShadow: 'none !important',
    width: '140px',
    marginLeft: '12px'
  },
  actionButtonText: {
    fontSize: '12px !important',
    textTransform: 'capitalize !important'
  },
  loadingCircle: {
    marginLeft: '6px !important'
  },
  centerThis: {

  },
  nothingTitle: {
    fontSize: '1.2rem',
    marginBottom: '10px',
  },
  nothingDesc: {
    fontSize: '1rem',
    color: 'rgba(104,108,122,1)',
  },
  nothingWrap: {
    background: '',
    textAlign: 'center',
    padding: '60px 40px',
    height: 'calc(100vh - 620px)',
  },
  noneIcon: {
    fontSize: '70px',
    marginBottom: '20px',
    opacity: '0.2',
  },
  overrideTableHead: {
    borderBottom: '1px solid rgba(104,108,122,0.2) !important',
  },
}));

export default function EnhancedTable({ oKP3ROptions }) {
  const classes = useStyles();
  const router = useRouter();

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('balance');
  const [claimLoading, setClaimLoading ] = React.useState(false)
  const [approvalLoading, setApprovalLoading] = React.useState(false)

  React.useEffect(() => {
    const rewardClaimed = () => {
      setClaimLoading(false)
    }
    const approveReturned = () => {
      setApprovalLoading(false)
    }

    stores.emitter.on(FIXED_FOREX_OPTION_REDEEMED, rewardClaimed);
    stores.emitter.on(FIXED_FOREX_REDEEM_OPTION_APPROVED, approveReturned);
    stores.emitter.on(ERROR, rewardClaimed);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_OPTION_REDEEMED, rewardClaimed);
      stores.emitter.removeListener(FIXED_FOREX_REDEEM_OPTION_APPROVED, approveReturned);
      stores.emitter.removeListener(ERROR, rewardClaimed);
    };
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  if (!oKP3ROptions) {
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

  const onRedeem = (option) => {
    setClaimLoading(true)
    stores.dispatcher.dispatch({ type: FIXED_FOREX_REDEEM_OPTION, content: { option }})
  }
  const onApprove = (option) => {
    setApprovalLoading(true)
    stores.dispatcher.dispatch({ type: FIXED_FOREX_APPROVE_REDEEM_OPTION, content: { option: option } })
  }

  const formatApproved = (am) => {
    if(BigNumber(am).gte(1000000000000000)) {
      return 'Approved Forever'
    }

    return `Approved ${formatCurrency(am)}`
  }

  return (
    <div className={classes.root}>
      <TableContainer>
        <Table className={classes.table} aria-labelledby="tableTitle" size={'medium'} aria-label="enhanced table">
          <EnhancedTableHead classes={classes} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody>
            {
              oKP3ROptions.length === 0 &&
              <TableRow key={'nothing'}>
                <TableCell className={classes.cell} colspan={5} className={classes.nothingWrap}>
                  <NoneIcon className={ classes.noneIcon } />
                  <Typography className={classes.nothingTitle} variant="h2">No options available.</Typography>
                  </TableCell>
              </TableRow>
            }
            {
              oKP3ROptions.length > 0 &&
              stableSort(oKP3ROptions, getComparator(order, orderBy)).map((row, index) => {
              if (!row) {
                return null;
              }
              const labelId = `enhanced-table-checkbox-${index}`;

              let depositApprovalNotRequired = false
              if(row) {
                depositApprovalNotRequired = BigNumber(row.rKP3RAllowance).gte(row.strike)
              }

              return (
                <TableRow key={labelId}>
                  <TableCell className={classes.cell}>
                    <div className={ classes.inline }>
                      <img className={ classes.imgLogo } src={`https://assets.coingecko.com/coins/images/12966/large/kp3r_logo.jpg`} width='35' height='35' alt='' onError={(e)=>{e.target.onerror = null; e.target.src="/tokens/unknown-logo.png"}} />
                      <div>
                        <Typography variant="h2" className={classes.textSpaced}>
                          { row.id }
                        </Typography>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    <Typography variant="h2" className={classes.textSpaced}>
                      { formatCurrency(row.amount) }
                    </Typography>
                    <Typography variant="h5" className={classes.textSpaced} color='textSecondary'>
                      KP3R
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    <Typography variant="h2" className={classes.textSpaced}>
                      { formatCurrency(row.strike) }
                    </Typography>
                    <Typography variant="h5" className={classes.textSpaced} color='textSecondary'>
                      USDC
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    <Typography variant="h2" className={classes.textSpaced}>
                      { moment.unix(row.expiry).format('YYYY-MM-DD') }
                    </Typography>
                    <Typography variant="h5" className={classes.textSpaced} color='textSecondary'>
                      { moment.unix(row.expiry).fromNow() }
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    <Button
                      className={ classes.buttonOverride }
                      variant='contained'
                      size='large'
                      color='primary'
                      disabled={ depositApprovalNotRequired || approvalLoading }
                      onClick={ () => { onApprove(row) } }
                      >
                      <Typography className={ classes.actionButtonText }>{ depositApprovalNotRequired ? formatApproved(row.rKP3RAllowance) : (approvalLoading ? `Approving` : `Approve USDC`)} </Typography>
                      { approvalLoading && <CircularProgress size={10} className={ classes.loadingCircle } /> }
                    </Button>
                    <Button
                      className={ classes.buttonOverride }
                      variant='contained'
                      size='large'
                      color='primary'
                      disabled={ claimLoading || !depositApprovalNotRequired }
                      onClick={ () => { onRedeem(row) } }>
                      <Typography className={ classes.actionButtonText }>{ claimLoading ? `Redeeming` : `Redeem` }</Typography>
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
