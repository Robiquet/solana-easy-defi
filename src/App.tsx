import React from "react";
import { StyleSheetManager } from "styled-components";
import "./App.css";
import FrontPage from "./components/FrontPage.js";

function App() {
  return (
    <StyleSheetManager disableVendorPrefixes>
      <div className="App">
        <header className="App-header">
          <FrontPage></FrontPage>
        </header>
      </div>
    </StyleSheetManager>
  );
}

export default App;
