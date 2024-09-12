import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import routes from "./routes";
import DashboardPage from "~/pages/dashboard";
import NewUserPage from "~/pages/new-user";
import * as React from "react";

const Router: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path={routes.dashboard} component={DashboardPage} />
        <Route exact path={routes.newUser} component={NewUserPage} />
        <Route
          exact
          path={routes.history}
          component={() => <div>History</div>}
        />

        <Route exact path="*">
          <Redirect to={routes.dashboard} />
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default Router;
