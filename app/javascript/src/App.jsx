import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import New from "./components/Post/New";
import Show from "./components/Post/Show";

const App = () => {
  return (
    <Router>
      <Switch>
      <Route exact path="/blog/:slug" component={Show} />
        <Route exact path="/blog" component={New} />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/about" render={() => <div>About</div>} />
      </Switch>
    </Router>
  );
};

export default App;