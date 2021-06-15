import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FormContainer = ({ children }) => (
	<Container>
		<Row className="justify-content-md-center py-5">
			<Col xs={12} md={6}>
				{children}
			</Col>
		</Row>
	</Container>
);

FormContainer.propTypes = {
	children: PropTypes.arrayOf(PropTypes.any),
};

export default FormContainer;
