import React, { useState } from "react";
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Routes from "./containers/Routes.jsx";
import { BrowserRouter, Link, Redirect } from "react-router-dom";
import { signUp, logIn } from "./actions/API.js";
import "bootstrap/dist/css/bootstrap.css";

export default function App() {
  let [redirect, setRedirect] = useState(null); //switch between SignUp or Login
  //let the initial render checks for the cookie
  if (redirect) {
    return (
      <BrowserRouter>
        <Redirect to={redirect} />
        <Routes paths={{ signUp, logIn }} setRedirect={setRedirect} />
      </BrowserRouter>
    );
  }
  //if the initial render doesn't have token in the localstorage, then change
  //the current route to the main page for signUp/logIn
  return (
    <div className="App container py-3">
      <BrowserRouter>
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
        <Routes paths={{ signUp, logIn }} setRedirect={setRedirect} />
      </BrowserRouter>
    </div>
  );
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("app"));
};

renderApp();
