import React, { useState } from 'react';
import Login from './Login.jsx';
import { Route, Switch } from 'react-router-dom';
import Home from './Home.jsx';

export default function Routes(props) {
  const { setRedirect, paths } = props;

  return (
    <Switch>
      <Route path='/login'>
        <Login submitHandler={paths.logIn} setRedirect={setRedirect} />
      </Route>
      <Route path='/signup'>
        <Login submitHandler={paths.signUp} setRedirect={setRedirect} />
      </Route>
      <Route path='/home'>
        <Home setRedirect={setRedirect} />
      </Route>
    </Switch>
  );
}
