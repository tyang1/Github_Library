import React, {
  createContext,
  useContext,
  FunctionComponent,
  useEffect,
  useState,
  Suspense,
  useMemo,
  useRef,
} from "react";
import {
  Link,
  Switch,
  Route,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
// import { getAllArticles, addArticle } from "../actions/API.js";
import Articles from "../views/ArticleViews/Articles.jsx";
import "bootstrap/dist/css/bootstrap.css";
import userStore from "../state/userStore.js";

export default function UserHome(props) {
  const { url, path } = useRouteMatch();
  console.log("url, path", url, path);
  // let location = useLocation();
  // const childRef = useRef();

  // useEffect(() => {
  //   // const page = location.pathname;
  //   document.body.classList.add("is-loaded");
  //   childRef.current.init();
  //   // trackPage(page);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [location]);

  //handling rerouting here
  //once at home, we would have to save the userId from the cookie
  //to the state of the component
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
      {/* <Switch> */}
      <Route path="/articles">
        <Articles
          getUserId={userStore.getUserId}
          getAllArticles={userStore.getAllArticles}
          addArticle={userStore.addArticle}
          handleAllArticles={userStore.handleAllArticles}
        />
      </Route>
      {/* </Switch> */}
    </div>
  );
}
