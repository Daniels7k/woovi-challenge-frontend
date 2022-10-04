import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";

import { RelayEnvironmentProvider } from "react-relay/hooks";
import RelayEnv from "./services/RelayEnv"

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <RelayEnvironmentProvider environment={RelayEnv}>
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </RelayEnvironmentProvider>
      </Router>
    </div>
  );
}

export default App;
