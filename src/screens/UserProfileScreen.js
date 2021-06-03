import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Button, Col, Container, Form, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUserProfile } from '../actions/userActions';
import Loader from '../components/Loader';
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
      history.push('/login');
    } else if (user.name) {
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
          <h2>User Profile</h2>
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
          {loading && <Loader />}
          <Form onSubmit={submitHandler} className="py-3">
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="email" className="py-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control autoComplete="off" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="confirmPassword" className="py-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control autoComplete="off" type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
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
