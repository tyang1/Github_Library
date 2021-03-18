import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Articles from '../components/Articles.jsx';

export default function HomeRoutes(props) {
  const { setRedirect } = props;
  return (
    <Switch>
      <Route path='/home#articles'>
        <Articles setRedirect={setRedirect} />
      </Route>
    </Switch>
  );
}
