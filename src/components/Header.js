import React from 'react';
import {
  Button, Container,
  Form,
  FormControl, Nav, Navbar,
  NavDropdown,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand
              style={{ textTransform: 'capitalize' }}
            >
              SaveABuiz
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
                <NavDropdown.Item href="#action3">
                  How SaveABuiz works
                </NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  What is crowdfunding?
                </NavDropdown.Item>
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
            <Form className="d-flex ms-auto">
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
              />
              <Button variant="outline-dark">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
