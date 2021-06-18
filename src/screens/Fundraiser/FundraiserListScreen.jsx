import PropTypes from 'prop-types';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import FundraiserCard from '../../components/FundraiserCard';
import Message from '../../components/Message';
import SkeletonCard from '../../components/skeletons/SkeletonCard';
import useFundraiserList from '../../hooks/useFundraiserList';

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
      <Col key={fundraiser._id} className="py-3" sm={12} md={4} lg={3}>
        <FundraiserCard fundraiser={fundraiser} />
      </Col>
    ));
  }
  return (
    <Container className="my-5">
      <Message variant="danger">Something went wrong</Message>
      <Button variant="outline-primary" onClick={() => window.location.reload()}>
        Refresh page ?
      </Button>
    </Container>
  );
};

const FundraiserListScreen = ({ match }) => {
  // extract the search keyword if present
  // and send it to the custom hook
  const { keyword } = match.params;
  const { loading, error, fundraisers } = useFundraiserList(keyword);

  return (
    <>
      <Container style={{ backgroundColor: '#fbf8f6' }} fluid>
        <Container>
          <Row className="justify-content-center">
            <h2 className="mt-5 mb-3">Browse fundraisers</h2>
            <p>
              Starting a fundraiser for your favorite local restaurant, bar, coffee shop, or
              boutique.
            </p>
            <Children loading={loading} error={error} fundraisers={fundraisers} />
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

FundraiserListScreen.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      keyword: PropTypes.string,
    }),
  }),
};

export default FundraiserListScreen;
