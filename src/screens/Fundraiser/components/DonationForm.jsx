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
          <Form.Group className="my-3" controlId="donationAmount">
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
          <Form.Group className="my-3" controlId="comment">
            <Form.Label>What would you like to say with the donation?</Form.Label>
            <Form.Control
              typ="text"
              placeholder="Enter any message you would like to send with your donation"
              {...register('comment')}
              isInvalid={!!errors.comment?.message}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid message.
            </Form.Control.Feedback>
          </Form.Group>
          <Row className="justify-content-start mt-3">
            <Col xs={4} sm={6} lg={4}>
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
            <Col xs={4} sm={6} lg={4}>
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
