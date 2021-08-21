import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//component imports
import Header from "./components/Header";
import GameBoard from "./components/GameBoard";
import NotFound from "./components/error/NotFound";
import ErrorBoundary from "./components/error/ErrorBoundary";

function App() {

  return (
    <Router>
      <Header />
      <ErrorBoundary>
        <Switch>
          <Route exact path="/">
            <GameBoard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
