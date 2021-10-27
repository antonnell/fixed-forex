import Head from "next/head";
import classes from "./layoutWelcome.module.css";
import Header from "../welcomeHeader";
import Navigation from "../navigation";
import SnackbarController from "../snackbar";

export default function Layout({
  children,
  configure,
  backClicked,
  changeTheme,
  title
}) {
  return (
    <div className={classes.container}>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <link
          rel="preload"
          href="/fonts/Inter/Inter-Light.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Inter/Inter-Regular.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Inter/Inter-Bold.ttf"
          as="font"
          crossOrigin=""
        />
        <meta name="description" content="Fixed Forex is designed to be an immutable, 0 fee, 0 governance, decentralized stable coin framework." />
        <meta name="og:title" content="Fixed Forex" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className={classes.content}>
        {!configure && (
          <Header backClicked={backClicked} changeTheme={changeTheme} title={ title } />
        )}
        <SnackbarController />
        <main>{children}</main>
      </div>
    </div>
  );
}
