import React, { useState, useEffect } from 'react';
import BigNumber from 'bignumber.js';
import classes from './ffVest.module.css';
import stores from '../../stores'
import { FIXED_FOREX_UPDATED } from '../../stores/constants';
import moment from 'moment';

import Lock from './lock'
import ExistingLock from './existingLock'
import NoBalances from './noBalances'
import Unlock from './unlock'
import Loading from './loading'

export default function ffVest() {

  const [ ibff, setIBFF] = useState(null)
  const [ veIBFF, setVeIBFF] = useState(null)

  useEffect(() => {
    const forexUpdated = () => {
      setIBFF(stores.fixedForexStore.getStore('ibff'))
      setVeIBFF(stores.fixedForexStore.getStore('veIBFF'))
    }

    setIBFF(stores.fixedForexStore.getStore('ibff'))
    setVeIBFF(stores.fixedForexStore.getStore('veIBFF'))

    stores.emitter.on(FIXED_FOREX_UPDATED, forexUpdated);
    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, forexUpdated);
    };
  }, []);

  return (
    <>
      {
       !ibff && !veIBFF &&
       <Loading />
     }
      { ibff && veIBFF && BigNumber(ibff.balance).eq(0) && BigNumber(veIBFF.balance).eq(0) && BigNumber(veIBFF.vestingInfo.lockEnds).eq(0) &&  // no ibff or veibff
        <NoBalances ibff={ibff} veIBFF={veIBFF} />
      }
      { ibff && veIBFF && BigNumber(ibff.balance).gt(0) && BigNumber(veIBFF.balance).eq(0) &&   // has ibff, nothing locked
        <Lock ibff={ibff} veIBFF={veIBFF} />
      }
      { veIBFF && BigNumber(veIBFF.balance).gt(0) &&   // lock still valid
        <ExistingLock ibff={ibff} veIBFF={veIBFF} expired={ false } />
      }
      { veIBFF && veIBFF.vestingInfo && BigNumber(veIBFF.vestingInfo.lockEnds).lte(moment().unix()) && BigNumber(veIBFF.vestingInfo.lockEnds).gt(0) && // Lock expired
        <Unlock />
      }
    </>
  );
}
