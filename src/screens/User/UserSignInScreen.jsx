/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from '@hookform/resolvers/yup';
import { Button as SnackbarButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import {
  closeSnackbar as closeSnackbarAction,
  enqueueSnackbar as enqueueSnackbarAction,
} from '../../actions/snackbarActions';
import { login } from '../../actions/userActions';
import FormContainer from '../../components/FormContainer';
import { checkIsInternetConnected, isUserLoggedIn } from '../../utils/commonFunctions';

const userLoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const UserSignInScreen = ({ location, history }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userLoginSchema),
  });

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();

  const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
  const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

  const displaySnackbar = (message, variant = 'success') => {
    enqueueSnackbar({
      message,
      options: {
        key: uuidv4(),
        variant,
        action: (key) => (
          <SnackbarButton className="snackbar-btn" onClick={() => closeSnackbar(key)}>
            dismiss
          </SnackbarButton>
        ),
      },
    });
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (isUserLoggedIn(userInfo)) {
      displaySnackbar('You have successfully signed in to the app.');
      history.push(redirect);
    }
    if (error) {
      displaySnackbar(error, 'error');
    }
  }, [history, userInfo, redirect, error]);

  const submitUserLoginForm = async (data) => {
    if (await checkIsInternetConnected()) {
      dispatch(login(data.email, data.password));
    } else {
      displaySnackbar('No internet. Please check your internet connection and try again', 'info');
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form noValidate onSubmit={handleSubmit(submitUserLoginForm)} className="py-3">
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            {...register('email')}
            isInvalid={!!errors.email?.message}
          />
          <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password" className="py-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            {...register('password')}
            isInvalid={!!errors.password?.message}
          />
          <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="outline-primary">
          {loading && (
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          )}{' '}
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New User?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>
        <Link to="/forgot-password">Forgot your password?</Link>
      </Row>
    </FormContainer>
  );
};

UserSignInScreen.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default UserSignInScreen;
