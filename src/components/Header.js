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

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

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
              {userInfo
                ? (
                  <NavDropdown
                    title={userInfo.name}
                    id={userInfo.email}
                  >
                    <LinkContainer to="/users/profile">
                      <NavDropdown.Item>
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                )
                : <LinkContainer to="/sign-in"><Nav.Link>Sign in</Nav.Link></LinkContainer>}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin Panel" id="adminMenu">
                  <LinkContainer to="/admin/user-list">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/fundraiserList">
                    <NavDropdown.Item>Fundraisers</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
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

export default Header;
