import React from 'react';
import {
  Container, Row,
} from 'react-bootstrap';

const AboutScreen = () => (
  <Container className="py-3">
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
        Starting a fundraiser for your favorite local restaurant, bar,
        coffee shop, or boutique is one way to help business owners as well
        as service industry workers. SaveABuiz is a platform specially
        made for helping these businesses. Even though we cannot leave home,
        we can still support local restaurants by starting a fundraiser for
        them and donate them.
      </p>
    </Row>
  </Container>
);

export default AboutScreen;
