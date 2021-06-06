import PropTypes from 'prop-types';
import React from 'react';
import {
  Card, ProgressBar, Row, Col, ListGroup, Image, Button, Container,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { calculateProgress, numFormatter } from '../utils/commonFunctions';

const Fundraiser = ({ fundraiser, isCard }) => {
  const {
    _id, image, title, shortDescription, description, collected = 0, goal = 0, donors, organizer,
  } = fundraiser;

  if (isCard) {
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
  }

  return (
    <>
      <Container>
        <Row>
          <Col md={8}>
            <Image src={image} alt={title} fluid />
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h4>
                        Nrs.
                        {(collected).toLocaleString('en-US')}
                      </h4>
                      {' '}
                      <small className="text-muted">
                        raised of Nrs.
                        {(goal).toLocaleString('en-US')}
                        {' '}
                        goal
                      </small>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <ProgressBar
                    now={calculateProgress(collected, goal)}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  Donors:
                  {' '}
                  {numFormatter(donors)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Button type="button">
                      Donate
                    </Button>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container
        className="my-5"
        style={{ backgroundColor: '#fbf8f6' }}
        fluid
      >
        <Container>
          <Row className="py-5">
            <Col md={8}>
              <h1>{title}</h1>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <p>
                <i className="fas fa-user" />
                {' '}
                {organizer}
                {' '}
                is organizing this
                fundraiser.
              </p>
            </Col>
          </Row>
          <Row className="py-5">
            <Col md={8}>
              <p>
                Description:
                {description}
              </p>
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
                      <i className="fas fa-user" />
                      {' '}
                      {organizer}
                    </p>
                  </Col>
                  <Col>
                    <Button variant="outline-primary">
                      Contact
                    </Button>
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
                <h4>Comments (44)</h4>
              </ListGroup.Item>
              { [1, 2, 3, 4, 5].map((item) => (
                <ListGroup.Item className="py-3" key={item}>
                  <Row>
                    <p>
                      <i className="fas fa-user" />
                      {' '}
                      Caroline and Alan Igoe donated
                      NRS.20000
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

Fundraiser.propTypes = {
  fundraiser: PropTypes.shape({
    _id: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    shortDescription: PropTypes.string,
    description: PropTypes.string,
    collected: PropTypes.number,
    goal: PropTypes.number,
    donors: PropTypes.number,
    organizer: PropTypes.string,
  }).isRequired,
  isCard: PropTypes.bool.isRequired,
};

export default Fundraiser;
