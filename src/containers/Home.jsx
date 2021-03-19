import React, {
  createContext,
  useContext,
  FunctionComponent,
  useEffect,
  useState,
  Suspense,
  useMemo,
} from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import HomeRoutes from "./HomeRoutes.jsx";
import mock from "../state/mock.js";
import "bootstrap/dist/css/bootstrap.css";

// export const AppContext = createContext(null);
// export const ModuleUpdateContext = createContext(null);

export default function Home() {
  let [redirect, setRedirect] = useState(null);
  const [articles, setArticles] = useState([]);
  let { path, url } = useRouteMatch();

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
      <HomeRoutes url={url} articles={articles} setRedirect={setRedirect} />
      {/* <Articles articles={articles} /> */}
    </div>
  );
}
