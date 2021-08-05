import { Dialog, Typography, Button } from '@material-ui/core';
import classes from "./ffWarning.module.css";

export default function ffWarning({ close }) {

  const navigateToMedium = () => {
    window.open('https://andrecronje.medium.com/fair-launches-decentralized-collaboration-and-fixed-forex-ab327a2e4fc4', '_blank')
  }

  return (
    <Dialog fullScreen open={ true } onClose={close} >
      <div className={ classes.dialogContainer }>
        <div className={classes.warningContainer}>
          <img src='/images/icon-warning.svg' className={ classes.warningIcon } />
          <Typography className={classes.title1}>
              Fixed Forex Disclaimer:
          </Typography>
          <Typography className={classes.title2}>
              Use at your own risk
          </Typography>
          <Typography className={classes.para1} align='center'>
              This project is unaudited and in ongoing development. You gain zero benefit from early participation, only risk.
          </Typography>
          <Typography className={classes.para2} align='center'>
              The initial token distribution will be a fraction of the emission, this serves only for testing purposes.
          </Typography>
          <Typography className={classes.para2} align='center'>
              Given the incredibly low initial distribution, do not buy these tokens, do not provide liquidity for these tokens, you will lose money.
          </Typography>
          <div className={ classes.buttonsContainer }>
            <Button
              fullWidth
              variant='contained'
              size='large'
              className={classes.primaryButton }
              onClick={close}>
              <Typography className={ classes.buttonTextPrimary }>I understand the risks involved, proceed to the app</Typography>
            </Button>
            <Button
              fullWidth
              variant='contained'
              size='large'
              className={ classes.secondaryButton }
              onClick={navigateToMedium}
              >
              <Typography  className={ classes.buttonTextSecondary }>Read more about it on the Medium article</Typography>
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
