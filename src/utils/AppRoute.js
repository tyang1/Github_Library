import React from "react";
import { Route } from "react-router-dom";

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => {
  Layout = Layout === undefined ? (props) => <>{props.children}</> : Layout;
  return (
    <Route
      // {...rest}
      render={(props) => {
        console.log("props in AppRoute", props);
        return (
          <Layout>
            <Component {...props} {...rest} />
          </Layout>
        );
      }}
    />
  );
};

export default AppRoute;
