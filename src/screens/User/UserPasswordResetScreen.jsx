/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../../components/FormContainer';
import usePasswordReset from './hooks/usePasswordReset';

const UserPasswordResetScreen = () => {
  const { loading, register, handleSubmit, errors, sendPasswordResetRequest } = usePasswordReset();

  return (
    <FormContainer>
      <h1>Reset your password</h1>
      <Form noValidate onSubmit={handleSubmit(sendPasswordResetRequest)} className="py-3">
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

        <Button type="submit" variant="outline-primary" className="mt-3">
          {loading && (
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          )}{' '}
          Send reset request
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          <p>
            Back to
            <Link to="/sign-in"> Sign-in?</Link>
          </p>
        </Col>
      </Row>
    </FormContainer>
  );
};

UserPasswordResetScreen.propTypes = {
  email: PropTypes.string,
};

export default UserPasswordResetScreen;
