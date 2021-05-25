import React from 'react';
import {
  Container,
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';

const Header = () => (
  <header>
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <Navbar.Brand
          href="#"
          style={{ textTransform: 'capitalize' }}
        >
          SaveABuiz
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mr-auto my-2 my-lg-0" navbarScroll>
            <NavDropdown
              title="Discover"
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="#action3">
                Fundraisers
              </NavDropdown.Item>
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
            <Nav.Link href="#">Sign in</Nav.Link>
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

export default Header;
