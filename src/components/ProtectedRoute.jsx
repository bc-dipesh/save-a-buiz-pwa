/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, authenticate, ...rest }) => {
  // get the user info from the redux store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const renderRoute = (props) => {
    if (authenticate(userInfo)) {
      return <Component {...props} />;
    }
    return (
      <Redirect
        to={{
          pathname: '/sign-in',
          state: {
            from: props.location,
          },
        }}
      />
    );
  };

  return <Route {...rest} render={renderRoute} />;
};

ProtectedRoute.propTypes = {
  authenticate: PropTypes.func,
  component: PropTypes.func,
  location: PropTypes.shape({}),
};
export default ProtectedRoute;
