import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import * as React from "react";

import routes from "./routes";
import DashboardPage from "~/modules/dashboard/views/main";
import NewUserPage from "~/modules/new-user/views/main";

const Router: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path={routes.dashboard} component={DashboardPage} />
        <Route exact path={routes.newUser} component={NewUserPage} />

        <Route exact path="*">
          <Redirect to={routes.dashboard} />
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default Router;
