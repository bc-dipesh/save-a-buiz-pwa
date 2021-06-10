import React from 'react';
import {
  Accordion, Card, Container, Image, Row,
} from 'react-bootstrap';

const CommonQuestionScreen = () => (
  <>
    <Container className="my-5">
      <Row>
        <h1 className="pb-3">Answers to Common Fundraising Questions</h1>
        <p>
          Learn more about fundraising, donating, or receiving
          dontaions.
        </p>
      </Row>
    </Container>
    <Container>
      <Image src="/images/common-questions.png" alt="demonstration of questioning and answering" fluid />
    </Container>
    <Container className="py-5 my-5" style={{ backgroundColor: '#fbf8f6' }} fluid>
      <Container>
        <Row>
          <h2 className="py-3">Questions about fundraising</h2>
          <Accordion>
            <Card className="common-questions">
              <Accordion.Toggle as={Card.Header} eventKey="0">
                How does SaveABuiz work?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <p>
                    You start your SaveABuiz by telling your story and setting a goal.
                    You will then receive a fundraising page to accept donations and share your
                    campaign. Signing up is easy and every donation is yours to keep, whether
                    or not you reach your goal.
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="common-questions">
              <Accordion.Toggle as={Card.Header} eventKey="1">
                What can I raise money for?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <p>
                    SaveABuiz which is the short form for save a business is here to help you raise
                    money only for businesses.
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="common-questions">
              <Accordion.Toggle as={Card.Header} eventKey="2">
                How does SaveABuiz keep campaigns safe?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <p>
                    SaveABuiz features the very best in secure payment encryption technology. Your
                    donor&apos;s online payments are safe, and your money is stored securely until
                    you&apos;re ready to request a withdrawal via electronic bank transfer.
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="common-questions">
              <Accordion.Toggle as={Card.Header} eventKey="3">
                How do I withdraw funds from my campaign?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  <p>
                    Once your SaveABuiz starts receiving online donations, you can easily request a
                    withdrawal at any time. Withdrawing money does not affect the progress meter
                    displayed on your compaign. Simply click &apos;Withdraw&apos; while logged into
                    your account and follow the instructions. You can withdraw your balance directly
                    to your bank account. Bank transfers take 2-5 business days to arrive.
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="common-questions">
              <Accordion.Toggle as={Card.Header} eventKey="4">
                Can a friend or the business owner withdraw the money I raise for them?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="4">
                <Card.Body>
                  <p>
                    Yes. SaveABuiz makes it easy for another friend or family member to
                    securely access the funds you have raised. Through SaveABuiz, they
                    will receive direct access to the money you have raised. Please
                    note: You will not be able to enter their bank information during
                    the withdrawal process; they will need to do this themselves.
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="common-questions">
              <Accordion.Toggle as={Card.Header} eventKey="5">
                Are there any deadlines or time limits?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="5">
                <Card.Body>
                  <p>
                    While there are important withdrawals deadlines you&apos;ll need
                    to observe to avoid donations being refunded to donors, your
                    fundraiser will remain live until you choose to turn off donations
                    or remove the campaign altogether. Most organizers leave their
                    campaigns active indefinitely to refer back to the kind comments
                    and support they received.
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="common-questions">
              <Accordion.Toggle as={Card.Header} eventKey="6">
                What if I don&apos;t reach my goal?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="6">
                <Card.Body>
                  <p>
                    No problem. Reaching your goal is not required. With SaveABuiz, you
                    keep each and every donation you receive. Your campaign will be able
                    to accept donations even after your goal is reached. Once the goal
                    is reached, the progress meter on your campaign will show that you
                    have received more than your goal amount. If you&apos;d like to
                    continue raising money, you can keep your campaign running for as
                    long as you&apos;d like.
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="common-questions">
              <Accordion.Toggle as={Card.Header} eventKey="7">
                How do I get donations?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="7">
                <Card.Body>
                  <p>
                    SaveABuiz provides an easy way to raise money from your friends,
                    family, and online community. Our platform makes it simple to
                    share your campaign in a variety of ways to bring in donations,
                    track your progress, and post updates to engage your community.
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="common-questions">
              <Accordion.Toggle as={Card.Header} eventKey="8">
                Is my province supported?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="8">
                <Card.Body>
                  <p>
                    Review our list of supported provinces to ensure that your province
                    is supported.
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Row>
      </Container>
    </Container>
    <Container>
      <Row>
        <h2 className="py-3">Questions about donations</h2>
        <Accordion>
          <Card className="common-questions">
            <Accordion.Toggle as={Card.Header} eventKey="0">
              What is the SaveABuiz Guarantee?
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <p>
                  We are proud to offer the first and only donor protection
                  guarantee in the industry: the SaveABuiz Guarantee. Every day,
                  thousands of people get the help they need from generous donors.
                  Our team of Trust & Safety specialists work night and day to make
                  sure that funds get to the intended recipient, every time. In the
                  rare case that something isn’t right, we will refund your donation.
                  If funds aren&apos;t delivered to the right person, we will donate
                  the missing amount.
                </p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card className="common-questions">
            <Accordion.Toggle as={Card.Header} eventKey="1">
              How is my donation protected?
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <p>
                  The SaveABuiz Guarantee protects your donation. It takes a leap of faith to
                  help someone else. That&apos;s why we make sure to honor your generosity by
                  backing it up with the first and only guarantee for online fundraising. In
                  the rare case that something isn&apos;t right, we will refund your donation.
                </p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Row>
    </Container>

    <Container className="py-5 my-5" style={{ backgroundColor: '#fbf8f6' }} fluid>
      <Container>
        <Row>
          <h2 className="py-3">Questions about receiving donations</h2>
          <Accordion>
            <Card className="common-questions">
              <Accordion.Toggle as={Card.Header} eventKey="0">
                Can someone set up a campaign for my business?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <p>
                    Absolutely. With SaveABuiz, organizers can easily raise money for
                    your business and even make sure that donations go directly to
                    your bank account.
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="common-questions">
              <Accordion.Toggle as={Card.Header} eventKey="1">
                How will I receive the donated funds?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <p>
                    SaveABuiz gets your funds to you quickly because we know that many
                    fundraising needs are time-sensitive. You can set up withdrawals and
                    add your bank account as soon as you accept the campaign organizer&apos;s
                    invitation to make you a beneficiary. Bank transfers then take 2-5 business
                    days to arrive.
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

export default CommonQuestionScreen;
