/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import {
  Card,
  Col,
  Container,
  ProgressBar,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listFundraisers } from '../actions/fundraiserActions';
import SkeletonCard from '../skeletons/SkeletonCard';
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
      <Container style={{ backgroundColor: '#fbf8f6' }} fluid>
        <Container>
          <Row className="justify-content-center">
            <h2 className="pt-5 pb-3">Browse fundraisers</h2>
            <p>
              Starting a fundraiser for your favorite local
              restaurant, bar, coffee shop, or boutique.
            </p>
            {loading ? (
              [1, 2, 3].map((item) => (
                <Col key={item} className="py-3" sm={12} md={4} lg={3}>
                  <SkeletonCard />
                </Col>
              ))
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
                  <Col
                    key={_id}
                    className="py-3"
                    sm={12}
                    md={4}
                    lg={3}
                  >
                    <Card>
                      <Link to={`fundraisers/${_id}`}>
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
                  </Col>
                );
              })
            )}
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default HomeScreen;
