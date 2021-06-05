import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import {
  Button, Col, Container, Form, Image, Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SubscribeToNewsLetterForm = () => {
  const BASE_URL = 'https://save-a-buiz-api.herokuapp.com/api/v1/subscribe-to-news-letter';

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');

  const handleNewsLetterSubscriptionRequest = async (e) => {
    try {
      e.preventDefault();
      const { data: { data } } = await axios.post(`${BASE_URL}`, { email }, axiosConfig);

      enqueueSnackbar(data, {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar(error.response.data.data, {
        variant: 'error',
      });
    }
    setEmail('');
  };
  return (
    <>
      <Form onSubmit={handleNewsLetterSubscriptionRequest}>
        <Form.Group className="my-3" controlId="formGroupEmail">
          <Form.Label>Subscribe to our news letter</Form.Label>
          <Row className="align-items-center">
            <Col className="my-3" xs={12} sm={6}><Form.Control type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} value={email} /></Col>
            <Col xs={12} sm={6}><Button variant="outline-primary" type="submit">Subscribe</Button></Col>
          </Row>
        </Form.Group>
      </Form>
    </>
  );
};

const Footer = () => (
  <footer>
    <Container className="py-5">
      <Row>
        <Col xs={12} sm={6}>
          <Image src="/images/logo.png" alt="logo" />
        </Col>

        <Col xs={12} sm={6}>
          <Row>
            <SubscribeToNewsLetterForm />
          </Row>
          <Row>
            <Col xs={12} sm={6}>
              <h4>
                <strong>Learn More</strong>
              </h4>
              <ul className="list-unstyled">
                <li>
                  <Link to="/common-questions">Common questions</Link>
                </li>
                <li>
                  <a href="https://facebook.com">Success stories</a>
                </li>
                <li>
                  <Link to="/supported-provinces">Supported provinces</Link>
                </li>
              </ul>
            </Col>
            <Col xs={12} sm={6}>
              <h4>
                <strong>Resources</strong>
              </h4>
              <ul className="list-unstyled">
                <li>
                  <a href="https://facebook.com">Help Center</a>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={4} className="flex-grow-1">
          <Row>
            <Col xs={12} sm={4}>
              &copy; 2021 SaveABuiz
            </Col>
            <Col xs={3} sm={2}>
              <a href="https://facebook.com">Terms</a>
            </Col>
            <Col xs={3} sm={2}>
              <a href="https://facebook.com">Privacy</a>
            </Col>
            <Col xs={3} sm={2}>
              <Link to="/legal">Legal</Link>
            </Col>
          </Row>
        </Col>
        <Col />
        <Col xs={12} sm={3}>
          <Row>
            <Col xs={1}>
              <a href="https://facebook.com">
                <i className="fab fa-facebook-square" />
              </a>
            </Col>
            <Col xs={1}>
              <a href="https://youtube.com">
                <i className="fab fa-youtube" />
              </a>
            </Col>
            <Col xs={1}>
              <a href="https://twitter.com">
                <i className="fab fa-twitter" />
              </a>
            </Col>
            <Col xs={1}>
              <a href="https://instagram.com">
                <i className="fab fa-instagram" />
              </a>
            </Col>
            <Col xs={1}>
              <a href="https://linkedin.com">
                <i className="fab fa-linkedin" />
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
