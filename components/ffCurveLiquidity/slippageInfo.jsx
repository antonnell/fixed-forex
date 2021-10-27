import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Alert } from '@material-ui/lab'
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  alert: {
    marginTop: '5px',
  },
  infoAlert: {
    backgroundColor: 'Orange',
    color: '#000',
  },
});

const SlippageInfo = ({ slippagePcent, classes }) => {
  if (typeof slippagePcent === 'undefined') return null;

  const isPlusPricing = slippagePcent >= 0
  const isNegPricing = slippagePcent < 0
  const isHighNegPricing = slippagePcent < -0.5
  const isVeryHighSlippage = slippagePcent < -10 || slippagePcent > 10

  const formattedSlippagePcent = `${isPlusPricing ? '+' : ''}${slippagePcent.toFixed(2)}%`;

  return (
    <Alert
      icon={false}
      color={isPlusPricing ? 'success' : isHighNegPricing ? 'error' : '#000'}
      variant={isHighNegPricing ? 'filled' : 'standard'}
      className={`${classes.alert} ${(!isPlusPricing && !isHighNegPricing) ? classes.infoAlert : ''}`}
    >
      {isPlusPricing &&
        'Bonus'}
      {isNegPricing && !isHighNegPricing &&
        'Slippage'}
      {isNegPricing && isHighNegPricing &&
        'Warning! High slippage'}

      {' '}(incl. pricing): <strong>{formattedSlippagePcent}</strong>

      {isVeryHighSlippage &&
        <Fragment><br />(Calculated assuming a value of 1 for all assets)</Fragment>}
    </Alert>
  )
}

SlippageInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  slippagePcent: PropTypes.number,
}

SlippageInfo.defaultProps = {
  slippagePcent: undefined,
}

export default withStyles(styles)(SlippageInfo);
