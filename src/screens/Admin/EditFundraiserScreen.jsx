/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from '@hookform/resolvers/yup';
import { Button as SnackbarButton } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Button, Container, Form, InputGroup, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import { listFundraiserDetails, updateFundraiser } from '../../actions/fundraiserActions';
import {
  closeSnackbar as closeSnackbarAction,
  enqueueSnackbar as enqueueSnackbarAction,
} from '../../actions/snackbarActions';
import useFundraiserDelete from '../../hooks/useFundraiserDelete';
import { checkIsInternetConnected } from '../../utils/commonFunctions';
import { urlRegEx } from '../../utils/regex';

const fundraiserEditSchema = yup.object().shape({
  title: yup.string().required('Please enter the fundraiser title'),
  location: yup.string().required('Please enter the fundraiser location.'),
  goal: yup
    .number()
    .typeError('Please enter a valid number for the fundraiser goal amount.')
    .required('Please enter the fundraiser goal.'),
  description: yup.string().required('Please describe about the fundraiser.'),
  shortDescription: yup
    .string()
    .required('Please provide a short description about the fundraiser.'),
  youTubeVideoLink: yup.string().matches(urlRegEx, 'Please enter a valid link.').required(),
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
  const { success: successDelete, handleDelete } = useFundraiserDelete();

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
          <SnackbarButton className="snackbar-btn" onClick={() => closeSnackbar(key)}>
            dismiss
          </SnackbarButton>
        ),
      },
    });
  };

  useEffect(() => {
    if (successUpdate) {
      displaySnackbar('Fundraiser successfully updated.');
      history.push('/admin/list-fundraiser');
    } else if (fundraiser?._id === fundraiserId) {
      setValue('location', fundraiser.location);
      setValue('title', fundraiser.title);
      setValue('goal', fundraiser.goal);
      setValue('description', fundraiser.description);
      setValue('shortDescription', fundraiser.shortDescription);
      setValue('youTubeVideoLink', fundraiser.youTubeVideoLink);
    } else {
      dispatch(listFundraiserDetails(fundraiserId));
    }
    if (error || errorUpdate) {
      displaySnackbar(error || errorUpdate, 'error');
    }
    if (successDelete) {
      history.push('/admin/list-fundraiser');
    }
  }, [dispatch, fundraiser, fundraiserId, error, successUpdate, errorUpdate, successDelete]);

  const submitFundraiserUpdateForm = async (data) => {
    if (await checkIsInternetConnected()) {
      dispatch(updateFundraiser(data, fundraiserId));
    } else {
      displaySnackbar('No internet. Please check your internet connection and try again', 'info');
    }
  };

  const deleteFundraiser = () => {
    handleDelete(fundraiserId);
  };

  return (
    <Container>
      <Link to="/admin/list-fundraiser" className="btn btn-outline-primary mt-5">
        Go Back
      </Link>
      <h1 className="my-3">{fundraiser.title}</h1>
      <p className="text-muted">Organized by: {fundraiser.organizer?.name}</p>
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
              rows={10}
              {...register('description')}
              isInvalid={!!errors.description?.message}
            />
          )}
          <Form.Control.Feedback type="invalid">
            {errors.description?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="fundraiserShortDescription" className="mb-4">
          <Form.Label>Short Description</Form.Label>
          {loading || loadingUpdate ? (
            <Skeleton type="text" />
          ) : (
            <Form.Control
              name="shortDescription"
              as="textarea"
              rows={5}
              {...register('shortDescription')}
              isInvalid={!!errors.shortDescription?.message}
            />
          )}
          <Form.Control.Feedback type="invalid">
            {errors.shortDescription?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="fundraisingYouTubeVideoLink" className="mb-4">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-link-45deg"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                  <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                </svg>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              name="youTubeVideoLink"
              type="text"
              placeholder="Add a YouTube link"
              {...register('youTubeVideoLink')}
              isInvalid={!!errors.youTubeVideoLink?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.youTubeVideoLink?.message}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Button type="submit" variant="outline-primary">
          {loadingUpdate && (
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          )}{' '}
          Update Fundraiser
        </Button>
      </Form>
      <Button onClick={deleteFundraiser} className="mt-3" variant="outline-danger">
        Delete Fundraiser
      </Button>
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
