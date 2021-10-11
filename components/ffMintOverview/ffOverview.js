import React, { useState, useEffect } from 'react';
import { Paper, Grid, Typography, Button, TextField, InputAdornment, CircularProgress, Tooltip } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import BigNumber from 'bignumber.js';

import LendSupplyGraph from '../../components/lendSupplyGraph';
import LendBorrowGraph from '../../components/lendBorrowGraph';

import { formatCurrency } from '../../utils';
import classes from './ffOverview.module.css';

import stores from '../../stores'
import { LEND_UPDATED } from '../../stores/constants';

export default function ffOverview() {

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [lendingAssets, setLendingAssets] = useState(null);
  const [lendingSupply, setLendingSupply] = useState(null);
  const [lendingBorrow, setLendingBorrow] = useState(null);
  const [lendingBorrowLimit, setLendingBorrowLimit] = useState(null);
  const [lendingSupplyAPY, setLendingSupplyAPY] = useState(null);
  const [lendingBorrowAPY, setLendingBorrowAPY] = useState(null);
  const [position, setPosition] = useState([]);

  useEffect(function () {
    const lendingUpdated = () => {
      setLendingAssets(stores.lendStore.getStore('lendingAssets'));
      setLendingSupply(stores.lendStore.getStore('lendingSupply'));
      setLendingBorrow(stores.lendStore.getStore('lendingBorrow'));
      setLendingSupplyAPY(stores.lendStore.getStore('lendingSupplyAPY'));
      setLendingBorrowAPY(stores.lendStore.getStore('lendingBorrowAPY'));
      setLendingBorrowLimit(stores.lendStore.getStore('lendingBorrowLimit'));
      setPosition(stores.lendStore.getStore('position'))

      forceUpdate()
    };

    stores.emitter.on(LEND_UPDATED, lendingUpdated);

    lendingUpdated()

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

  const supplyAssets = lendingAssets ? lendingAssets.filter(filterSupplied).sort(sortSupply) : [];
  const borrowAssets = lendingAssets ? lendingAssets.filter(filterBorrowed).sort(sortBorrow) : [];

  const renderSupplyTootip = () => {
    return (
      <div className={classes.tooltipContainer}>
        {supplyAssets.map((asset) => {
          return (
            <div className={classes.tooltipValue}>
              <Typography className={classes.val}>{asset.tokenMetadata.symbol}</Typography>
              <Typography className={classes.valBold}>{formatCurrency(asset.supplyAPY)}%</Typography>
            </div>
          );
        })}
      </div>
    );
  };

  const renderBorrowTooltip = () => {
    return (
      <div className={classes.tooltipContainer}>
        {borrowAssets.map((asset) => {
          return (
            <div className={classes.tooltipValue}>
              <Typography className={classes.val}>{asset.tokenMetadata.symbol}</Typography>
              <Typography className={classes.valBold}>{formatCurrency(asset.borrowAPY)}%</Typography>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={ classes.container }>
      <div className={ classes.fieldsContainer }>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <div className={classes.overviewCard}>
              <LendSupplyGraph assets={supplyAssets} />
              <div>
                <Typography className={ classes.title }>Total Supplied</Typography>
                <Typography className={ classes.value }>
                  {lendingSupply === null ? (
                    <Skeleton style={{ minWidth: '200px ' }} />
                  ) : (
                    `$ ${formatCurrency(position && position.length >= 3 ? position[0] / 1000000 : 0)}`
                  )}
                </Typography>
                <Tooltip title={renderSupplyTootip()}>
                  <Typography className={ classes.subValue }>{!lendingSupplyAPY ? <Skeleton style={{ minWidth: '200px ' }} /> : `${formatCurrency(lendingSupplyAPY)} % Average APY`}</Typography>
                </Tooltip>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className={classes.overviewCard}>
              <Tooltip title="View transaction">
                <LendBorrowGraph assets={borrowAssets} />
              </Tooltip>
              <div>
                <Typography className={ classes.title }>Total Borrowed</Typography>
                <Typography className={ classes.value }>
                  {lendingBorrow === null ? (
                    <Skeleton style={{ minWidth: '200px ' }} />
                  ) : (
                    `$ ${formatCurrency(position && position.length >= 3 ? position[1] / 1000000 : 0)}`
                  )}
                </Typography>
                <Tooltip title={renderBorrowTooltip()}>
                  <Typography className={ classes.subValue }>{!lendingBorrowAPY ? <Skeleton style={{ minWidth: '200px ' }} /> : `${formatCurrency(lendingBorrowAPY)} % Average APY`}</Typography>
                </Tooltip>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className={classes.overviewCard}>
              <div>
                <Typography className={ classes.title }>Borrow Limit Used</Typography>
                <Typography className={ classes.value }>
                  {lendingBorrowLimit === null ? (
                    <Skeleton style={{ minWidth: '200px ' }} />
                  ) : (
                    `${formatCurrency(position && position.length >= 3 ? position[3] / 100 : 0)} %`
                  )}
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
