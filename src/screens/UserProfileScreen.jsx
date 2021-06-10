import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Button, Col, Container, Form, Row,
} from 'react-bootstrap';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUserProfile } from '../actions/userActions';
import Message from '../components/Message';

const UserProfileScreen = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, user } = userProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/sign-in');
    } else if (user.name === userInfo.name) {
      setName(user.name);
      setEmail(user.email);
    } else {
      dispatch(getUserProfile('profile'));
    }
  }, [history, userInfo, user]);

  const checkPassword = () => password === confirmPassword;

  const submitHandler = (e) => {
    e.preventDefault();
    if (!checkPassword()) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({
        _id: user._id, name, email, password,
      }));
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={3}>
          <h2>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
            </svg>
            {' '}
            User Profile
          </h2>
          {message && (
          <Message variant="danger">
            {message}
          </Message>
          )}
          {error && (
          <Message variant="danger">
            {error}
          </Message>
          )}
          {success && (
          <Message variant="success">
            User profile updated
          </Message>
          )}
          <Form onSubmit={submitHandler} className="py-3">
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              { loading ? <Skeleton variant="text" />
                : <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />}
            </Form.Group>
            <Form.Group controlId="email" className="py-3">
              <Form.Label>Email Address</Form.Label>
              { loading ? <Skeleton variant="text" />
                : <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />}
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              { loading ? <Skeleton variant="text" />
                : <Form.Control autoComplete="off" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />}
            </Form.Group>
            <Form.Group controlId="confirmPassword" className="py-3">
              <Form.Label>Confirm Password</Form.Label>
              { loading ? <Skeleton variant="text" />
                : <Form.Control autoComplete="off" type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /> }
            </Form.Group>
            <Button className="mt-5" type="submit" variant="outline-primary">Update Profile</Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2>Donations</h2>
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
