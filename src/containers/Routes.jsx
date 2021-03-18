import React, { useState } from 'react';
import Login from './Login.jsx';
import { Route, Switch } from 'react-router-dom';
import Home from './Home.jsx';
import Articles from '../components/Articles.jsx';
import Subjects from '../components/Subjects.jsx';

export default function Routes(props) {
  const { setRedirect, paths, level } = props;
  console.log('Routes', props);
  return (
    <Switch>
      {level == 'root' ? (
        <Main paths={paths} setRedirect={setRedirect} />
      ) : null}
      <Route path='/home'>
        <Home />
      </Route>
      <Route path='/home#articles'>
        <Articles setRedirect={setRedirect} />
      </Route>
    </Switch>
  );
}

function Main(props) {
  const { setRedirect, paths } = props;
  return (
    <>
      <Route path='/login'>
        <Login submitHandler={paths.logIn} setRedirect={setRedirect} />
      </Route>
      <Route path='/signup'>
        <Login submitHandler={paths.signUp} setRedirect={setRedirect} />
      </Route>
      <Route path='/home'>
        <Home />
      </Route>
    </>
  );
}
