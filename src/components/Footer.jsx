/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from '@hookform/resolvers/yup';
import { Button as SnackbarButton } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Container, Form, Image, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import {
  closeSnackbar as closeSnackbarAction,
  enqueueSnackbar as enqueueSnackbarAction,
} from '../actions/snackbarActions';
import { checkIsInternetConnected } from '../utils/commonFunctions';

const SubscribeToNewsLetterForm = () => {
  const BASE_URL = 'https://save-a-buiz-api.herokuapp.com/api/v1/subscribe-to-news-letter';
  const [isLoading, setIsLoading] = useState(false);

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const subscriptionSchema = yup.object().shape({
    email: yup.string().email().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(subscriptionSchema),
  });

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
          <SnackbarButton style={{ color: 'cyan' }} onClick={() => closeSnackbar(key)}>
            dismiss
          </SnackbarButton>
        ),
      },
    });
  };

  const submitSubscriptionRequest = async ({ email }) => {
    setIsLoading(true);
    if (await checkIsInternetConnected()) {
      try {
        const {
          data: { data },
        } = await axios.post(`${BASE_URL}`, { email }, axiosConfig);

        setIsLoading(false);
        displaySnackbar(data);
      } catch (error) {
        setIsLoading(false);
        displaySnackbar(error.response.data.data, 'error');
      }
    } else {
      setIsLoading(false);
      displaySnackbar('No internet. Please check your internet connection and try again', 'error');
    }
  };
  return (
    <>
      <Form noValidate onSubmit={handleSubmit(submitSubscriptionRequest)}>
        <Form.Group className="my-3" controlId="formGroupEmail">
          <Form.Label>
            Subscribe to our newsletter{' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-newspaper"
              viewBox="0 0 16 16"
            >
              <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z" />
              <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z" />
            </svg>
          </Form.Label>
          <Row className="align-items-center">
            <Col className="my-3" xs={12} sm={6}>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                {...register('email')}
                isInvalid={!!errors.email?.message}
              />
              <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
            </Col>
            <Col xs={12} sm={6}>
              <Button variant="outline-primary" type="submit">
                {isLoading && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}{' '}
                Subscribe
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </>
  );
};

const Footer = () => (
  <footer>
    <Container className="py-5">
      <Row>
        <Col xs={12} sm={6}>
          <Image src="/images/logo.png" alt="logo" />
        </Col>

        <Col xs={12} sm={6}>
          <Row>
            <SubscribeToNewsLetterForm />
          </Row>
          <Row>
            <Col xs={12} sm={6}>
              <h4>
                <strong>Learn More</strong>
              </h4>
              <ul className="list-unstyled">
                <li>
                  <Link to="/common-questions">Common questions</Link>
                </li>
                <li>
                  <a href="https://facebook.com">Success stories</a>
                </li>
                <li>
                  <Link to="/supported-provinces">Supported provinces</Link>
                </li>
              </ul>
            </Col>
            <Col xs={12} sm={6}>
              <h4>
                <strong>Resources</strong>
              </h4>
              <ul className="list-unstyled">
                <li>
                  <a href="https://facebook.com">Help Center</a>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={4} className="flex-grow-1">
          <Row>
            <Col xs={12} sm={4}>
              &copy; 2021 SaveABuiz
            </Col>
            <Col xs={3} sm={2}>
              <a href="https://facebook.com">Terms</a>
            </Col>
            <Col xs={3} sm={2}>
              <a href="https://facebook.com">Privacy</a>
            </Col>
            <Col xs={3} sm={2}>
              <Link to="/legal">Legal</Link>
            </Col>
          </Row>
        </Col>
        <Col />
        <Col xs={12} sm={3}>
          <Row>
            <Col xs={1}>
              <a href="https://facebook.com">
                <i className="fab fa-facebook-square" />
              </a>
            </Col>
            <Col xs={1}>
              <a href="https://youtube.com">
                <i className="fab fa-youtube" />
              </a>
            </Col>
            <Col xs={1}>
              <a href="https://twitter.com">
                <i className="fab fa-twitter" />
              </a>
            </Col>
            <Col xs={1}>
              <a href="https://instagram.com">
                <i className="fab fa-instagram" />
              </a>
            </Col>
            <Col xs={1}>
              <a href="https://linkedin.com">
                <i className="fab fa-linkedin" />
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
