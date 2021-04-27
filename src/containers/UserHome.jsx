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
// import { getAllArticles, addArticle } from "../actions/API.js";
import Articles from "../views/ArticleViews/Articles.jsx";
import "bootstrap/dist/css/bootstrap.css";

export default function UserHome(props) {
  //handling rerouting here
  //once at home, we would have to save the userId from the cookie
  //to the state of the component
  const { getUserId, getAllArticles, addArticle, handleAllArticles } = props;
  //when the path changes, then pass the getUserId down

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
          <Articles
            getUserId={getUserId}
            getAllArticles={getAllArticles}
            addArticle={addArticle}
            handleAllArticles={handleAllArticles}
          />
        </Route>
      </Switch>
    </div>
  );
}
