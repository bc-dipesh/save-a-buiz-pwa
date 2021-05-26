import React from 'react';
import Spinner from 'react-bootstrap/Alert';

const Loader = () => (
  <Spinner animation="border"><span className="sr-only">Loading...</span></Spinner>
);

export default Loader;
