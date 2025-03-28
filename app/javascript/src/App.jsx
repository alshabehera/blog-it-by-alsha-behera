import React from "react";

import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import New from "./components/Post/New";
import Show from "./components/Post/Show";
import Signup from "./components/Authentication/Signup";
import { getFromLocalStorage } from "./utils/storage";
import { Login } from "./components/Authentication";
import PrivateRoute from "./components/commons/PrivateRoute";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);
  return (
    <Router>
      <Switch>
      <Route exact path="/blog/:slug" component={Show} />
        <Route exact path="/blog" component={New} />
        {/* <Route exact path="/" component={Dashboard} /> */}
        <Route exact path="/signup" component={Signup} />
        <Route exact component={Login} path="/login" />
        <PrivateRoute
          component={Dashboard}
          condition={isLoggedIn}
          path="/"
          redirectRoute="/login"
        />
      </Switch>
    </Router>
  );
};

export default App;