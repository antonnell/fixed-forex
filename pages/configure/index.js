import { SvgIcon } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import classes from "./configure.module.css";

function YearnIcon(props) {
  const { color, className, width, height } = props;
  return (
    <SvgIcon
      viewBox="0 0 120 40"
      fill="none"
      width="120px"
      height="26px"
      className={classes.yearnLogo}
    >
    <g id="logo-light" transform="translate(-403.058 -247.08)">
      <g id="Group_12" data-name="Group 12" transform="translate(436.787 261.49)">
        <path id="Path_23" data-name="Path 23" d="M436.188,272.147V261.4h12.9v1.766H438.461v3.087h9.63v1.782h-9.63v4.116Z" transform="translate(-436.188 -261.231)"/>
        <path id="Path_24" data-name="Path 24" d="M460.23,272.319a13.158,13.158,0,0,1-4.446-.661,5.98,5.98,0,0,1-2.8-1.9,4.673,4.673,0,0,1-.96-2.952,4.782,4.782,0,0,1,.96-3,5.943,5.943,0,0,1,2.788-1.912,15.376,15.376,0,0,1,8.916,0,5.977,5.977,0,0,1,2.8,1.9,4.766,4.766,0,0,1,.96,3,4.7,4.7,0,0,1-.96,2.972,5.984,5.984,0,0,1-2.8,1.9A13.226,13.226,0,0,1,460.23,272.319Zm0-1.766a8.1,8.1,0,0,0,4.415-.975,3.14,3.14,0,0,0,1.482-2.787,3.177,3.177,0,0,0-1.482-2.811A8.061,8.061,0,0,0,460.23,263a7.961,7.961,0,0,0-4.4.991,3.191,3.191,0,0,0-1.482,2.818,3.121,3.121,0,0,0,1.482,2.78A8.1,8.1,0,0,0,460.23,270.552Z" transform="translate(-435.902 -261.234)"/>
        <path id="Path_25" data-name="Path 25" d="M472.576,272.147V261.4h9.366a4.78,4.78,0,0,1,3.179.921,3.452,3.452,0,0,1,.126,4.88c-.032.033-.063.065-.1.1a4.605,4.605,0,0,1-3.026.967l4.316,3.886h-3.01l-4.131-3.778h-4.454v3.778Zm8.985-9.047h-6.712v3.563h6.712q2.333,0,2.334-1.782t-2.334-1.781Z" transform="translate(-435.53 -261.232)"/>
        <path id="Path_26" data-name="Path 26" d="M490.618,272.147V261.4h12.9v1.674h-10.69V265.8h9.691v1.676h-9.691v3h10.813v1.674Z" transform="translate(-435.204 -261.231)"/>
        <path id="Path_27" data-name="Path 27" d="M509.092,272.147h-2.965l5.9-5.453-5.744-5.294h3.026l4.346,4.025,4.285-4.025h2.9l-5.774,5.294,5.9,5.453h-3.036L513.474,268Z" transform="translate(-434.924 -261.231)"/>
      </g>
      <g id="Group_5228" data-name="Group 5228">
        <g id="Group_11" data-name="Group 11" transform="translate(436.801 247.108)">
          <path id="Path_18" data-name="Path 18" d="M436.2,257.876V247.125h13.547v2.611H439.6v2.059h9.077v2.6H439.6v3.487Z" transform="translate(-436.202 -247.107)" fill="#114df0"/>
          <path id="Path_19" data-name="Path 19" d="M455.678,257.876V247.125h3.394v10.751Z" transform="translate(-435.85 -247.107)" fill="#114df0"/>
          <path id="Path_20" data-name="Path 20" d="M468.914,257.876h-4.378l5.652-5.438-5.514-5.314h4.5l3.36,3.348,3.241-3.348h4.3l-5.5,5.284,5.667,5.468H475.76l-3.487-3.487Z" transform="translate(-435.69 -247.107)" fill="#114df0"/>
          <path id="Path_21" data-name="Path 21" d="M485.473,257.876V247.125H499.02v2.412H488.779V251.2h9.163v2.4h-9.163v1.874h10.353v2.412Z" transform="translate(-435.311 -247.107)" fill="#114df0"/>
          <path id="Path_22" data-name="Path 22" d="M505.221,257.876V247.125h8.77a8.108,8.108,0,0,1,5.1,1.39,5.389,5.389,0,0,1,.366,7.612,5.178,5.178,0,0,1-.366.367,8.126,8.126,0,0,1-5.1,1.383Zm9.016-2.611a3.531,3.531,0,0,0,2.38-.676,2.617,2.617,0,0,0,.768-2.074,2.668,2.668,0,0,0-.768-2.1,3.516,3.516,0,0,0-2.38-.683h-5.622v5.529Z" transform="translate(-434.954 -247.108)" fill="#114df0"/>
        </g>
        <path id="Path_28" data-name="Path 28" d="M425.554,259.16l-7.146,8.219h-6.873l8.086-9.3h10.185a12.864,12.864,0,0,0-1.743-4.782h-6.147l-7.146,8.219H407.9l8.086-9.3h11.344a12.938,12.938,0,1,0,2.642,7.818c0-.3-.024-.584-.045-.876Z" transform="translate(-1)" fill="#114df0"/>
      </g>
    </g>
    </SvgIcon>
  );
}

function Configure({ theme }) {
  return (
    <div className={classes.configureContainer}>
      <YearnIcon
        color={
          (theme.palette.type === "dark"
          ? true
          : false)
            ? "white"
            : "rgb(33, 37, 41)"
        }
        altColor={
          (theme.palette.type === "dark"
          ? true
          : false)
            ? "rgb(33, 37, 41)"
            : "white"
        }
        width="123px"
        height="42.3px"
        className={classes.yearnLogo}
      />
      <div
        className={
          theme.palette.type === "light"
            ? classes["dot-pulse"]
            : classes["dot-pulse-dark"]
        }
      ></div>
    </div>
  );
}

export default withTheme(Configure);
