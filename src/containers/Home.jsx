import React, {
  createContext,
  useContext,
  FunctionComponent,
  useEffect,
  useState,
  Suspense,
  useMemo,
} from "react";
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import mock from "../state/mock.js";
import Articles from "../components/ArticleViews/Articles.jsx";

import "bootstrap/dist/css/bootstrap.css";

// export const AppContext = createContext(null);
// export const ModuleUpdateContext = createContext(null);

export default function Home() {
  const [articles, setArticles] = useState([]);
  let { url } = useRouteMatch();

  useEffect(() => {
    setArticles(mock.articles);
  }, [mock]);

  return (
    <div className="App container py-3">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/home">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to={`${url}/articles`}>Articles</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={`${url}/subjects`}>Subjects</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route path={`${url}/articles`}>
          <Articles articles={articles} />
        </Route>
      </Switch>
    </div>
  );
}
