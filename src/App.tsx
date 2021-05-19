import React from "react";
import { StyleSheetManager } from "styled-components";
import "./App.css";
import Home from "./pages/Home.js";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <StyleSheetManager disableVendorPrefixes>
      <div className="App">
        <header className="App-header">
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

        </header>
      </div>
    </StyleSheetManager>
  );
}

export default App;
