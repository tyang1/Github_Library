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
import { getAllArticles } from "../actions/API.js";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import Articles from "../views/ArticleViews/Articles.jsx";
import "bootstrap/dist/css/bootstrap.css";

const queryClient = new QueryClient();

function useArticles() {
  return useQuery("fetchArticles", () => {
    return getAllArticles().then((articles) => articles);
  });
}

export default function UserHome() {
  const [articles, setArticles] = useState([]);
  let { url } = useRouteMatch();

  // const { isLoading, error, data } = useQuery("fetchArticles", () => {
  //   getAllArticles().then((response) => response);
  // });

  // useEffect(() => {
  //   setArticles(mock.articles);
  // }, [mock]);

  return (
    <div className="App container py-3">
      <QueryClientProvider client={queryClient}>
        <Navbar expand="lg">
          <Navbar.Brand href="/home" style={{ color: "grey" }}>
            Home
          </Navbar.Brand>
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
            <Articles
              useArticles={useArticles}
              articles={articles}
              setArticles={setArticles}
            />
          </Route>
        </Switch>
      </QueryClientProvider>
    </div>
  );
}
