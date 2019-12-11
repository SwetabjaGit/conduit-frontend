import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = (props) => {

  const { component: Component, authenticated, ...rest } = props;
  const renderComponent = (props) => authenticated === true ? <Redirect to="/" /> : <Component {...props} />;

  return (
    <Route
      {...rest}
      component={renderComponent}
    />
  );

};

export default AuthRoute;

/* const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) => 
      authenticated === true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
); */
