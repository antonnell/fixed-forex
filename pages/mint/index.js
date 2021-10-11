import React, { useState, useEffect } from 'react';

import { Typography, Paper, Tooltip, TextField, InputAdornment, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Skeleton from '@material-ui/lab/Skeleton';
import BigNumber from 'bignumber.js';

import { useRouter } from 'next/router';

import Layout from '../../components/layout/layout.js';
import classes from './lend.module.css';

import stores from '../../stores/index.js';
import { LEND_UPDATED } from '../../stores/constants';
import { formatCurrency } from '../../utils';

import Overview from '../../components/ffMintOverview';

import LendSupplyAssetRow from '../../components/lendSupplyAssetRow';
import LendBorrowAssetRow from '../../components/lendBorrowAssetRow';
import LendAllAssetRow from '../../components/lendAllAssetRow';

function Lend({ changeTheme }) {
  const router = useRouter();
  const { address } = router.query;
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [search, setSearch] = useState('');
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('none');
  const getOrderBy = (x) => {
    let y;
    order === 'asc' ? (y = -x) : (y = x);
    return y;
  };
  const storeLendingAssets = stores.lendStore.getStore('lendingAssets');
  const storeLendingSupply = stores.lendStore.getStore('lendingSupply');
  const storeLendingBorrow = stores.lendStore.getStore('lendingBorrow');
  const storeLendingBorrowLimit = stores.lendStore.getStore('lendingBorrowLimit');
  const storeLendingSupplyAPY = stores.lendStore.getStore('lendingSupplyAPY');
  const storeLendingBorrowAPY = stores.lendStore.getStore('lendingBorrowAPY');
  const storeLendingPosition = stores.lendStore.getStore('position');

  const [lendingAssets, setLendingAssets] = useState(storeLendingAssets);
  const [lendingSupply, setLendingSupply] = useState(storeLendingSupply);
  const [lendingBorrow, setLendingBorrow] = useState(storeLendingBorrow);
  const [lendingBorrowLimit, setLendingBorrowLimit] = useState(storeLendingBorrowLimit);
  const [lendingSupplyAPY, setLendingSupplyAPY] = useState(storeLendingSupplyAPY);
  const [lendingBorrowAPY, setLendingBorrowAPY] = useState(storeLendingBorrowAPY);
  const [position, /* setPosition */] = useState(storeLendingPosition);
  const onSearchChanged = (event) => {
    setSearch(event.target.value);
  };
  useEffect(() => {
    document?.getElementById(address)?.scrollIntoView();
  }, []);

  const filteredLendingAssets = lendingAssets
    .map((asset) => {
      if (asset.address.toLowerCase() === address?.toLocaleLowerCase()) {
        asset.open = true;
      } else {
        asset.open = false;
      }
      return asset;
    })
    .filter((asset) => {
      let returnValue = true;
      if (search && search !== '') {
        returnValue =
          asset.displayName.toLowerCase().includes(search.toLowerCase()) ||
          asset.address.toLowerCase().includes(search.toLowerCase()) ||
          asset.tokenMetadata.displayName.toLowerCase().includes(search.toLowerCase()) ||
          asset.tokenMetadata.symbol.toLowerCase().includes(search.toLowerCase()) ||
          asset.symbol.toLowerCase().includes(search.toLowerCase());
      }
      return returnValue;
    })
    .sort((a, b) => {
      if (orderBy === 'none') {
        if (BigNumber(a.tokenMetadata.balance).gt(b.tokenMetadata.balance)) {
          return -1;
        } else if (BigNumber(a.tokenMetadata.balance).lt(b.tokenMetadata.balance)) {
          return 1;
        } else {
          return 0;
        }
      } else if (orderBy.id === 'name') {
        if (a.displayName.toLowerCase() > b.displayName.toLowerCase()) {
          return getOrderBy(1);
        } else if (a.displayName.toLowerCase() < b.displayName.toLowerCase()) {
          return getOrderBy(-1);
        }
      } else if (orderBy.id === 'balance') {
        let availableA = 0;
        let availableB = 0;
        a.tokenMetadata?.balance ? (availableA = a.tokenMetadata?.balance) : (availableA = 0);
        b.tokenMetadata?.balance ? (availableB = b.tokenMetadata?.balance) : (availableB = 0);
        if (BigNumber(availableA).gt(BigNumber(availableB))) {
          return getOrderBy(-1);
        } else if (BigNumber(availableA).lt(BigNumber(availableB))) {
          return getOrderBy(1);
        }
      } else if (orderBy.id === 'supplyAPY') {
        let supplyA = a.supplyAPY;
        let supplyB = b.supplyAPY;
        if (BigNumber(supplyA).gt(BigNumber(supplyB))) {
          return getOrderBy(-1);
        } else if (BigNumber(supplyA).lt(BigNumber(supplyB))) {
          return getOrderBy(1);
        }
      } else if (orderBy.id === 'borrowAPY') {
        let borrowA = a.borrowAPY;
        let borrowB = b.borrowAPY;
        if (BigNumber(borrowA).gt(BigNumber(borrowB))) {
          return getOrderBy(-1);
        } else if (BigNumber(borrowA).lt(BigNumber(borrowB))) {
          return getOrderBy(1);
        }
      } else if (orderBy.id === 'liquidity') {
        let liquidityA = a.liquidity;
        let liquidityB = b.liquidity;
        if (BigNumber(liquidityA).gt(BigNumber(liquidityB))) {
          return getOrderBy(-1);
        } else if (BigNumber(liquidityA).lt(BigNumber(liquidityB))) {
          return getOrderBy(1);
        }
      }
    });

  const lendingUpdated = () => {
    setLendingAssets(stores.lendStore.getStore('lendingAssets'));
    setLendingSupply(stores.lendStore.getStore('lendingSupply'));
    setLendingBorrow(stores.lendStore.getStore('lendingBorrow'));
    setLendingSupplyAPY(stores.lendStore.getStore('lendingSupplyAPY'));
    setLendingBorrowAPY(stores.lendStore.getStore('lendingBorrowAPY'));
    setLendingBorrowLimit(stores.lendStore.getStore('lendingBorrowLimit'));
    forceUpdate();
  };

  useEffect(function () {
    stores.emitter.on(LEND_UPDATED, lendingUpdated);

    return () => {
      stores.emitter.removeListener(LEND_UPDATED, lendingUpdated);
    };
  }, []);

  const filterSupplied = (a) => {
    return BigNumber(a.supplyBalance).gt(0);
  };

  const filterBorrowed = (a) => {
    return BigNumber(a.borrowBalance).gt(0);
  };

  const sortSupply = (a, b) => {
    if (BigNumber(a.supplyBalance).gt(b.supplyBalance)) {
      return -1;
    } else if (BigNumber(a.supplyBalance).lt(b.supplyBalance)) {
      return 1;
    } else if (BigNumber(a.tokenMetadata.balance).gt(b.tokenMetadata.balance)) {
      return -1;
    } else if (BigNumber(a.tokenMetadata.balance).lt(b.tokenMetadata.balance)) {
      return 1;
    } else {
      return 0;
    }
  };

  const sortBorrow = (a, b) => {
    if (BigNumber(a.borrowBalance).gt(b.borrowBalance)) {
      return -1;
    } else if (BigNumber(a.borrowBalance).lt(b.borrowBalance)) {
      return 1;
    } else if (BigNumber(a.tokenMetadata.balance).gt(b.tokenMetadata.balance)) {
      return -1;
    } else if (BigNumber(a.tokenMetadata.balance).lt(b.tokenMetadata.balance)) {
      return 1;
    } else {
      return 0;
    }
  };

  const renderSupplyHeaders = () => {
    return (
      <div className={classes.lendingRow}>
        <div className={classes.lendTitleCell}>
          <Typography variant="h5">Supplied Assets</Typography>
        </div>
        <div className={classes.lendValueCell}>
          <Typography variant="h5">Supplied</Typography>
        </div>
        <div className={classes.lendBalanceCell}>
          <Typography variant="h5">Balance</Typography>
        </div>
        <div className={classes.lendValueCell}>
          <Typography variant="h5">APY</Typography>
        </div>
        <div className={classes.lendValueCell}>
          <Typography variant="h5">LTV</Typography>
        </div>
        <div className={classes.lendValueCell}>
          <Typography variant="h5">Liquidity</Typography>
        </div>
      </div>
    );
  };

  const renderBorrowHeaders = () => {
    return (
      <div className={classes.lendingRow}>
        <div className={classes.lendTitleCell}>
          <Typography variant="h5">Borrowed Assets</Typography>
        </div>
        <div className={classes.lendValueCell}>
          <Typography variant="h5">Borrowed</Typography>
        </div>
        <div className={classes.lendBalanceCell}>
          <Typography variant="h5">Balance</Typography>
        </div>
        <div className={classes.lendValueCell}>
          <Typography variant="h5">APY</Typography>
        </div>
        <div className={classes.lendValueCell}>
          <Typography variant="h5">LTV</Typography>
        </div>
        <div className={classes.lendValueCell}>
          <Typography variant="h5">Liquidity</Typography>
        </div>
      </div>
    );
  };

  const handleRequestSort = (event, property) => {
    const isAsc = order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const renderAllHeaders = (props) => {
    const { order, orderBy, onRequestSort } = props;

    let headers = [
      {
        label: 'All Assets',
        id: 'name',
      },
      {
        label: 'Balance',
        id: 'balance',
        numeric: true,
      },
      {
        label: 'Borrow APY',
        numeric: true,
        id: 'borrowAPY',
      },
      {
        label: 'Supply APY',
        numeric: true,
        id: 'supplyAPY',
      },
      {
        label: 'LTV',
        numeric: true,
        id: 'collateralPercent',
      },
      {
        label: 'Liquidity',
        numeric: true,
        id: 'liquidity',
      },
    ];
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
    return (
      <TableHead className={classes.tablehead}>
        <TableRow>
          {headers.map(headCell => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={createSortHandler(headCell)}>
                <Typography variant="h5" className={classes.fontWeightBold}>
                  {headCell.label}
                </Typography>
                {orderBy === headCell.id ? <span className={classes.visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span> : null}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell />
        </TableRow>
      </TableHead>
    );
  };

  const supplyAssets = lendingAssets ? lendingAssets.filter(filterSupplied).sort(sortSupply) : [];
  const borrowAssets = lendingAssets ? lendingAssets.filter(filterBorrowed).sort(sortBorrow) : [];

  return (
    <Layout changeTheme={changeTheme}>
      <div className={classes.ffContainer}>
        <Overview />

        {supplyAssets.length > 0 && (
          <div className={ classes.firstContainer }>
            <Paper elevation={0} className={classes.lendingTable}>
              {renderSupplyHeaders()}
              {supplyAssets.map((asset) => {
                return (
                  <LendSupplyAssetRow
                    key={asset.address}
                    lendingAsset={asset}
                    lendingBorrow={lendingBorrow}
                    lendingBorrowLimit={lendingBorrowLimit}
                  />
                );
              })}
            </Paper>
          </div>
        )}
        {borrowAssets.length > 0 && (
          <div className={ supplyAssets.length === 0 ? classes.firstContainer : classes.container }>
            <Paper elevation={0} className={classes.lendingTable}>
              {renderBorrowHeaders()}
              {borrowAssets.map((asset) => {
                return (
                  <LendBorrowAssetRow
                    key={asset.address}
                    lendingAsset={asset}
                    lendingBorrow={lendingBorrow}
                    lendingBorrowLimit={lendingBorrowLimit}
                  />
                );
              })}
            </Paper>
          </div>
        )}
        <div className={ (supplyAssets.length === 0 && borrowAssets.length === 0) ? classes.firstContainer : classes.container }>
          <Paper className={classes.lendingFilters}>
            <TextField
              className={classes.searchContainer}
              variant="outlined"
              fullWidth
              placeholder="Yearn 3CRV, DefiDollar, ..."
              value={search}
              onChange={onSearchChanged}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Paper>
          <Paper elevation={0} className={classes.lendingTable}>
            <TableContainer>
              <Table className={classes.investTable} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
                {renderAllHeaders({
                  order: order,
                  orderBy: orderBy,
                  onRequestSort: handleRequestSort,
                })}
                <TableBody>
                  {filteredLendingAssets &&
                    filteredLendingAssets.map((asset) => {
                      return (
                        <LendAllAssetRow
                          key={asset.address}
                          lendingAsset={asset}
                          lendingBorrow={lendingBorrow}
                          lendingBorrowLimit={lendingBorrowLimit}
                        />
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>
    </Layout>
  );
}

export default Lend;
