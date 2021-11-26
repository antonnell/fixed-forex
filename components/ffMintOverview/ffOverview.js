import React, { useState, useEffect } from 'react';
import { Paper, Grid, Typography, Button, TextField, InputAdornment, CircularProgress, Tooltip, SvgIcon } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import BigNumber from 'bignumber.js';

import LendSupplyGraph from '../../components/lendSupplyGraph';
import LendBorrowGraph from '../../components/lendBorrowGraph';

import { formatCurrency } from '../../utils';
import classes from './ffOverview.module.css';

import stores from '../../stores'
import { LEND_UPDATED } from '../../stores/constants';

function BorrowedIcon(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 48 48" stroke-width="1" className={className}>
    <g stroke-width="3" transform="translate(0.5, 0.5)"><path d="M37,30l4.365-2.5a3.054,3.054,0,0,1,4.157,1.119l.036.062a3.135,3.135,0,0,1-.7,4l-8.117,6.7a3.966,3.966,0,0,1-1.675.817l-15.4,3.422a4,4,0,0,1-3.086-.577L7.008,36.672A4,4,0,0,0,4.789,36H2V24l7.1-.789a7.99,7.99,0,0,1,3.692.461l5.465,2.049a7.936,7.936,0,0,0,1.528.406l10.224,1.659A3.223,3.223,0,0,1,33,31h0a3.223,3.223,0,0,1-2.992,3.214L19,35" fill="none" stroke="#FFFFFF" stroke-linecap="square" stroke-miterlimit="10" stroke-width="3" stroke-linejoin="miter"></path><circle cx="29" cy="12" r="9" fill="none" stroke="#FFFFFF" stroke-linecap="square" stroke-miterlimit="10" stroke-width="3" data-color="color-2" stroke-linejoin="miter"></circle><rect x="26.172" y="9.172" width="5.657" height="5.657" stroke-width="3" fill="none" stroke="#FFFFFF" stroke-linecap="square" stroke-miterlimit="10" transform="translate(0.009 24.021) rotate(-45)" data-color="color-2" stroke-linejoin="miter"></rect></g>
    </SvgIcon>
  );
}

function LimitIcon(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 48 48" stroke-width="1" className={className}>
    <g stroke-width="3" transform="translate(0.5, 0.5)"><polyline points="18 2 13 2 13 31 5 31 17 45 29 31 21 31 21 27" fill="none" stroke="#FFFFFF" stroke-linecap="square" stroke-miterlimit="10" stroke-width="3" stroke-linejoin="miter"></polyline><circle cx="28" cy="6" r="4" fill="none" stroke="#FFFFFF" stroke-linecap="square" stroke-miterlimit="10" stroke-width="3" data-color="color-2" stroke-linejoin="miter"></circle><circle cx="42" cy="20" r="4" fill="none" stroke="#FFFFFF" stroke-linecap="square" stroke-miterlimit="10" stroke-width="3" data-color="color-2" stroke-linejoin="miter"></circle><line x1="27" y1="23" x2="43" y2="3" fill="none" stroke="#FFFFFF" stroke-linecap="square" stroke-miterlimit="10" stroke-width="3" data-color="color-2" stroke-linejoin="miter"></line></g>
    </SvgIcon>
  );
}

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
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <div className={classes.overviewCard}>
              <LendSupplyGraph assets={supplyAssets} />
              <div>
                <Typography className={ classes.title }>Total Supplied</Typography>
                <Typography className={ classes.value }>
                  {lendingSupply === null ? (
                    <Skeleton style={{ minWidth: '200px', backgroundColor: 'rgba(0,0,0,0.1)' }} />
                  ) : (
                    `$${formatCurrency(position && position.length >= 3 ? position[0] / 1000000 : 0)}`
                  )}
                </Typography>
                <Tooltip title={renderSupplyTootip()}>
                  <Typography className={ classes.subValue }>{!lendingSupplyAPY ? <Skeleton style={{ minWidth: '200px', backgroundColor: 'rgba(0,0,0,0.1)' }} /> : `${formatCurrency(lendingSupplyAPY)} % Average APY`}</Typography>
                </Tooltip>
              </div>
            </div>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <div className={classes.overviewCard}>
              <Tooltip title="View transaction">
                <LendBorrowGraph assets={borrowAssets} />
              </Tooltip>
              <Grid container spacing={0} className={classes.valueItem}>
                <Grid item xs={12}>
                  <Typography className={ classes.title }>Total Borrowed</Typography>
                  <Typography className={ classes.value }>
                    {lendingBorrow === null ? (
                      <Skeleton style={{ minWidth: '200px', backgroundColor: 'rgba(0,0,0,0.1)' }} />
                    ) : (
                      `$ ${formatCurrency(position && position.length >= 3 ? position[1] / 1000000 : 0)}`
                    )}
                  </Typography>
                  <Tooltip title={renderBorrowTooltip()}>
                    <Typography className={ classes.subValue }>{!lendingBorrowAPY ? <Skeleton style={{ minWidth: '200px', backgroundColor: 'rgba(0,0,0,0.1)' }} /> : `${formatCurrency(lendingBorrowAPY)} % Average APY`}</Typography>
                  </Tooltip>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <div className={classes.overviewCard}>
            <Grid container spacing={0} className={classes.valueItem}>
              <Grid item md={3} sm={3} xs={3}>
                <div className={classes.iconWrap}>
                  <LimitIcon className={ classes.overviewIcon } />
                </div>
              </Grid>
              <Grid item md={9} sm={9} xs={9}>
                <Typography className={ classes.title }>Borrow Limit Used</Typography>
                <Typography className={ classes.value }>
                  {lendingBorrowLimit === null ? (
                    <Skeleton style={{ minWidth: '200px', backgroundColor: 'rgba(0,0,0,0.1)' }} />
                  ) : (
                    `${formatCurrency(position && position.length >= 3 ? position[3] / 100 : 0)} %`
                  )}
                </Typography>
                { BigNumber(position && position.length >= 3 ? position[3] / 100 : 0).lt(50) && <Typography className={ `${classes.subValue} ${classes.greenText}` }>Safe</Typography> }
                { BigNumber(position && position.length >= 3 ? position[3] / 100 : 0).gt(80) && <Typography className={ `${classes.subValue} ${classes.redText}` }>Dangerous</Typography> }
                { BigNumber(position && position.length >= 3 ? position[3] / 100 : 0).gte(50) && BigNumber(position && position.length >= 3 ? position[3] / 100 : 0).lte(80) && <Typography className={ `${classes.subValue} ${classes.orangeText}` }>Risky</Typography> }
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
