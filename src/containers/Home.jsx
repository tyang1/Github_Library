import React, {
  createContext,
  useContext,
  FunctionComponent,
  useEffect,
  useState,
  Suspense,
  useMemo,
} from 'react';
import { BrowserRouter, Link, Redirect } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Routes from './Routes.jsx';
import 'bootstrap/dist/css/bootstrap.css';

// export const AppContext = createContext(null);
// export const ModuleUpdateContext = createContext(null);

export default function Home() {
  let [redirect, setRedirect] = useState(null);
  if (redirect) {
    return (
      <BrowserRouter>
        <Redirect to={redirect} />
        <Routes paths={null} setRedirect={setRedirect} />
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand href='#home'>Home</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#articles'>Articles</Nav.Link>
            <Nav.Link href='#subjects'>Subjects</Nav.Link>
          </Nav>
          {/* <Form inline>
          <FormControl type='text' placeholder='Search' className='mr-sm-2' />
          <Button variant='outline-success'>Search</Button>
        </Form> */}
        </Navbar.Collapse>
      </Navbar>
      {/* <Routes paths={null} setRedirect={setRedirect} /> */}
    </BrowserRouter>
  );
  //checking for the cookie to determine if
  // return <div>Welcome to Github Library Home!</div>;
}
