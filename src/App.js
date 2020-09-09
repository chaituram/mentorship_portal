import React from 'react';
import { Router, Route, Switch } from 'react-router';
import "./App.css";

import Dashboard from "./Containers/Dashboard/Dashboard";
import Portal from "./Containers/Portal/Portal";
import UserDetails from "./Containers/UserDetails/UserDetails";
import MentorshipDetails from './Containers/MentorshipDetails/MentorshipDetails';
import Task from "./Components/Tasks/Task/Task";

function App() {
  return (
    <div className=" App ">
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/portal/:id" exact component={Portal} />
        <Route path="/user-details/:id" exact component={UserDetails} />
        <Route path="/user-details/:id" component={MentorshipDetails} />
        <Route path="/task/:id" exact component={Task} />
      </Switch>
    </div>
  );
}

export default App;
