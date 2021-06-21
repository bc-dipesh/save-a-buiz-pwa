/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from '@hookform/resolvers/yup';
import { Button as SnackbarButton } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import {
  closeSnackbar as closeSnackbarAction,
  enqueueSnackbar as enqueueSnackbarAction,
} from '../../actions/snackbarActions';
import { listFundraiserDetails, updateFundraiser } from '../../actions/fundraiserActions';
import FormContainer from '../../components/FormContainer';
import { checkIsInternetConnected } from '../../utils/commonFunctions';

const fundraiserEditSchema = yup.object().shape({
  title: yup.string().required('Please enter your fundraiser title'),
  location: yup.string().required('Please enter your fundraiser location.'),
  goal: yup
    .number()
    .typeError('Please enter a valid number for your fundraiser goal amount.')
    .required('Please enter your fundraiser goal.'),
  description: yup.string().required('Please describe about your fundraiser.'),
});

const EditFundraiserScreen = ({ match, history }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(fundraiserEditSchema) });

  const fundraiserId = match.params.id;
  const fundraiserDetails = useSelector((state) => state.fundraiserDetails);
  const { loading, error, fundraiser } = fundraiserDetails;
  const fundraiserUpdate = useSelector((state) => state.fundraiserUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = fundraiserUpdate;

  const dispatch = useDispatch();

  const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
  const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

  const displaySnackbar = (message, variant = 'success') => {
    enqueueSnackbar({
      message,
      options: {
        key: uuidv4(),
        variant,
        action: (key) => (
          <SnackbarButton onClick={() => closeSnackbar(key)}>dismiss</SnackbarButton>
        ),
      },
    });
  };

  useEffect(() => {
    if (successUpdate) {
      displaySnackbar('Fundraiser successfully updated.');
      history.push('/admin/list-fundraiser');
    } else if (fundraiser?._id === fundraiserId) {
      console.log(fundraiser._id);
      setValue('location', fundraiser.location);
      setValue('title', fundraiser.title);
      setValue('goal', fundraiser.goal);
      setValue('description', fundraiser.description);
    } else {
      dispatch(listFundraiserDetails(fundraiserId));
    }
    if (error || errorUpdate) {
      displaySnackbar(error || errorUpdate, 'error');
    }
  }, [dispatch, fundraiser, fundraiserId, error, successUpdate, errorUpdate]);

  const submitFundraiserUpdateForm = async (data) => {
    if (await checkIsInternetConnected()) {
      dispatch(updateFundraiser(data));
    } else {
      displaySnackbar('No internet. Please check your internet connection and try again', 'info');
    }
  };

  return (
    <Container>
      <Link to="/admin/list-fundraiser" className="btn btn-outline-primary mt-5">
        Go Back
      </Link>
      <FormContainer>
        <h1 className="mb-3">Edit Fundraiser</h1>
        <Form noValidate onSubmit={handleSubmit(submitFundraiserUpdateForm)}>
          <Form.Group controlId="address" className="mb-4">
            <Form.Label>Location</Form.Label>
            {loading || loadingUpdate ? (
              <Skeleton type="text" />
            ) : (
              <Form.Control
                name="location"
                type="text"
                placeholder="Ex: Sahayoginagar - 32, Kathmandu"
                {...register('location')}
                isInvalid={!!errors.location?.message}
              />
            )}

            <Form.Control.Feedback type="invalid">{errors.location?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="fundraisingTitle" className="mb-4">
            <Form.Label>Title</Form.Label>
            {loading || loadingUpdate ? (
              <Skeleton type="text" />
            ) : (
              <Form.Control
                name="title"
                type="text"
                placeholder="Ex: Help Hari Reopen His Restaurant"
                {...register('title')}
                isInvalid={!!errors.title?.message}
              />
            )}
            <Form.Control.Feedback type="invalid">{errors.location?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="fundraisingGoal" className="mb-4">
            <Form.Label>Goal</Form.Label>
            {loading || loadingUpdate ? (
              <Skeleton type="text" />
            ) : (
              <Form.Control
                name="goal"
                type="number"
                placeholder="Ex: 50,000"
                {...register('goal')}
                isInvalid={!!errors.goal?.message}
              />
            )}
            <Form.Control.Feedback type="invalid">{errors.goal?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="fundraisingDescription" className="mb-4">
            <Form.Label>Description</Form.Label>
            {loading || loadingUpdate ? (
              <Skeleton type="text" />
            ) : (
              <Form.Control
                name="description"
                as="textarea"
                rows={3}
                {...register('description')}
                isInvalid={!!errors.description?.message}
              />
            )}
            <Form.Control.Feedback type="invalid">
              {errors.description?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="outline-primary">
            {loadingUpdate && (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            )}{' '}
            Update Fundraiser
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

EditFundraiserScreen.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default EditFundraiserScreen;
