import React, { useState, useEffect } from "react";
import BigNumber from "bignumber.js";
import classes from "./ffVest.module.css";
import stores from "../../stores";
import { FIXED_FOREX_UPDATED } from "../../stores/constants";
import moment from "moment";

import Lock from "./lock";
import ExistingLock from "./existingLock";
import NoBalances from "./noBalances";
import Unlock from "./unlock";
import Loading from "./loading";

export default function ffVest() {
  const [ibff, setIBFF] = useState(null);
  const [veIBFF, setVeIBFF] = useState(null);
  const [veIBFFOld, setVeIBFFOld] = useState(null);

  useEffect(() => {
    const forexUpdated = () => {
      setIBFF(stores.fixedForexStore.getStore("ibff"));
      setVeIBFF(stores.fixedForexStore.getStore("veIBFF"));
      setVeIBFFOld(stores.fixedForexStore.getStore("veIBFFOld"));
    };

    setIBFF(stores.fixedForexStore.getStore("ibff"));
    setVeIBFF(stores.fixedForexStore.getStore("veIBFF"));
    setVeIBFFOld(stores.fixedForexStore.getStore("veIBFFOld"));

    stores.emitter.on(FIXED_FOREX_UPDATED, forexUpdated);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, forexUpdated);
    };
  }, []);

  return (
    <>
      {!ibff && !veIBFF && <Loading />}
      {ibff && veIBFF && BigNumber(ibff.balance).eq(0) && BigNumber(veIBFF.balance).eq(0) && BigNumber(veIBFF.vestingInfo.lockEnds).eq(0) && (
        <NoBalances
          ibff={
            ibff // no ibff or veibff
          }
          veIBFF={veIBFF}
        />
      )}
      {ibff && veIBFF && BigNumber(ibff.balance).gt(0) && BigNumber(veIBFF.balance).eq(0) && (
        <Lock
          ibff={
            ibff // has ibff, nothing locked
          }
          veIBFF={veIBFF}
          veIBFFOld={veIBFFOld}
        />
      )}
      {veIBFF && BigNumber(veIBFF.balance).gt(0) && (
        <ExistingLock
          ibff={
            ibff // lock still valid
          }
          veIBFF={veIBFF}
          veIBFFOld={veIBFFOld}
          expired={false}
        />
      )}
      {
        veIBFF && veIBFF.vestingInfo && BigNumber(veIBFF.vestingInfo.lockEnds).lte(moment().unix()) && BigNumber(veIBFF.vestingInfo.lockEnds).gt(0) && (
          <Unlock />
        ) // Lock expired
      }
    </>
  );
}
