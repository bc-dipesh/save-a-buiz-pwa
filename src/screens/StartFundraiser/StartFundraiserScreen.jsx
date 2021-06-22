/* eslint-disable react/jsx-props-no-spreading */
import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button as SnackbarButton } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { checkIsInternetConnected } from '../../utils/commonFunctions';
import { FUNDRAISER_CREATE_RESET } from '../../constants/fundraiserConstants';
import { createFundraiser } from '../../actions/fundraiserActions';
import {
  closeSnackbar as closeSnackbarAction,
  enqueueSnackbar as enqueueSnackbarAction,
} from '../../actions/snackbarActions';
import { urlRegEx } from '../../utils/regex';

const fundraiserSchema = yup.object().shape({
  title: yup.string().required('Please enter your fundraiser title'),
  location: yup.string().required('Please enter your fundraiser location.'),
  goal: yup
    .number()
    .typeError('Please enter a valid number for your fundraiser goal amount.')
    .required('Please enter your fundraiser goal.'),
  description: yup.string().required('Please describe about your fundraiser.'),
  image: yup.string().required('Please provide a image that describes your story.'),
  youTubeVideoLink: yup.string().matches(urlRegEx, 'Please enter a valid link.').required(),
});

const StartFundraiserScreen = ({ history }) => {
  const API_END_POINT =
    'https://save-a-buiz-api.herokuapp.com/api/v1/file-uploads/fundraiser-image';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(fundraiserSchema),
  });

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

  const [isImageUploading, setIsImageUploading] = useState(false);

  const imageUploadHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setIsImageUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const {
        data: { data },
      } = await axios.post(`${API_END_POINT}`, formData, config);
      setValue('image', data);
      setIsImageUploading(false);
    } catch (error) {
      setIsImageUploading(false);
      displaySnackbar(error, 'error');
    }
  };

  const { loading, error, fundraiser } = useSelector((state) => state.fundraiserCreate);

  useEffect(() => {
    if (fundraiser) {
      dispatch({ type: FUNDRAISER_CREATE_RESET });
      displaySnackbar('Your fundraiser has been successfully created.');
      history.push(`fundraisers/${fundraiser._id}`);
    }
    if (error) {
      displaySnackbar(error, 'error');
    }
  }, [fundraiser, error, dispatch]);

  const submitCreateFundraiserForm = async (data) => {
    if (await checkIsInternetConnected()) {
      dispatch(createFundraiser(data));
    } else {
      displaySnackbar('No internet. Please check your internet connection and try again', 'info');
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <h1 className="mb-3">Start a Fundraiser</h1>
        <Form noValidate onSubmit={handleSubmit(submitCreateFundraiserForm)}>
          <Form.Group controlId="address" className="mb-4">
            <Form.Label>Where do you live?</Form.Label>
            <Form.Control
              name="location"
              type="text"
              placeholder="Ex: Sahayoginagar - 32, Kathmandu"
              {...register('location')}
              isInvalid={!!errors.location?.message}
            />
            <Form.Control.Feedback type="invalid">{errors.location?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="fundraisingTitle" className="mb-4">
            <Form.Label>What is your fundraiser title?</Form.Label>
            <Form.Control
              name="title"
              type="text"
              placeholder="Ex: Help Hari Reopen His Restaurant"
              {...register('title')}
              isInvalid={!!errors.title?.message}
            />
            <Form.Control.Feedback type="invalid">{errors.location?.message}</Form.Control.Feedback>
            <Form.Text className="text-muted">
              Try to include the business name and the purpose.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="fundraisingGoal" className="mb-4">
            <Form.Label>Set your fundraising goal</Form.Label>
            <Form.Control
              name="goal"
              type="number"
              placeholder="Ex: 50,000"
              {...register('goal')}
              isInvalid={!!errors.goal?.message}
            />
            <Form.Control.Feedback type="invalid">{errors.goal?.message}</Form.Control.Feedback>
            <Form.Text className="text-muted">
              Keep in mind that transaction fees, including credit and debit charges, are deducted
              from each donation.
              <br />
              To receive money raised, please make sure the person withdrawing has:
              <ul>
                <li>A Citizenship</li>
                <li>A Bank account</li>
                <li>A Company PAN number</li>
              </ul>
              You can always change your goal amount later. If you&apos;re not sure where to start,
              start with the minimum goal that can get your business back to working state.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="fundraisingCoverPhoto" className="mb-4">
            <Form.Label>Add a cover photo and YouTube video link</Form.Label>
            <Form.File
              label="A high-quality photo or video will help tell your story and build trust with donors."
              onChange={imageUploadHandler}
            />
            {isImageUploading && <Skeleton variant="text" />}
            <Form.Control.Feedback type="invalid">{errors.image?.message}</Form.Control.Feedback>
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
          <Form.Group controlId="fundraisingDescription" className="mb-4">
            <Form.Label>Describe your story</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              rows={3}
              {...register('description')}
              isInvalid={!!errors.description?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description?.message}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Explain about your business, who you are and why you&apos;re fundraising.
              <br />
              To raise the most money for a campaign, make sure you:
              <ul>
                <li>Describe the business that will benefit</li>
                <li>Detail what the funds will be used for</li>
                <li>Explain how soon you need the funds</li>
                <li>Talk about what the support will mean to you and the business</li>
                <li>Share how grateful you will be for help</li>
              </ul>
            </Form.Text>
          </Form.Group>

          <Button className="mb-4" variant="outline-primary" type="submit">
            {loading && (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            )}{' '}
            Submit
          </Button>
          <Form.Group>
            <Form.Text className="text-muted">
              By submitting this form, you agree to the SaveABuiz terms and privacy policy.
            </Form.Text>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
};

StartFundraiserScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default StartFundraiserScreen;
