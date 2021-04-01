import React, { useRef, useState, useEffect } from "react";
import {
  useLocation,
  Switch,
  BrowserRouter,
  Redirect,
  Route,
} from "react-router-dom";
import { signUp, logIn } from "./actions/API.js";
import AppRoute from "./utils/AppRoute";
import Login from "./containers/Login.jsx";
import Signup from "./containers/Signup.jsx";
import ScrollReveal from "./utils/ScrollReveal";
import ReactGA from "react-ga";

// Layouts
import LayoutDefault from "./layouts/LayoutDefault";

// Views
import Home from "./views/Home";

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = (page) => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = () => {
  let [redirect, setRedirect] = useState(null);
  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add("is-loaded");
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      {redirect ? (
        <>
          <BrowserRouter>
            <Redirect to={redirect} />
            <Switch>
              <Route path="/login">
                <Login submitHandler={logIn} setRedirect={setRedirect} />
              </Route>
              <Route path="/signup">
                <Signup submitHandler={signUp} setRedirect={setRedirect} />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
            </Switch>
          </BrowserRouter>
        </>
      ) : (
        <>
          <ScrollReveal
            ref={childRef}
            children={() => (
              <Switch>
                <AppRoute
                  exact
                  path="/"
                  component={Home}
                  layout={LayoutDefault}
                />
                <AppRoute
                  exact
                  path="/login"
                  component={Login}
                  submitHandler={logIn}
                  setRedirect={setRedirect}
                />
                <AppRoute exact path="/home" component={Home} />
              </Switch>
            )}
          />
        </>
      )}
    </>
  );
};

export default App;
