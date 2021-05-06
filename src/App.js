import React, { useRef, useState, useEffect } from "react";
import {
  useLocation,
  Switch,
  BrowserRouter,
  Redirect,
  Route,
} from "react-router-dom";
// import { signUp, logIn } from "./actions/API.js";
import AppRoute from "./utils/AppRoute";
import Login from "./containers/Login.jsx";
import Signup from "./containers/Signup.jsx";
import ScrollReveal from "./utils/ScrollReveal";
import ReactGA from "react-ga";

// Layouts
import LayoutDefault from "./layouts/LayoutDefault";

// Views
import Home from "./views/Home";
import UserHome from "./containers/UserHome.jsx";
import { QueryClient, QueryClientProvider } from "react-query";

//Initialize user state
import userStore from "./state/userStore.js";
// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = (page) => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};
const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      {redirect ? (
        <>
          <BrowserRouter>
            <Redirect to={redirect} />
            <Switch>
              <Route exact path="/signup">
                <Signup
                  submitHandler={userStore.signUp}
                  setRedirect={setRedirect}
                />
              </Route>
              <Route exact path="/login">
                <Login
                  submitHandler={userStore.logIn}
                  setRedirect={setRedirect}
                />
              </Route>
              <Route exact path="/home">
                <UserHome
                // getUserId={userStore.getUserId}
                // handleAllArticles={userStore.handleAllArticles}
                // addArticle={userStore.addArticle}
                // getAllArticles={userStore.getAllArticles}
                />
              </Route>
              {/* <Route path="/articles">
                <UserHome
                // getUserId={userStore.getUserId}
                // handleAllArticles={userStore.handleAllArticles}
                // addArticle={userStore.addArticle}
                // getAllArticles={userStore.getAllArticles}
                />
              </Route> */}
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
                  submitHandler={userStore.logIn}
                  setRedirect={setRedirect}
                />
                <AppRoute
                  exact
                  path="/signup"
                  component={Signup}
                  submitHandler={userStore.signUp}
                  setRedirect={setRedirect}
                />
                {/* <AppRoute
                  exact
                  path="/articles"
                  component={UserHome}
                  // getUserId={userStore.getUserId}
                  // getAllArticles={userStore.getAllArticles}
                  // addArticle={userStore.addArticle}
                  // handleAllArticles={userStore.handleAllArticles}
                  setRedirect={setRedirect}
                /> */}
                <AppRoute
                  exact
                  path="/home"
                  component={UserHome}
                  // getUserId={userStore.getUserId}
                  // handleAllArticles={userStore.handleAllArticles}
                  // getAllArticles={userStore.getAllArticles}
                  // addArticle={userStore.addArticle}
                />
              </Switch>
            )}
          />
        </>
      )}
    </QueryClientProvider>
  );
};

export default App;
