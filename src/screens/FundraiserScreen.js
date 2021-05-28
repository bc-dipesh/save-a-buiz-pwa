/* eslint-disable no-nested-ternary */
import { PropTypes } from 'prop-types';
import { React, useEffect } from 'react';
import {
  Button, Card, Col, Container,
  Image,
  ListGroup,
  ProgressBar, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listFundraiserDetails } from '../actions/fundraiserActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { calculateProgress, numFormatter } from '../utils/commonFunctions';

const FundraiserScreen = ({ match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listFundraiserDetails(match.params.id));
  }, [dispatch, match]);

  const fundraiserDetails = useSelector((state) => state.fundraiserDetails);
  const { loading, error, fundraiser } = fundraiserDetails;
  const {
    title, image, description, collected, goal, donors, organizer,
  } = fundraiser || {};

  return (
    <>
      <Container>
        <Link className="btn btn-outline-primary my-3" to="/">
          Go Back
        </Link>
        {loading && <Loader />}
        {error && <Message variant="danger">{String(error)}</Message>}
        {loading || error
            || (
            <Row>
              <Col md={8}>
                <Image src={image || ''} alt={title || ''} fluid />
              </Col>
              <Col md={4}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <h4>
                            Nrs.
                            {(collected || 0).toLocaleString('en-US')}
                          </h4>
                          {' '}
                          <small className="text-muted">
                            raised of Nrs.
                            {(goal || 0).toLocaleString('en-US')}
                            {' '}
                            goal
                          </small>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <ProgressBar
                        now={calculateProgress(collected || 0, goal || 0)}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Donors:
                      {' '}
                      {numFormatter(donors || 0)}
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
            )}
      </Container>

      {error
      || (
      <>
        <Container
          className="my-5"
          style={{ backgroundColor: '#fbf8f6' }}
          fluid
        >
          <Container>
            <Row className="py-5">
              <Col md={8}>
                <h1>{title || ''}</h1>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <p>
                  <i className="fas fa-user" />
                  {' '}
                  {organizer || ''}
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
                  {description || ''}
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
                        {organizer || ''}
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

          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>Comments (44)</h4>
                </ListGroup.Item>
                <ListGroup.Item className="py-3">
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
                <ListGroup.Item className="py-3">
                  <Row>
                    <p>
                      <i className="fas fa-user" />
                      {' '}
                      Sharon O&aposSullivan donated
                      NRS.2000
                    </p>
                  </Row>
                  <Row>
                    <p>
                      Wishing a beautiful little girl
                      all the best in her recovery &
                      love and best wishes to her
                      family..
                    </p>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="py-3">
                  <Row>
                    <p>
                      <i className="fas fa-user" />
                      {' '}
                      Louise Sheehan donated NRS.1000
                    </p>
                  </Row>
                  <Row>
                    <p>
                      Best of Luck to Katie and her
                      family ! She has the brightest
                      smile
                    </p>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="py-3">
                  <Row>
                    <p>
                      <i className="fas fa-user" />
                      {' '}
                      Imelda Quinn donated NRS.3000
                    </p>
                  </Row>
                  <Row>
                    <p>
                      You’re a little superstar Katie
                      ! You’ve got this
                    </p>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="py-3">
                  <Row>
                    <p>
                      <i className="fas fa-user" />
                      {' '}
                      Mary lou Carty donated NRS.1000
                    </p>
                  </Row>
                  <Row>
                    <p>
                      I wish her all the luck in the
                      World
                    </p>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </>
      )}
    </>
  );
};

FundraiserScreen.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

export default FundraiserScreen;
