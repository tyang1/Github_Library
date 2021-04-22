import React, {
  createContext,
  useContext,
  FunctionComponent,
  useEffect,
  useState,
  Suspense,
  useMemo,
} from "react";
import { Link, Switch, Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { getAllArticles } from "../actions/API.js";
import Articles from "../views/ArticleViews/Articles.jsx";
import "bootstrap/dist/css/bootstrap.css";

export default function UserHome() {
  //handling rerouting here

  return (
    <div className="App container py-3">
      <Navbar expand="lg">
        <Navbar.Brand href="/home" style={{ color: "grey" }}>
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to={`/articles`}>Articles</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={`/subjects`}>Subjects</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path={`/articles`}>
          <Articles getAllArticles={getAllArticles} />
        </Route>
      </Switch>
    </div>
  );
}
