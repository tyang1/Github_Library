import { BrowserRouter, Link, Redirect, Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import { signUp, logIn } from "./actions/API.js";
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Login from "./containers/Login.jsx";
import Home from "./containers/Home.jsx";
import "bootstrap/dist/css/bootstrap.css";

export default function App() {
  let [redirect, setRedirect] = useState(null); //switch between SignUp or Login
  //let the initial render checks for the cookie
  //if the initial render doesn't have token in the localstorage, then change
  //the current route to the main page for signUp/logIn

  return (
    <div className="App container py-3">
      <BrowserRouter>
        {redirect ? (
          <>
            <Redirect to={redirect} />
            <Switch>
              <Route path="/login">
                <Login submitHandler={logIn} setRedirect={setRedirect} />
              </Route>
              <Route path="/signup">
                <Login submitHandler={signUp} setRedirect={setRedirect} />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
            </Switch>
          </>
        ) : (
          <>
            <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
              <Navbar.Brand href="/" className="font-weight-bold text-muted">
                Github Library
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Nav>
                  <Nav.Link>
                    <Link to="/signup">Signup</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/login">Login</Link>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Switch>
              <Route path="/login">
                <Login submitHandler={logIn} setRedirect={setRedirect} />
              </Route>
              <Route path="/signup">
                <Login submitHandler={signUp} setRedirect={setRedirect} />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
            </Switch>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("app"));
};

renderApp();
