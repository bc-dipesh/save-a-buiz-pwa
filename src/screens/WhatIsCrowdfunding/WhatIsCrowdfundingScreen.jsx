import React from 'react';
import {
	Accordion,
	Button,
	Card,
	Col,
	Container,
	Image,
	Row,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const WhatIsCrowdfundingScreen = () => (
	<>
		<Container className="mt-5">
			<Row>
				<Col xs={12} sm={7}>
					<h1 className="pb-3">
						What Is Crowdfunding? The Clear and Simple Answer
					</h1>
					<p>
						Crowdfunding harness the power of social networks and
						the Internet to give people the means to raise funds,
						help others overcome hardship, and meet aspirational
						goals. The core principle behind the Crowdfunding
						definition is that you can help a friend or help an
						entire community. You can do everything from pay for
						your own surgery to fulfill a student&apos;s dream of
						attending college-and so much more.
					</p>
					<p>
						If you&apos;ve never found yourself wondering &quot;What
						is crowdfunding?&quot; &quot;What does crowdfunding
						mean?&quot; or, &quot;What are the benefits of
						&quot;crowdfunding?&quot; then keep reading. We&apos;ll
						answer your questions about crowdfunding and give you
						top tips on how to bring in donations.
					</p>
				</Col>
				<Col xs={12} sm={5}>
					<Image
						src="/images/fundraising.png"
						alt="Illustration of fundraising"
						fluid
					/>
				</Col>
				<Col className="mt-5">
					<LinkContainer to="/start-fundraiser">
						<Button variant="outline-primary">
							Start Crowdfunding
						</Button>
					</LinkContainer>
				</Col>
			</Row>
		</Container>
		<Container
			className="py-5 my-5"
			style={{ backgroundColor: '#fbf8f6' }}
			fluid
		>
			<Container>
				<Row>
					<h2>The rise of crowdfunding</h2>
					<p>
						In recent years, crowdfunding has transformed the
						traditions fundraising landscape, breaking down barriers
						between those in need and those available to help them.
						Crowdfunding has made it possible for people to offer
						direct support to those who need emergency financial
						assistance, contributing to the larger trend of
						individual giving. In 2019, charitable giving by
						individuals grew by 4.7% for a total of USD309.66
						billion, outspacing giving by both corporations and
						foundations.
					</p>
					<p>
						People often turn to crowdfunding when they can&apos;t
						afford the rapidle increasing cost of medical care, or
						when they lack insurance to cover major medical
						procedures and have to pay out-of-pocket costs.
					</p>
				</Row>
			</Container>
		</Container>
		<Container>
			<Row>
				<h2 className="py-3">
					What are the advantages of crowdfunding?
				</h2>
				<p>
					When funding from the government and nonprofits falls short,
					many people turn to crowdfunding, meaning that they will
					rely on the kindness of their community. Online fundraising
					removes the traditional barriers that typically exist when
					asking for support, making it simple to overcome financial
					obstacles quickly or raise money for a worthy cause. For
					those looking for crowdfunding basics, here are some of the
					main advantages of crowdfunding:
				</p>
				<ul>
					<li>There is no application process.</li>
					<li>
						There are no long wait periods to receive your funds.
					</li>
					<li>
						Crowdfunding takes the fear out of asking for financial
						help. It&apos;s simple to share your fundraiser with
						your network of friends and family members on social
						media.
					</li>
					<li>
						Crowdfunding makes it easy to reach people outside of
						your network.
					</li>
				</ul>
				<p>
					Below, we answer the questions people most often have about
					crowdfunding when they&apos;re trying to decide if they want
					to start an online fundraiser.
				</p>
			</Row>
		</Container>
		<Container
			className="py-5 my-5"
			style={{ backgroundColor: '#fbf8f6' }}
			fluid
		>
			<Container>
				<Row>
					<h2 className="py-3">
						Four of the most common questions about crowdfunding
					</h2>
					<Accordion>
						<Card className="common-questions">
							<Accordion.Toggle as={Card.Header} eventKey="0">
								1. How do I know if crowdfunding is right for
								me?
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="0">
								<Card.Body>
									<p>
										The best way to have crowdfunding
										explained is to understand that it can
										work for anybody, and there is no cause
										too big or too small for crowdfunding.
										Because of this, it can be hard to
										define crowdfunding. Some people might
										worry that their fundraiser isn&apos;t
										as worthy as others-but the beauty of
										crowdfunding is that it exists to help
										an array of people and needs. Whether
										you want to help your pet, raise money
										to save a business from bankruptcy, or
										get help with bills, crowdfunding can
										allow you to overcome the financial
										barriers that may stand in the way.
									</p>
									<p>
										While most people think crowdfunding
										services are only for individuals who
										need emergency financial assistance,
										businesses looking to fund a new project
										or raise capital can also fundraise
										online. Entrepreneurs can even use
										crowdfunding to finance projects or a
										new creative idea.
									</p>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
						<Card className="common-questions">
							<Accordion.Toggle as={Card.Header} eventKey="1">
								2. What are the different types of crowdfunding?
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="1">
								<Card.Body>
									<p>
										<strong>
											Donation-based crowdfunding:{' '}
										</strong>
										This type of crowdfunding is one of the
										most commone when looking up &apos;What
										is a crowdfunding campaign.&apos; In
										donation-based crowdfunding, people
										search for and support a cause by
										donating to it without receiving
										anything in return. The person running
										the fundraiser isn’t obligated to pay
										back donors or give them anything else
										in return for their contributions.
										SaveABuiz is also one of the major
										crowdfunding sites that uses
										donation-based crowdfunding.
									</p>
									<p>
										<strong>
											Equity-based crowdfunding:{' '}
										</strong>
										In equity-based fundraising, the
										fundraiser organizer accepts money from
										people looking to invest, typically to
										help launch a business. In return,
										investors will receive a small piece of
										equity in the business or company.
									</p>
									<p>
										<strong>Rewards-based</strong>: Through
										rewards-based crowdfunding on platforms
										like Indiegogo and Kickstarter, the
										organizer of the fundraiser provides a
										reward or products to donors, usually a
										service or physical item, in exchange
										for a contribution.
									</p>
									<p>
										<strong>
											Note: SaveABuiz only allows
											donation-based crowdfunding.
										</strong>
									</p>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
						<Card className="common-questions">
							<Accordion.Toggle as={Card.Header} eventKey="2">
								3. Is it okay to raise money for myself?
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="2">
								<Card.Body>
									<p>
										Absolutely. Thousands of people start
										online fundraisers every day to raise
										money for themselves. It&apos;s
										understandable that you might be nervous
										about asking for money. But it&apos;s
										important to remember that nearly
										everyone has experienced financial
										hardship at one point or another. You
										might be surprised by the number of
										people who want to support you when you
										need it most.
									</p>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
						<Card className="common-questions">
							<Accordion.Toggle as={Card.Header} eventKey="3">
								4. What is the best way to get more donations?
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="3">
								<Card.Body>
									<p>
										While there&apos;s no magic formula for
										receiving donations, there are
										definitely steps you can take to set
										yourself up for success. The most
										important thing you can do is create a
										compelling fundraiser and build a
										community that empathizes with your
										cause. Investing the time into your
										fundraiser story will inspire your
										network of friends and family to take
										action. For specific tips on how you can
										create an engaging fundraiser and share
										it far and wide, read on.
									</p>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					</Accordion>
				</Row>
			</Container>
		</Container>
	</>
);

export default WhatIsCrowdfundingScreen;
