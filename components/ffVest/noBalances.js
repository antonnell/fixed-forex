import { Paper, Typography } from '@material-ui/core';
import classes from './ffVest.module.css';

export default function noBalances({ ibff, veIBFF }) {

  return (

    <Paper elevation={0} className={ classes.container }>
      <div className={ classes.noBalancesContainer }>
        <div>
          <Typography className={ classes.title }>What is vesting ibff?</Typography>
          <Typography className={ classes.paragraph }>The ibff token is the emission token of the Fixed Forex ecosystem.</Typography>
          <Typography className={ classes.paragraph }>Vesting your ibff in the Fixed Forex gauge means that you will be locking up your assets in order to gain a voting right in how the protocol emits rewards.</Typography>
          <Typography className={ classes.paragraph }>You will also be eligible to receive your portion of the weekly protocol fees.</Typography>
        </div>
        <div>
          <Typography className={ classes.title }>How does vesting work?</Typography>
          <Typography className={ classes.paragraph }>Vesting your ibff in the Fixed Forex gauge requires you to specify 2 parameters:</Typography>
          <div className={ classes.paragraph }>
            <Typography className={ classes.subTitle }>Vesting Amount</Typography>
            <Typography>How many ibff tokens you will be locking up.</Typography>
          </div>
          <div className={ classes.paragraph }>
            <Typography className={ classes.subTitle }>Vesting Duration</Typography>
            <Typography>How long you will be locking the tokens up for. Anywhere from 1 week to 4 years.</Typography>
          </div>
          <div className={ classes.paragraph }>
            <Typography>The more tokens you lock and the longer you lock them for, the more rewards you will receive.</Typography>
            <Typography>Want to read more? Read the release article on Medium.</Typography>
          </div>
        </div>
        <div>
          <div>
            <Typography className={ classes.title }>How do I get ibff?</Typography>
            <Typography className={ classes.paragraph }>You can get ibff tokens by staking your Sushiswap LP tokens in the Faucet contract here.</Typography>
            <Typography className={ classes.paragraph }>You can swap your existing assets for ibff using Sushiswap.</Typography>
          </div>
        </div>
      </div>
    </Paper>
  );
}
