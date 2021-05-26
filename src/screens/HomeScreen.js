/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import {
  Button, Card, Col, Container, ProgressBar, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listFundraisers } from '../actions/fundraiserActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { calculateProgress } from '../utils/commonFunctions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const fundraiserList = useSelector((state) => state.fundraiserList);
  const { loading, error, fundraisers } = fundraiserList;

  useEffect(() => {
    dispatch(listFundraisers());
  }, [dispatch]);

  return (
    <>
      <Container className="py-5">
        <Row className="justify-content-center">
          <h2 className="py-3">Top fundraisers</h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            fundraisers.map((f) => {
              const {
                _id,
                image,
                title,
                shortDescription,
                collected,
                goal,
              } = f;
              return (
                <Col key={_id} className="py-3" xs={12} sm={3}>
                  <Card>
                    <Link to={`fundraiser/${_id}`}>
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
                          now={calculateProgress(collected, goal)}
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
                </Col>
              );
            })
          )}
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

export default HomeScreen;
