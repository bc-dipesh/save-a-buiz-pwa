import PropTypes from 'prop-types';
import React from 'react';
import { Card, ProgressBar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { calculateProgress } from '../utils/commonFunctions';

const FundraiserCard = ({ fundraiser }) => {
  const BASE_URL = 'https://save-a-buiz-api.herokuapp.com';
  const {
    _id = '',
    image = '',
    title = '',
    shortDescription = '',
    goal = 0,
    collected = 0,
  } = fundraiser || {};
  const progress = calculateProgress(collected, goal);

  return (
    <Card>
      <Link to={`/fundraisers/${_id}`}>
        {image && <Card.Img variant="top" src={`${BASE_URL}/${image}`} alt={title} />}
      </Link>
      <Card.Body>
        <Card.Title>
          <h2 className="h5">{title}</h2>
        </Card.Title>
        <Card.Text>{shortDescription}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Row className="py-2">
          <ProgressBar now={progress} />
        </Row>
        <Row className="py-2">
          <small>
            NRS.
            {collected} raised of NRS.
            {goal}.
          </small>
        </Row>
      </Card.Footer>
    </Card>
  );
};

FundraiserCard.propTypes = {
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

export default FundraiserCard;
