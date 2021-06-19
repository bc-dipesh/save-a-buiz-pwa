import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card, Col, Container, Image, ListGroup, ProgressBar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { calculateProgress, numFormatter } from '../../../utils/commonFunctions';
import Donation from './Donation';
import DonationForm from './DonationForm';

const FundraiserDetail = ({ fundraiser }) => {
  const BASE_URL = 'https://save-a-buiz-api.herokuapp.com';
  const {
    _id = '',
    image = '',
    title = '',
    description = '',
    collected = 0,
    goal = 0,
    youTubeVideoLink = '',
    organizer = '',
    donations = [],
  } = fundraiser || {};

  const { name, email } = organizer || {};

  const formattedDonors = numFormatter(donations.length);
  const currentProgress = calculateProgress(collected, goal);
  const collectedLocaleString = collected.toLocaleString('en-US');
  const goalLocaleString = goal.toLocaleString('en-US');

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
                        {collectedLocaleString}
                      </h4>{' '}
                      <small className="text-muted">
                        raised of Nrs.
                        {goalLocaleString} goal
                      </small>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <ProgressBar now={currentProgress} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Donors</strong>: {formattedDonors}
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
                    <a href={`mailto:${email}`}>
                      <Button variant="outline-primary">Contact</Button>
                    </a>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
      <Donation donations={donations} />
    </>
  );
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
    youTubeVideoLink: PropTypes.string,
    organizer: PropTypes.shape({
      name: PropTypes.string,
    }),
    donations: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default FundraiserDetail;
