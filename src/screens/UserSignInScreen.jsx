/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import {
  Button, Col, Form, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

const userLoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const UserSignInScreen = ({ location, history }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(userLoginSchema),
  });

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (!!userInfo?.token && !!userInfo?.user) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitUserLoginForm = (data) => {
    dispatch(login(data.email, data.password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && (
      <Message variant="danger">
        {String(error)}
      </Message>
      )}
      {loading && <Loader />}
      <Form noValidate onSubmit={handleSubmit(submitUserLoginForm)} className="py-3">
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" {...register('email')} isInvalid={!!errors.email?.message} />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password" className="py-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Enter password" {...register('password')} isInvalid={!!errors.password?.message} />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="outline-primary">Sign In</Button>
      </Form>

      <Row className="py-3">
        <Col>
          New User?
          {' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>
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
