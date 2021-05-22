import React from "react";
import { StyleSheetManager } from "styled-components";
import "./App.css";
import Home from "./pages/Home.js";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <StyleSheetManager disableVendorPrefixes>
        <Router>

          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
          </Router>
    </StyleSheetManager>
  );
}

export default App;
