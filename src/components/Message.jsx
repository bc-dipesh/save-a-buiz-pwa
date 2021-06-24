import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, AlertTitle } from '@material-ui/lab';

const Message = ({ variant, title, children }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  if (show) {
    return (
      <Alert className="mb-3" severity={variant} onClose={handleClose}>
        <AlertTitle>{title}</AlertTitle>
        {children}
      </Alert>
    );
  }
  return <> </>;
};

Message.defaultProps = {
  variant: 'info',
};

Message.propTypes = {
  variant: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.string.isRequired,
};

export default Message;
