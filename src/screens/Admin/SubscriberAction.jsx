/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from '@hookform/resolvers/yup';
import { Button as SnackbarButton } from '@material-ui/core';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import {
  closeSnackbar as closeSnackbarAction,
  enqueueSnackbar as enqueueSnackbarAction,
} from '../../actions/snackbarActions';
import { NEWS_LETTER_SUBSCRIBERS_ROUTE } from '../../constants/urlConstants';
import { checkIsInternetConnected } from '../../utils/commonFunctions';

const emailSchema = yup.object().shape({
  email: yup.string().email().required('Please enter a valid email address.'),
});

const SubscriberAction = ({ match, history }) => {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { id, email } = match.params;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(emailSchema) });

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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

  const handleUpdate = async (data) => {
    setLoading(true);
    try {
      if (await checkIsInternetConnected()) {
        await axios.put(
          `${NEWS_LETTER_SUBSCRIBERS_ROUTE}/${id}`,
          { email: data.email },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        displaySnackbar('Email Successfully updated.');
        setLoading(false);
      } else {
        setLoading(false);
        displaySnackbar('No internet. Please check your internet connection and try again', 'info');
      }
    } catch (error) {
      setLoading(false);
      displaySnackbar('Something went wrong. Please try again later.', 'error');
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      if (await checkIsInternetConnected()) {
        await axios.delete(`${NEWS_LETTER_SUBSCRIBERS_ROUTE}/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        setDeleting(false);
        displaySnackbar('Email Successfully unsubscribed from newsletter.');
        history.push('/admin/list-news-letter-subscribers');
      } else {
        setDeleting(false);
        displaySnackbar('No internet. Please check your internet connection and try again', 'info');
      }
    } catch (error) {
      setDeleting(false);
      displaySnackbar('Something went wrong. Please try again later.', 'error');
    }
  };

  useEffect(() => {
    setValue('email', email);
  }, []);

  return (
    <Container>
      <Link to="/admin/list-news-letter-subscribers" className="btn btn-outline-primary mt-5">
        Go Back
      </Link>
      <h1 className="my-3">Available actions</h1>
      <Form noValidate onSubmit={handleSubmit(handleUpdate)} className="my-3">
        <Form.Group controlId="email" className="my-3">
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

        <Button type="submit" variant="outline-primary">
          {loading && (
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          )}{' '}
          Update Subscriber Email
        </Button>
      </Form>
      <Button onClick={handleDelete} variant="outline-danger">
        {deleting && (
          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
        )}{' '}
        Unsubscribe Email
      </Button>
    </Container>
  );
};

SubscriberAction.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      email: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default SubscriberAction;
