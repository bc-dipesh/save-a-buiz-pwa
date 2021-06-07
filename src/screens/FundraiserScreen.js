import { PropTypes } from 'prop-types';
import { React, useEffect } from 'react';
import {
  Button, Card, Col, Container, ListGroup, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listFundraiserDetails } from '../actions/fundraiserActions';
import Fundraiser from '../components/Fundraiser';
import Message from '../components/Message';
import Skeleton from '../skeletons/SkeletonElement';

const Children = ({ loading, error, fundraiser }) => {
  if (loading) {
    return (
      <>
        <Container>
          <Row>
            <Col md={8}>
              <Skeleton type="thumbnail" />
              <Skeleton type="thumbnail" />
              <Skeleton type="thumbnail" />
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <Skeleton type="title" />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Skeleton type="text" />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Skeleton type="text" />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <Skeleton type="title" />
                      </Col>
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
                <Skeleton type="title" />
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <Skeleton type="text" />
              </Col>
            </Row>
            <Row className="py-5">
              <Col md={8}>
                <Skeleton type="text" />
                <Skeleton type="text" />
                <Skeleton type="text" />
                <Skeleton type="text" />
                <Skeleton type="text" />
              </Col>
            </Row>
          </Container>
        </Container>
        <Container>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Skeleton type="title" />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <Skeleton type="text" />
                    </Col>
                    <Col>
                      <Skeleton type="title" />
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
                  <Skeleton type="title" />
                </ListGroup.Item>
                { [1, 2, 3].map((item) => (
                  <ListGroup.Item className="py-3" key={item}>
                    <Row>
                      <Skeleton type="title" />
                    </Row>
                    <Row>
                      <Skeleton type="text" />
                      <Skeleton type="text" />
                      <Skeleton type="text" />
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
  if (!error) {
    return <Fundraiser fundraiser={fundraiser} isCard={false} />;
  }
  return (
    <Container className="my-5">
      <Message variant="danger">Something went wrong</Message>
      <Button variant="outline-primary" onClick={() => window.location.reload()}>Refresh page ?</Button>
    </Container>
  );
};

const FundraiserScreen = ({ match }) => {
  const dispatch = useDispatch();

  const fundraiserDetails = useSelector((state) => state.fundraiserDetails);
  const { loading, error, fundraiser } = fundraiserDetails;

  useEffect(() => {
    dispatch(listFundraiserDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      <Container>
        <Link className="btn btn-outline-primary my-3" to="/">
          Go Back
        </Link>
      </Container>
      <Children loading={loading} error={error} fundraiser={fundraiser} />
    </>
  );
};

Children.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  fundraiser: PropTypes.shape({
    _id: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    shortDescription: PropTypes.string,
    description: PropTypes.string,
    collected: PropTypes.number,
    goal: PropTypes.number,
    donors: PropTypes.number,
    organizer: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

FundraiserScreen.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

export default FundraiserScreen;
