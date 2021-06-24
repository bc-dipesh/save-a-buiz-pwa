/* eslint-disable react/jsx-props-no-spreading */
import { Button as SnackbarButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  closeSnackbar as closeSnackbarAction,
  enqueueSnackbar as enqueueSnackbarAction,
} from '../../actions/snackbarActions';
import { createUser } from '../../actions/userActions';
import useUserCreate from './hooks/useUserCreate';

const CreateUserScreen = ({ history }) => {
  const { register, handleSubmit, errors } = useUserCreate();

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

  const userCreate = useSelector((state) => state.userCreate);
  const { loading, error, user } = userCreate;

  useEffect(() => {
    if (user) {
      displaySnackbar('User Successfully created.');
      history.push('/admin/list-user');
    }
    if (error) {
      displaySnackbar(error, 'error');
    }
  }, [history, user, error]);

  const handleCreateUserForm = (data) => {
    dispatch(createUser(data));
  };

  return (
    <Container>
      <Link to="/admin/list-user" className="btn btn-outline-primary mt-5">
        Go Back
      </Link>
      <h1 className="my-3">Create User</h1>
      <Form noValidate onSubmit={handleSubmit(handleCreateUserForm)} className="py-3">
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter name"
            {...register('name')}
            isInvalid={!!errors.name?.message}
          />
          <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="email" className="py-3">
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

        <Form.Group controlId="mobilePhoneNumber" className="py-3">
          <Form.Label>Mobile Phone Number</Form.Label>
          <Form.Control
            type="mobilePhoneNumber"
            name="mobilePhoneNumber"
            placeholder="Enter mobile phone number"
            {...register('mobilePhoneNumber')}
            isInvalid={!!errors.mobilePhoneNumber?.message}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid mobile phone number
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password">
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

        <Form.Group controlId="confirmPassword" className="py-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            {...register('confirmPassword')}
            isInvalid={!!errors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword && 'Passwords must match'}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="outline-primary">
          {loading && (
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          )}{' '}
          Create User
        </Button>
      </Form>
    </Container>
  );
};

CreateUserScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default CreateUserScreen;
