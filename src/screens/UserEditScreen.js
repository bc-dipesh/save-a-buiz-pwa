import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Container, Button, Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserProfile, updateUser } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, user } = userProfile;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

  const dispatch = useDispatch();

  const checkIfUserIsEmptyOrDifferent = () => !user.name || user._id !== userId;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/user-list');
    } else if (checkIfUserIsEmptyOrDifferent()) {
      dispatch(getUserProfile(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, user, userId, successUpdate]);

  if (loading || loadingUpdate) {
    return (
      <Container>
        <Link to="/admin/user-list" className="btn btn-outline-primary my-5">
          Go Back
        </Link>
        <p>Loading...</p>
      </Container>
    );
  }
  if (!error || !errorUpdate) {
    const updateProfile = (e) => {
      e.preventDefault();
      dispatch(updateUser({
        _id: userId, name, email, isAdmin,
      }));
    };

    return (
      <Container>
        <Link to="/admin/user-list" className="btn btn-outline-primary mt-5">
          Go Back
        </Link>
        <FormContainer>
          <h1 className="mb-3">Edit User</h1>
          <Form onSubmit={updateProfile} className="py-3">
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="email" className="py-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="isAdmin">
              <Form.Label>Is Admin</Form.Label>
              <Form.Check type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
            </Form.Group>

            <Button type="submit" variant="outline-primary">Update Profile</Button>
          </Form>
        </FormContainer>
      </Container>
    );
  }
  return (
    <Container className="my-5">
      <Link to="/admin/user-list" className="btn btn-outline-primary my-3">
        Go Back
      </Link>
      <Message variant="danger">Something went wrong</Message>
      <Button variant="outline-primary" onClick={() => window.location.reload()}>Refresh page ?</Button>
    </Container>
  );
};

UserEditScreen.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default UserEditScreen;
