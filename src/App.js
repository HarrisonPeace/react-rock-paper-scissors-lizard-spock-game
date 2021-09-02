import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useCookies } from "react-cookie";

//component imports
import Layout from "./components/Layout";
import Header from "./components/Header";
import GameBoard from "./components/GameBoard";
import NotFound from "./components/error/NotFound";
import ErrorBoundary from "./components/error/ErrorBoundary";
import Error from "./components/error/Error";

function App() {
  //create date object for cookie expiry {1 day from now}
  let cookieExpiry = new Date();
  cookieExpiry.setDate(cookieExpiry.getDate() + 1);

  //create authenticated user cookie
  const [cookies, setCookie] = useCookies(["score"]);
  console.log(cookies.score)

  return (
    <Router>
      <ErrorBoundary>
        <Layout>
          <Header score={cookies.score} />
          <Switch>
            <Route exact path="/">
              <GameBoard setScore={setCookie} score={parseInt(cookies.score)} />
            </Route>
            <Route path="/error">
              <Error />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Layout>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
