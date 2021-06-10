import React from 'react';
import {
  Container, Row, Col, Image,
} from 'react-bootstrap';

const SupportedProvinceScreen = () => (
  <Container className="mt-5">
    <Row>
      <h1 className="mb-3">What provinces are supported on SaveABuiz?</h1>
      <p>
        There are 2 provinces currently supported by SaveABuiz. This means that
        these are the provinces that we can send funds to, and the business or
        the person owning the business withdrawing the funds must meet the
        withdrawal requirements from that country to withdraw funds.
      </p>
      <p>
        We are working to expand our services to more provinces in the future,
        but for now, your fundraiser must be created in one of the following
        provinces:
      </p>
    </Row>
    <Row style={{ backgroundColor: '#fbf8f6' }}>
      <ul className="supported-provinces">
        <li><p>Bagmati Province</p></li>
        <li><p>Lumbini Province</p></li>
      </ul>
    </Row>
    <Row className="my-5">
      <Col xs={12} sm={8}>
        <Image src="/images/save-a-buiz-supported-provinces-of-nepal.png" alt="Map of nepal showing supported provinces" fluid />
      </Col>
      <Col xs={12} sm={4}>
        By Karte:
        {' '}
        <a href="https://de.wikipedia.org/wiki/User:NordNordWest" className="extiw" title="de:User:NordNordWest">NordNordWest</a>
        , Lizenz:
        {' '}
        <a rel="nofollow" className="external text" href="https://creativecommons.org/licenses/by-sa/3.0/de/legalcode">Creative Commons by-sa-3.0 de</a>
        ,
        {' '}
        <a href="https://creativecommons.org/licenses/by-sa/3.0/de/deed.en" title="Creative Commons Attribution-Share Alike 3.0 de">CC BY-SA 3.0 de</a>
        ,
        {' '}
        <a href="https://commons.wikimedia.org/w/index.php?curid=69658520">Link</a>
        <Row className="mt-5">
          <h5 className="mb-3">Map Legend</h5>
          <Row>
            <Col><span className="square supported" /></Col>
            <Col><p>Supported</p></Col>
          </Row>
          <Row>
            <Col><span className="square not-supported" /></Col>
            <Col><p>Not Supported</p></Col>
          </Row>
        </Row>
      </Col>
    </Row>
  </Container>
);

export default SupportedProvinceScreen;
