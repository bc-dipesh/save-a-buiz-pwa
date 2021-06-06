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
      <Button type="submit" variant="outline-dark">Search</Button>
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
                    How SaveABuiz works
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/what-is-crowdfunding">
                  <NavDropdown.Item>
                    What is crowdfunding?
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              {userInfo
                ? (
                  <NavDropdown title={userInfo.name} id={userInfo.email}>
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
