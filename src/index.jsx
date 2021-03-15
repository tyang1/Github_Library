import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Routes from './containers/Routes.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Link } from 'react-router-dom';
// import Login from './containers/Login.jsx';

export default function App() {
  return (
    <div className='App container py-3'>
      <BrowserRouter>
        <Navbar collapseOnSelect bg='light' expand='md' className='mb-3'>
          <Navbar.Brand href='/' className='font-weight-bold text-muted'>
            Github Library
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-end'>
            <Nav>
              <Nav.Link>
                <Link to='/signup'>Signup</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to='/login'>Login</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('app'));
};

renderApp();
