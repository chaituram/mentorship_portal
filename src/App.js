import React from 'react';
import { Router, Route, Switch } from 'react-router';
import "./App.css";

import Dashboard from "./Containers/Dashboard/Dashboard";
import Portal from "./Containers/Portal/Portal";

function App() {
  return (
    <div className=" App ">
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/portal" exact component={Portal} />
      </Switch>
    </div>
  );
}

export default App;
