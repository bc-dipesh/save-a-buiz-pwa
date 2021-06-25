import React, { useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { updateFundraiserDonation } from '../../actions/fundraiserActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const ProcessDonation = () => {
  const location = useLocation();
  const history = useHistory();
  const queryParams = new URLSearchParams(location.search);

  const dispatch = useDispatch();

  const oid = queryParams.get('oid');
  const amt = queryParams.get('amt');
  const refId = queryParams.get('refId');

  const fundraiserUpdateDonation = useSelector((state) => state.fundraiserUpdateDonation);
  const { loading, error, success } = fundraiserUpdateDonation;

  const updateDonation = () => {
    if (oid && amt && refId) {
      dispatch(updateFundraiserDonation(oid, amt, refId));
      queryParams.delete('amt');
      queryParams.delete('refId');
      history.replace({
        search: queryParams.toString(),
      });
    }
  };

  useEffect(() => {
    if (oid && amt && refId) {
      updateDonation();
    }
  }, [dispatch, loading]);

  return (
    <Container className="mt-3">
      <h1>Processing donation...</h1>
      {loading && <Loader />}
      {error && (
        <>
          <Message className="mt-3" title="Payment Unsuccessful" variant="error">
            There was problem with the payment. Please try again later.
          </Message>
          <Link to={`/fundraiser/${oid}`}>
            <Button variant="outline-primary">Back to Fundraiser</Button>
          </Link>
        </>
      )}
      {success && (
        <>
          <Message className="mt-3" title="Payment Successful" variant="success">
            Your payment was successful. Thank you for your generous donation.
          </Message>
          <Link to={`/fundraiser/${oid}`}>
            <Button variant="outline-primary">Back to Fundraiser</Button>
          </Link>
        </>
      )}
    </Container>
  );
};

export default ProcessDonation;
