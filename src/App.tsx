import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import "./App.css";
import LeftNav from "./components/LeftNav";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home.js";
import OnBoarding from "./pages/Onboarding";
import Staking from "./pages/Staking";

function App() {
  return (
    <StyleSheetManager disableVendorPrefixes>
      <Router>
        <main className="flex">
          <LeftNav></LeftNav>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/staking">
              <Staking />
            </Route>
            <Route path="/onboarding">
              <OnBoarding />
            </Route>
          </Switch>
        </main>
      </Router>
    </StyleSheetManager>
  );
}

export default App;
