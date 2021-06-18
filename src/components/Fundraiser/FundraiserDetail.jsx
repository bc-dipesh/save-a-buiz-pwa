/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from '@hookform/resolvers/yup';
import { Button as SnackbarButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Button,
  Collapse,
  Card,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  ProgressBar,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import axios from 'axios';
import {
  calculateProgress,
  numFormatter,
  checkIsInternetConnected,
} from '../../utils/commonFunctions';
import {
  closeSnackbar as closeSnackbarAction,
  enqueueSnackbar as enqueueSnackbarAction,
} from '../../actions/snackbarActions';

const DonationForm = ({ fundraiserId }) => {
  const [displayForm, setDisplayForm] = useState(false);

  const donationSchema = yup.object().shape({
    donationAmount: yup.number().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(donationSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

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

  const sendPaymentRequestToEsewa = async (donationAmount) => {
    setIsLoading(true);

    // set eSewa credentials
    const pid = fundraiserId;
    const scd = 'EPAYTEST';
    const su = 'http://localhost:3000/user/donations';
    const fu = 'http://localhost:3000/user/donations';
    const url = 'https://uat.esewa.com.np/epay/main';

    try {
      // submit donation amount to eSewa
      await axios.post(
        url,
        {
          amt: donationAmount,
          tAmt: donationAmount,
          pid,
          scd,
          su,
          fu,
          txAmt: 0,
          psc: 0,
          pdc: 0,
        },
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
    } catch (error) {
      displaySnackbar('Something went wrong. Please try again later.', 'error');
    }
    setIsLoading(false);
  };

  const donate = async ({ donationAmount }) => {
    if (await checkIsInternetConnected()) {
      sendPaymentRequestToEsewa(donationAmount);
    } else {
      displaySnackbar('No internet. Please check your internet connection and try again', 'info');
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        type="button"
        onClick={() => setDisplayForm(!displayForm)}
        aria-controls="donate-form"
        aria-expanded={displayForm}
      >
        Donate with eSewa
      </Button>

      <Collapse in={displayForm}>
        <Form noValidate onSubmit={handleSubmit(donate)} id="donate-form">
          <Form.Group controlId="donationAmount">
            <Form.Label>Enter the amount you want to donate</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter the amount you want to donate"
              {...register('donationAmount')}
              isInvalid={!!errors.donationAmount?.message}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid amount.
            </Form.Control.Feedback>
          </Form.Group>
          <Row className="justify-content-start mt-3">
            <Col xs={4}>
              <Button variant="secondary" type="submit">
                {isLoading && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}{' '}
                Donate
              </Button>
            </Col>
            <Col xs={4}>
              <Button
                onClick={() => {
                  setDisplayForm(false);
                  clearErrors();
                }}
                className="outline-danger"
                type="button"
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Collapse>
    </>
  );
};

const FundraiserDetail = ({ fundraiser }) => {
  const BASE_URL = 'https://save-a-buiz-api.herokuapp.com';
  const {
    _id = '',
    image = '',
    title = '',
    description = '',
    collected = 0,
    goal = 0,
    donors = 0,
    youTubeVideoLink = '',
    organizer = '',
  } = fundraiser || {};

  const { name } = organizer || {};

  return (
    <>
      <Container>
        <Row>
          <Col md={8}>{image && <Image src={`${BASE_URL}/${image}`} alt={title} fluid />}</Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h4>
                        Nrs.
                        {collected.toLocaleString('en-US')}
                      </h4>{' '}
                      <small className="text-muted">
                        raised of Nrs.
                        {goal.toLocaleString('en-US')} goal
                      </small>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <ProgressBar now={calculateProgress(collected, goal)} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Donors</strong>: {numFormatter(donors)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <DonationForm fundraiserId={_id} />
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container className="my-5" style={{ backgroundColor: '#fbf8f6' }} fluid>
        <Container>
          <Row className="py-5">
            <Col md={8}>
              <h1>{title}</h1>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                </svg>{' '}
                <strong>{name}</strong> is organizing this fundraiser.
              </p>
            </Col>
          </Row>
          <Row className="py-5">
            <Col md={8}>
              <p>
                <strong>Description</strong>: {description}
              </p>
              <Link to={youTubeVideoLink}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-link-45deg"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                  <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                </svg>{' '}
                Video Link
              </Link>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>Organizer</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-person"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                      </svg>{' '}
                      {name}
                    </p>
                  </Col>
                  <Col>
                    <Button variant="outline-primary">Contact</Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>Comments (5)</h4>
              </ListGroup.Item>
              {[1, 2, 3, 4, 5].map((item) => (
                <ListGroup.Item className="py-3" key={item}>
                  <Row>
                    <p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-person"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                      </svg>{' '}
                      Caroline and Alan Igoe donated NRS.20000
                    </p>
                  </Row>
                  <Row>
                    <p>Wishing Katie all the best xx</p>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

DonationForm.propTypes = {
  fundraiserId: PropTypes.string.isRequired,
};

FundraiserDetail.propTypes = {
  fundraiser: PropTypes.shape({
    _id: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    shortDescription: PropTypes.string,
    description: PropTypes.string,
    collected: PropTypes.number,
    goal: PropTypes.number,
    donors: PropTypes.number,
    youTubeVideoLink: PropTypes.string,
    organizer: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default FundraiserDetail;
