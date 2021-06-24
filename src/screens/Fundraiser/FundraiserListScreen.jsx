import PropTypes from 'prop-types';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import FundraiserCard from '../../components/FundraiserCard';
import Message from '../../components/Message';
import Paginate from '../../components/Paginate';
import SkeletonCard from '../../components/skeletons/SkeletonCard';
import useFundraiserList from '../../hooks/useFundraiserList';

const Children = ({ loading, error, fundraisers, pages, page, keyword }) => {
  if (loading) {
    return [1, 2, 3].map((item) => (
      <Col key={item} className="my-3" sm={12} md={4} lg={3}>
        <SkeletonCard />
      </Col>
    ));
  }
  if (!error) {
    return (
      <>
        {fundraisers.map((fundraiser) => (
          <Col key={fundraiser._id} className="py-3" sm={12} md={4} lg={3}>
            <FundraiserCard fundraiser={fundraiser} />
          </Col>
        ))}
        <Paginate keyword={keyword} pages={pages} page={page} url="/fundraisers" />
      </>
    );
  }
  return (
    <Container className="my-5">
      <Message title="Error" variant="error">
        Something went wrong
      </Message>{' '}
      <Button variant="outline-primary" onClick={() => window.location.reload()}>
        Refresh page ?
      </Button>
    </Container>
  );
};

const FundraiserListScreen = ({ match }) => {
  const { loading, error, fundraisers, pages, page } = useFundraiserList(match.params);

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
            <Children
              loading={loading}
              error={error}
              fundraisers={fundraisers}
              keyword={match.params.keyword}
              pages={pages}
              page={page}
            />
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
  keyword: PropTypes.string,
  pages: PropTypes.number,
  page: PropTypes.number,
};

FundraiserListScreen.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      keyword: PropTypes.string,
      pageNumber: PropTypes.string,
    }),
  }),
};

export default FundraiserListScreen;
