import React from 'react';
import { Container, Row } from 'react-bootstrap';

const LegalContactInfoScreen = () => (
	<>
		<Container style={{ backgroundColor: '#fbf8f6' }} fluid>
			<Container className="py-5">
				<Row>
					<h1>Legal Contact Info</h1>
					<p>
						Contact information for law enforcement, legal counsel,
						compliance and regulatory bodies.
					</p>
				</Row>
			</Container>
		</Container>
		<Container className="mt-5">
			<Row>
				<h4>Legal Contact Directory</h4>
				<p>
					We take your legal questions and concerns very seriously at
					SaveABuiz. For a directory of who to contact for your
					specific inquiry, please review the secions below.
				</p>
			</Row>
			<Row className="my-3" />
			<Row>
				<h4>Site Issues</h4>
				<p>
					If you have a problem concerning an account, how SaveABuiz
					works or any other general issue, please visit our Help
					Center.
				</p>
				<p>
					If you are looking to get a campaign removed for fraudulent
					or untrustworthy behavior, report the campaign here.
				</p>
			</Row>
			<Row className="my-3" />
			<Row>
				<h4>Other Law-Related Questions</h4>
				<p>
					If you have other law-related questions, please send an
					email to legal@saveabuiz.com.
				</p>
			</Row>
		</Container>
	</>
);

export default LegalContactInfoScreen;
