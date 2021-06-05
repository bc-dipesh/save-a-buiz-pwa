import PropTypes from 'prop-types';
import React from 'react';
import { Card, ProgressBar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { calculateProgress } from '../utils/commonFunctions';

const Fundraiser = ({ fundraiser }) => {
  const {
    _id, image, title, shortDescription, collected, goal,
  } = fundraiser;

  return (
    <Card>
      <Link to={`/fundraisers/${_id}`}>
        <Card.Img
          variant="top"
          src={image}
        />
      </Link>
      <Card.Body>
        <Card.Title>
          <h5>{title}</h5>
        </Card.Title>
        <Card.Text>
          {shortDescription}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Row className="py-2">
          <ProgressBar
            now={calculateProgress(
              collected,
              goal,
            )}
          />
        </Row>
        <Row className="py-2">
          <small>
            NRS.
            {collected}
            {' '}
            raised of NRS.
            {goal}
            .
          </small>
        </Row>
      </Card.Footer>
    </Card>
  );
};

Fundraiser.propTypes = {
  fundraiser: PropTypes.shape({
    _id: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    shortDescription: PropTypes.string,
    collected: PropTypes.number,
    goal: PropTypes.number,
  }),
};

export default Fundraiser;
