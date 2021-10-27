import Home from "./welcome";

import { useRouter } from "next/router";

function Route({ changeTheme, ...props }) {
  const router = useRouter();
  const activePath = router.asPath;
  if (activePath.includes("/")) {
    return <Home props={props} changeTheme={changeTheme} />;
  } else {
    return <Home props={props} changeTheme={changeTheme} />;
  }
}

export default Route;
