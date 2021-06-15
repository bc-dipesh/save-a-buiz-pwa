import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

const Message = ({ variant, children }) => {
	const [show, setShow] = useState(true);

	if (show) {
		return (
			<Alert variant={variant} onClick={() => setShow(!show)}>
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
	children: PropTypes.string.isRequired,
};

export default Message;
