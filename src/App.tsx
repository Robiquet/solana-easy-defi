import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import "./App.css";
import LeftNav from "./components/LeftNav";
import Bots from "./pages/Bots";
import Dashboard from "./pages/Dashboard";
import FarmChart from "./pages/FarmChart";
import Farming from "./pages/Farming";
import Home from "./pages/Home.js";
import OnBoarding from "./pages/Onboarding";
import PoolChart from "./pages/PoolChart";
import Pooling from "./pages/Pooling";

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
            <Route exact path="/pooling" component={Pooling} />
            <Route path="/pooling/:id" component={PoolChart} />
            <Route exact path="/farming" component={Farming} />
            <Route path="/farming/:id" component={FarmChart} />
            <Route path="/bots">
              <Bots />
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
