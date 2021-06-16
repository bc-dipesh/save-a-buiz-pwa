import { Button as SnackbarButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { listFundraisers } from '../actions/fundraiserActions';
import {
  closeSnackbar as closeSnackbarAction,
  enqueueSnackbar as enqueueSnackbarAction,
} from '../actions/snackbarActions';
import Fundraiser from '../components/Fundraiser';
import Message from '../components/Message';
import SkeletonCard from '../components/skeletons/SkeletonCard';
import { checkIsInternetConnected } from '../utils/commonFunctions';

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
        <Fundraiser fundraiser={fundraiser} isCard />
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
  const { keyword } = match.params;

  const dispatch = useDispatch();
  const fundraiserList = useSelector((state) => state.fundraiserList);
  const { loading, error, fundraisers } = fundraiserList;

  const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
  const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

  const displaySnackbar = (message, variant = 'success') => {
    enqueueSnackbar({
      message,
      options: {
        key: uuidv4(),
        variant,
        action: (key) => (
          <SnackbarButton style={{ color: 'cyan' }} onClick={() => closeSnackbar(key)}>
            dismiss
          </SnackbarButton>
        ),
      },
    });
  };

  useEffect(async () => {
    if (await checkIsInternetConnected()) {
      dispatch(listFundraisers(keyword));
    } else {
      displaySnackbar('No internet. Please check your internet connection and try again', 'error');
    }
  }, [dispatch, keyword]);

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
