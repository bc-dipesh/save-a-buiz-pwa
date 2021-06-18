import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PageNotFoundScreen = () => (
	<Container className="my-5">
		<Row className="justify-content-center align-items-center">
			<h1>Page Not Found</h1>
			<p className="my-4">
				Unfortunately the page you&apos;re looking for doesn&apos;t
				exist (anymore) or there was an error in the link you followed
				or typed.
			</p>
			<Link to="/">
				<Button variant="outline-primary">Go to Homepage</Button>
			</Link>
		</Row>
	</Container>
);

export default PageNotFoundScreen;
