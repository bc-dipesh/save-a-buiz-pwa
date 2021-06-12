import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Button, Container,
  Form,
  FormControl,
  Image, Nav, Navbar,
  NavDropdown,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Route } from 'react-router-dom';
import { logout } from '../actions/userActions';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const searchFundraiser = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/fundraisers');
    }
  };

  return (
    <Form className="d-flex ms-auto" onSubmit={searchFundraiser}>
      <FormControl
        type="search"
        placeholder="Enter fundraiser title"
        className="mr-2"
        aria-label="Search"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button type="submit" variant="outline-dark">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </Button>
    </Form>
  );
};

const LoggedInUserLinks = ({ history, name, email }) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/sign-in');
  };

  return (
    <NavDropdown
      title={name}
      id={email}
    >
      <LinkContainer to="/user/fundraisers">
        <NavDropdown.Item>
          Your fundraisers
        </NavDropdown.Item>
      </LinkContainer>
      <NavDropdown.Item>
        Donations you&apos;ve made
      </NavDropdown.Item>
      <LinkContainer to="/user/profile">
        <NavDropdown.Item>
          Account settings
        </NavDropdown.Item>
      </LinkContainer>
      <LinkContainer to="/start-fundraiser">
        <NavDropdown.Item>
          Start a new fundraiser
        </NavDropdown.Item>
      </LinkContainer>
      <NavDropdown.Item onClick={logoutHandler}>
        Logout
      </NavDropdown.Item>
    </NavDropdown>
  );
};

const LoggedOutUserLinks = () => <LinkContainer to="/sign-in"><Nav.Link>Sign in</Nav.Link></LinkContainer>;

const AdminUserLinks = () => (
  <NavDropdown title="Admin Panel" id="adminMenu">
    <LinkContainer to="/admin/user-list">
      <NavDropdown.Item>Users</NavDropdown.Item>
    </LinkContainer>
    <LinkContainer to="/admin/fundraiserList">
      <NavDropdown.Item>Fundraisers</NavDropdown.Item>
    </LinkContainer>
  </NavDropdown>
);

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const isUserLoggedIn = () => userInfo;
  const isUserAdmin = () => userInfo.isAdmin;

  return (
    <header>
      <Navbar variant="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand
              style={{ textTransform: 'capitalize' }}
            >
              <Image src="/images/logo.png" alt="logo" />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="mr-auto my-2 my-lg-0" navbarScroll>
              <NavDropdown
                title="Discover"
                id="navbarScrollingDropdown"
              >
                <LinkContainer to="/fundraisers">
                  <NavDropdown.Item>
                    Fundraisers
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item href="#action4">
                  Success Stories
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="How it works"
                id="navbarScrollingDropdown"
              >
                <LinkContainer to="/how-it-works">
                  <NavDropdown.Item>
                    How SaveABuiz works ?
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/what-is-crowdfunding">
                  <NavDropdown.Item>
                    What is crowdfunding ?
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              {isUserLoggedIn()
                ? (
                  <Route
                    render={({ history }) => (
                      <LoggedInUserLinks
                        history={history}
                        name={userInfo.name}
                        email={userInfo.email}
                      />
                    )}
                  />
                )
                : <LoggedOutUserLinks />}
              {isUserLoggedIn() && isUserAdmin() && <AdminUserLinks />}
            </Nav>
            <Route render={({ history }) => <SearchBox history={history} />} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

SearchBox.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

LoggedInUserLinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  name: PropTypes.string,
  email: PropTypes.string,
};

export default Header;
