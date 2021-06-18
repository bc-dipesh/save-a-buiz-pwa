/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Col, Collapse, Form, Row, Spinner } from 'react-bootstrap';
import useDonationForm from '../hooks/useDonationForm';

const DonationForm = ({ fundraiserId }) => {
  const { displayForm, isLoading, showHideForm, register, handleSubmit, errors, donate } =
    useDonationForm(fundraiserId);

  return (
    <>
      <Button
        variant="secondary"
        type="button"
        onClick={showHideForm}
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
              Please enter a valid donation amount to donate.
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
              <Button onClick={showHideForm} className="outline-danger" type="button">
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Collapse>
    </>
  );
};

DonationForm.propTypes = {
  fundraiserId: PropTypes.string.isRequired,
};

export default DonationForm;
