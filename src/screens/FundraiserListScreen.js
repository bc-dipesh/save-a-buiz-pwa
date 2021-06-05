/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import {
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listFundraisers } from '../actions/fundraiserActions';
import SkeletonCard from '../skeletons/SkeletonCard';
import Message from '../components/Message';
import Fundraiser from '../components/Fundraiser';

const FundraiserListScreen = ({ match }) => {
  const { keyword } = match.params;

  const dispatch = useDispatch();
  const fundraiserList = useSelector((state) => state.fundraiserList);
  const { loading, error, fundraisers } = fundraiserList;

  useEffect(() => {
    dispatch(listFundraisers(keyword));
  }, [dispatch, keyword]);

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
              fundraisers.map((fundraiser) => (
                <Col
                  key={fundraiser._id}
                  className="py-3"
                  sm={12}
                  md={4}
                  lg={3}
                >
                  <Fundraiser fundraiser={fundraiser} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </Container>
    </>
  );
};

FundraiserListScreen.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      keyword: PropTypes.string,
    }),
  }),
};

export default FundraiserListScreen;
