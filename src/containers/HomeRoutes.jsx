import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Articles from "../components/ArticleViews/Articles.jsx";
import Home from "../containers/Home.jsx";

export default function HomeRoutes(props) {
  const { articles, url } = props;

  return (
    <Switch>
      <Route path={`${url}/articles`}>
        <Articles articles={articles} />
      </Route>
    </Switch>
  );
}
