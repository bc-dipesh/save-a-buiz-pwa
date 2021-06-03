import React from 'react';
import {
  Container, Row, Col, Image,
} from 'react-bootstrap';

const AboutScreen = () => (
  <Container className="py-5">
    <Row>
      <h1 className="py-3">About SaveABuiz</h1>
      <p>
        The impact of the coronavirus has extended far beyond those
        who have become infected. Entire communities now face emergency
        lockdowns, and over
        {' '}
        <strong>500,000</strong>
        {' '}
        cases of COVID has been recorded
        (Ministry of Health and Population, Nepal, 2021).
      </p>
      <p>
        With such a staggering number of people in quarantine and
        more becoming sick, needs quickly mount. Everything from basics, like
        food to emergency financial assistance to pay for things like rent
        is urgently needed as people experience lost wages due to illness
        or quarantine restrictions. For those who are already sick,
        paying medical bills has become an additional burden.
      </p>
      <p>
        Thousands of small business affected by the coronavirus are now
        suffering severe economic hardship because of the outbreak.
        Starting afundraiser for your favorite local restaurant, bar,
        coffee shop, or boutique is one way to help business owners as well
        as service industry workers. SaveABuiz is a platform specially
        made for helping these businesses. Even though we cannot leave home,
        we can still support local restaurants by starting a fundraiser for
        them and donate them.
      </p>
    </Row>
    <Row>
      <Col>
        <Image src="/images/mapOfNepal.png" alt="Map of nepal showing supported provinces" />
      </Col>
      <Col>
        By
        {' '}
        <a
          href="https://commons.wikimedia.org/wiki/User:Nirjal_stha"
          title="
        User:Nirjal stha"
        >
          Nirjal stha
        </a>
        {' '}
        -
        {' '}
        <span
          className="int-own-work"
          lang="en"
        >
          Own work
        </span>
        ,
        {' '}
        <a href="https://creativecommons.org/licenses/by-sa/4.0" title="Creative Commons Attribution-Share Alike 4.0">CC BY-SA 4.0</a>
        ,
        {' '}
        <a href="https://commons.wikimedia.org/w/index.php?curid=35222160">Link</a>
      </Col>
    </Row>

  </Container>
);

export default AboutScreen;
