import Welcome from "./welcome";

import { useRouter } from "next/router";

function Route({ changeTheme, ...props }) {
  const router = useRouter();
  const activePath = router.asPath;
  if (activePath.includes("/")) {
    return <Welcome props={props} changeTheme={changeTheme} />;
  } else {
    return <Welcome props={props} changeTheme={changeTheme} />;
  }
}

export default Route;
