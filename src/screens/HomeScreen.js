import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listFundraisers } from '../actions/fundraiserActions';
import Fundraiser from '../components/Fundraiser';
import Message from '../components/Message';
import SkeletonCard from '../skeletons/SkeletonCard';

const Children = ({ loading, error, fundraisers }) => {
  if (loading) {
    return [1, 2, 3].map((item) => (
      <Col key={item} className="my-3" sm={12} md={4} lg={3}>
        <SkeletonCard />
      </Col>
    ));
  }
  if (!error) {
    return fundraisers.map((fundraiser) => (
      <Col
        key={fundraiser._id}
        className="py-3"
        sm={12}
        md={4}
        lg={3}
      >
        <Fundraiser fundraiser={fundraiser} isCard />
      </Col>
    ));
  }
  return (
    <Container className="my-5">
      <Message variant="danger">Something went wrong</Message>
      <Button variant="outline-primary" onClick={() => window.location.reload()}>Refresh page ?</Button>
    </Container>
  );
};

const HomeScreen = () => {
  const dispatch = useDispatch();
  const fundraiserList = useSelector((state) => state.fundraiserList);
  const { loading, error, fundraisers } = fundraiserList;

  useEffect(() => {
    dispatch(listFundraisers());
  }, [dispatch]);

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <h2 className="pb-3">Top fundraisers</h2>
          <Children loading={loading} error={error} fundraisers={fundraisers} />
        </Row>
      </Container>

      <Container style={{ backgroundColor: '#fbf8f6' }} fluid>
        <Container>
          <Row className="my-5 py-5">
            <h2 className="py-3">
              The leader in online fundraising
            </h2>
            <Row>
              <Col className="p-3" xs={12} sm={4}>
                <h4 className="py-3">
                  <i className="fas fa-globe" />
                  {' '}
                  Worldwide
                  leader
                </h4>
                <p>
                  SaveABuiz is trusted around the world for
                  its simple, reliable fundraising platform.
                </p>
              </Col>
              <Col className="p-3" xs={12} sm={4}>
                <h4 className="py-3">
                  <i className="fas fa-wrench" />
                  {' '}
                  Simple setup
                </h4>
                <p>
                  You can personalize and share your SaveABuiz
                  in just a few minutes.
                </p>
              </Col>
              <Col className="p-3" xs={12} sm={4}>
                <h4 className="py-3">
                  <i className="fas fa-lock" />
                  {' '}
                  Secure
                </h4>
                <p>
                  Our Trust & Safety team works around the
                  clock to protect against fraud.
                </p>
              </Col>
            </Row>
            <Row>
              <Col className="p-3" xs={12} sm={4}>
                <h4 className="py-3">
                  <i className="fas fa-mobile" />
                  {' '}
                  PWA
                </h4>
                <p>
                  SaveABuiz is a Progressive Web App that
                  makes it simple to launch and manage your
                  fundraiser from anywhere on the go.
                </p>
              </Col>
              <Col className="p-3" xs={12} sm={4}>
                <h4 className="py-3">
                  <i className="fas fa-chart-line" />
                  {' '}
                  Social
                  reach
                </h4>
                <p>
                  Harness the power of social media to spread
                  your story and get more support.
                </p>
              </Col>
              <Col className="p-3" xs={12} sm={4}>
                <h4 className="py-3">
                  <i className="fas fa-headset" />
                  {' '}
                  24/7 expert
                  advice
                </h4>
                <p>
                  Our best-in-class Customer Happiness agents
                  will answer your questions, day or night.
                </p>
              </Col>
            </Row>
            <Col>
              <Button variant="outline-primary">
                Start a
                {' '}
                <span style={{ textTransform: 'none' }}>
                  SaveABuiz
                </span>
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

Children.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  fundraisers: PropTypes.arrayOf(PropTypes.object),
};

export default HomeScreen;
