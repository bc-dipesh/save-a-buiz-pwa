import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loader = () => (
  <Spinner
    animation="border"
    role="status"
    style={{
      margin: 'auto',
      display: 'block',
    }}
  >
    <span className="sr-only">Loading...</span>
  </Spinner>
);

export default Loader;
