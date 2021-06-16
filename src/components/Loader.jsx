import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

const Loader = () => (
  <Container>
    <Spinner
      animation="border"
      role="status"
      style={{
        margin: 'auto',
        display: 'block',
      }}
    />
  </Container>
);

export default Loader;
