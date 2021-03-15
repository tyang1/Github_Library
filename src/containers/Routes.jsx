import React, { useState } from 'react';
import Login from './Login.jsx';
import { Route, Switch } from 'react-router-dom';

export default function Routes() {
  return (
    <Switch>
      <Route path='/login'>
        <Login />
      </Route>
    </Switch>
  );
}
