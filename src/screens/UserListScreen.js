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
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                          </Button>
                        </LinkContainer>
                        <Button variant="danger" className="btn-sm" onClick={() => deleteUser(user._id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                          </svg>
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
