import React from 'react';
import PropTypes from 'prop-types';
import './Skeleton.css';

const Skeleton = ({ type }) => {
  const classes = `skeleton ${type}`;
  return <div className={classes} />;
};

Skeleton.propTypes = {
  type: PropTypes.string,
};

export default Skeleton;
