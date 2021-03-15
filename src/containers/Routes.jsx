import React, { useState } from 'react';
import Login from './Login.jsx';
import { Route, Switch } from 'react-router-dom';
import Home from './Home.jsx';

export default function Routes(props) {
  const { setRedirect } = props;
  return (
    <Switch>
      <Route path='/login'>
        <Login setRedirect={setRedirect} />
      </Route>
      <Route path='/home'>
        <Home setRedirect={setRedirect} />
      </Route>
    </Switch>
  );
}
