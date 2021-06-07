import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { getUserList, deleteUserById } from '../actions/userActions';
import Message from '../components/Message';

const Children = ({ loading, error, users }) => {
  const dispatch = useDispatch();

  const deleteUser = (id) => {
    dispatch(deleteUserById(id));
  };

  if (loading) {
    return 'loading...';
  }
  if (!error) {
    return (
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                      <td>{user.isAdmin ? 'Admin' : 'Regular'}</td>
                      <td>
                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                          <Button variant="light" className="btn-sm">
                            Edit
                          </Button>
                        </LinkContainer>
                        <Button variant="danger" className="btn-sm" onClick={() => deleteUser(user._id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
              }
        </tbody>
      </Table>
    );
  }
  return (
    <Container className="my-5">
      <Message variant="danger">Something went wrong</Message>
      <Button variant="outline-primary" onClick={() => window.location.reload()}>Refresh page ?</Button>
    </Container>
  );
};

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const checkIsUserAdmin = () => userInfo && userInfo.isAdmin;

  useEffect(() => {
    if (checkIsUserAdmin()) {
      dispatch(getUserList());
    } else {
      history.push('/sign-in');
    }
  }, [dispatch, userInfo, history, successDelete]);

  return (
    <Container className="mt-5">
      <h1 className="mb-5">Users</h1>
      <Children loading={loading} error={error} users={users} />
    </Container>
  );
};

Children.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.object),
};

UserListScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default UserListScreen;
