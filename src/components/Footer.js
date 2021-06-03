import React from 'react';
import {
  Col, Container, Image, Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer>
    <Container className="py-5">
      <Row>
        <Col xs={12} sm={6}>
          <Image src="/images/logo.png" alt="logo" />
        </Col>
        <Col xs={12} sm={3}>
          <h4>
            <strong>Learn More</strong>
          </h4>
          <ul className="list-unstyled">
            <li>
              <a href="https://facebook.com">Common questions</a>
            </li>
            <li>
              <a href="https://facebook.com">Success stories</a>
            </li>
            <li>
              <a href="https://facebook.com">Supported cities</a>
            </li>
          </ul>
        </Col>
        <Col xs={12} sm={3}>
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
