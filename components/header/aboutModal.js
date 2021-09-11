import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import classes from './header.module.css';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(4),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(2),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const ProPrimer = () => {
  return (
    <>
      <Typography className={classes.abouttext} gutterBottom>
        Fixed Forex is designed to be an immutable, 0 fee, 0 governance, decentralized stable coin framework.
      </Typography>
      <Typography className={classes.abouttext} gutterBottom>
        We keep talking about disrupting exchange control, we keep talking about disrupting fiat, in their own way, Tether and Circle did more for disrupting exchange control, than crypto did, exchange control tends to have a simple rule, money can’t leave its territory without special permission. Both Tether and Circle take deposits locally, the fiat never leaves the bank account, thus no exchange control (in theory, in practice and regulation its a very different story). So let’s consider you want to make a payment from the US to Korea, from USD to KRW, a “simple” path, would be deposit USD for USDT, transfer USDT to Upbit, swap USDT for KRW, withdraw KRW.
      </Typography>
    </>
  );
};

const LinksPrimer = () => {
  return (
    <>
      <Typography className={classes.abouttext} gutterBottom>
        If you would like to read more on the Fixed Forex, you can read Andre Cronje's <a href='https://andrecronje.medium.com/fair-launches-decentralized-collaboration-and-fixed-forex-ab327a2e4fc4' target='_blank'>Launch Medium Article</a>
      </Typography>
      <Typography className={classes.abouttext} gutterBottom>
        If you would like to get more involved, head over to the <a href="https://gov.yearn.finance/c/projects/fixed-forex/26" target="_blank">Yearn Forum</a> to discuss Fixed Forex.
      </Typography>
      <Typography className={classes.abouttext} gutterBottom>
        If you would like to contribute to this UI, head over to the <a href="https://github.com/antonnell/fixed-forex" target="_blank">Github Repository</a>.
      </Typography>
    </>
  );
};

const ContractsPrimer = () => {
  return (
    <>
      <Typography className={classes.abouttext} gutterBottom>
        <a href="https://etherscan.io/address/0x96E61422b6A9bA0e068B6c5ADd4fFaBC6a4aae27#code" target="_blank">0x96E61422b6A9bA0e068B6c5ADd4fFaBC6a4aae27</a> - ibEUR
      </Typography>
      <Typography className={classes.abouttext} gutterBottom>
        <a href="https://etherscan.io/address/0xa2d81bedf22201a77044cdf3ab4d9dc1ffbc391b#code" target="_blank">0xa2d81bedf22201a77044cdf3ab4d9dc1ffbc391b</a> - ibEUR / ETH SUSHISWAP LP
      </Typography>
      <Typography className={classes.abouttext} gutterBottom>
        <a href="https://etherscan.io/address/0xb347132eFf18a3f63426f4988ef626d2CbE274F5#code" target="_blank">0xb347132eFf18a3f63426f4988ef626d2CbE274F5</a> - ibff
      </Typography>
      <Typography className={classes.abouttext} gutterBottom>
        <a href="https://etherscan.io/address/0x4d0518c9136025903751209ddddf6c67067357b1#code" target="_blank">0x4d0518c9136025903751209ddddf6c67067357b1</a> - veIBFF
      </Typography>
      <Typography className={classes.abouttext} gutterBottom>
        <a href="https://etherscan.io/address/0x7d254d9adc588126edaee52a1029278180a802e8#code" target="_blank">0x7d254d9adc588126edaee52a1029278180a802e8</a> - Fixed Forex Faucet for "ibEUR / ETH SUSHISWAP LP"
      </Typography>
      <Typography className={classes.abouttext} gutterBottom>
        <a href="https://etherscan.io/address/0x83893c4a42f8654c2dd4ff7b4a7cd0e33ae8c859#code" target="_blank">0x83893c4a42f8654c2dd4ff7b4a7cd0e33ae8c859</a> - Fixed Forex distribution contract
      </Typography>
      <Typography className={classes.abouttext} gutterBottom>
        <a href="https://etherscan.io/address/0x1ceb5cb57c4d4e2b2433641b95dd330a33185a44#code#code" target="_blank">0x1cEB5cB57C4D4E2b2433641b95Dd330A33185A44</a> - KP3R
      </Typography>
      <Typography className={classes.abouttext} gutterBottom>
        <a href="https://etherscan.io/address/0x2fc52c61fb0c03489649311989ce2689d93dc1a2#code" target="_blank">0x2FC52C61fB0C03489649311989CE2689D93dC1a2</a> - vKP3R
      </Typography>
    </>
  );
};
export default function AboutModal(props) {
  const { setToggleAboutModal } = props;
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    setToggleAboutModal(false);
  };

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          What is Fixed Forex?
        </DialogTitle>
        <DialogContent dividers>
          <ProPrimer />
        </DialogContent>
        <DialogContent dividers>
          <ContractsPrimer />
        </DialogContent>
        <DialogContent dividers>
          <LinksPrimer />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
