/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import {
  Button, Col, Container, Form, Row,
} from 'react-bootstrap';
import Skeleton from '@material-ui/lab/Skeleton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'yup-phone';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUserProfile, updateUserPassword } from '../actions/userActions';
import Message from '../components/Message';

const userProfileSchema = yup.object().shape({
  name: yup.string().required('Please enter a valid name.'),
  email: yup.string().email().required('Please enter a valid email address.'),
  mobilePhoneNumber: yup.string().phone().required('Please enter a valid mobile phone number.'),
});

const userPasswordSchema = yup.object().shape({
  currentPassword: yup.string().required('Please enter your current password.'),
  newPassword: yup.string().required('Please enter the new password you want to use.'),
  confirmNewPassword: yup.string().oneOf([yup.ref('newPassword'), null]),
});

const UserProfileScreen = ({ history }) => {
  const {
    register: registerUpdateUserProfile,
    handleSubmit: handleSubmitUserProfileUpdate,
    formState: { errors: updateUserProfileErrors },
    setValue: setUpdateUserProfileFormValue,
  } = useForm({
    resolver: yupResolver(userProfileSchema),
  });

  const {
    register: registerUpdateUserPassword,
    handleSubmit: handleSubmitUserPasswordUpdate,
    formState: { errors: updateUserPasswordErrors },
  } = useForm({
    resolver: yupResolver(userPasswordSchema),
  });

  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, user } = userProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success: isUserProfileUpdateSuccessful } = userUpdateProfile;

  const userUpdatePassword = useSelector((state) => state.userUpdatePassword);
  const { success: isUserPasswordUpdateSuccessful } = userUpdatePassword;

  useEffect(() => {
    if (!(!!userInfo?.token && !!userInfo?.user)) {
      history.push('/sign-in');
    } else if (user.name && user.email && user.mobilePhoneNumber) {
      setUpdateUserProfileFormValue('name', user.name);
      setUpdateUserProfileFormValue('email', user.email);
      setUpdateUserProfileFormValue('mobilePhoneNumber', user.mobilePhoneNumber);
    } else {
      dispatch(getUserProfile());
    }
  }, [history, userInfo, user]);

  const submitUpdateUserProfileForm = (data) => {
    dispatch(updateUserProfile(data));
  };

  const submitUpdateUserPasswordForm = (data) => {
    dispatch(updateUserPassword(data));
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col xs={12} sm={7}>
          <h2 className="mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
            </svg>
            {' '}
            User Profile
          </h2>
          {error && (
          <Message variant="danger">
            {error}
          </Message>
          )}
          {isUserProfileUpdateSuccessful && (
          <Message variant="success">
            User profile updated successfully.
          </Message>
          )}

          <Form
            noValidate
            onSubmit={handleSubmitUserProfileUpdate(submitUpdateUserProfileForm)}
            className="my-3"
          >
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              { loading ? <Skeleton variant="text" />
                : <Form.Control type="text" name="name" placeholder="Enter name" {...registerUpdateUserProfile('name')} isInvalid={!!updateUserProfileErrors.name?.message} />}
              <Form.Control.Feedback type="invalid">
                {updateUserProfileErrors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="email" className="my-3">
              <Form.Label>Email Address</Form.Label>
              { loading ? <Skeleton variant="text" />
                : <Form.Control type="email" name="email" placeholder="Enter email" {...registerUpdateUserProfile('email')} isInvalid={!!updateUserProfileErrors.email?.message} />}
              <Form.Control.Feedback type="invalid">
                {updateUserProfileErrors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="mobilePhoneNumber" className="my-3">
              <Form.Label>Mobile Phone Number</Form.Label>
              { loading ? <Skeleton variant="text" />
                : <Form.Control type="mobilePhoneNumber" name="mobilePhoneNumber" placeholder="Enter mobile phone number" {...registerUpdateUserProfile('mobilePhoneNumber')} isInvalid={!!updateUserProfileErrors.mobilePhoneNumber?.message} />}
              <Form.Control.Feedback type="invalid">
                Please enter a valid mobile phone number.
              </Form.Control.Feedback>
            </Form.Group>

            <Button className="mt-5" type="submit" variant="outline-primary">Update Profile</Button>
          </Form>
        </Col>

        <Col xs={12} sm={4}>
          <h2 className="mb-3">Update Password</h2>
          {error && (
          <Message variant="danger">
            {error}
          </Message>
          )}
          {isUserPasswordUpdateSuccessful && (
          <Message variant="success">
            User password updated successfully.
          </Message>
          )}

          <Form
            noValidate
            onSubmit={handleSubmitUserPasswordUpdate(submitUpdateUserPasswordForm)}
            className="py-3"
          >
            <Form.Group controlId="currentPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                name="currentPassword"
                placeholder="Enter your current password"
                {...registerUpdateUserPassword('currentPassword')}
                isInvalid={!!updateUserPasswordErrors.currentPassword?.message}
              />
              <Form.Control.Feedback type="invalid">
                {updateUserPasswordErrors.currentPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="newPassword" className="my-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                {...registerUpdateUserPassword('newPassword')}
                isInvalid={!!updateUserPasswordErrors?.newPassword}
              />
              <Form.Control.Feedback type="invalid">
                {updateUserPasswordErrors.newPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="confirmNewPassword" className="my-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                {...registerUpdateUserPassword('confirmNewPassword')}
                isInvalid={!!updateUserPasswordErrors.confirmNewPassword}
              />
              <Form.Control.Feedback type="invalid">
                {updateUserPasswordErrors.confirmNewPassword && 'Passwords must match. Please enter the same password in new and confirm password.'}
              </Form.Control.Feedback>
            </Form.Group>

            <Button className="mt-5" type="submit" variant="outline-primary">Update Password</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

UserProfileScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default UserProfileScreen;
