import Skeleton from '@material-ui/lab/Skeleton';
import { PropTypes } from 'prop-types';
import { React } from 'react';
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Message from '../../components/Message';
import FundraiserDetail from './components/FundraiserDetail';
import useFundraiserDetail from './hooks/useFundraiserDetail';

const Children = ({ loading, error, fundraiser }) => {
  if (loading) {
    return (
      <>
        <Container>
          <Row>
            <Col md={8}>
              <Skeleton variant="rect" height={200} />
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <Skeleton variant="text" width="40%" />
                        <Skeleton variant="text" width="50%" height={10} />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Skeleton variant="text" />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Skeleton variant="text" width="40%" />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <Skeleton variant="rect" height={48} />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
        <Container className="my-5" style={{ backgroundColor: '#fbf8f6' }} fluid>
          <Container>
            <Row className="py-5">
              <Col md={8}>
                <Skeleton variant="text" width="30%" />
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <Skeleton variant="text" width="30%" />
              </Col>
            </Row>
            <Row className="py-5">
              <Col md={8}>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </Col>
            </Row>
          </Container>
        </Container>
        <Container>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Skeleton variant="text" width="20%" />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <Skeleton variant="text" width="20%" />
                    </Col>
                    <Col>
                      <Skeleton variant="rect" width="50%" height={48} />
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Skeleton variant="text" width="20%" />
                </ListGroup.Item>
                {[1, 2, 3].map(() => (
                  <ListGroup.Item className="py-3" key={uuidv4()}>
                    <Row>
                      <Skeleton variant="text" width="20%" />
                    </Row>
                    <Row>
                      <Skeleton variant="text" width="50%" />
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
  if (!error) {
    return <FundraiserDetail fundraiser={fundraiser} />;
  }
  return (
    <Container className="my-5">
      <Message title="Error" variant="error">
        Something went wrong
      </Message>{' '}
      <Button variant="outline-primary" onClick={() => window.location.reload()}>
        Refresh page ?
      </Button>
    </Container>
  );
};

const FundraiserScreen = ({ match }) => {
  const { loading, error, fundraiser } = useFundraiserDetail(match.params.id);

  return (
    <>
      <Container>
        <Link className="btn btn-outline-primary my-3" to="/">
          Go Back
        </Link>
      </Container>
      <Children loading={loading} error={error} fundraiser={fundraiser} />
    </>
  );
};

Children.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  fundraiser: PropTypes.shape({
    _id: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    shortDescription: PropTypes.string,
    description: PropTypes.string,
    collected: PropTypes.number,
    goal: PropTypes.number,
    youTubeVideoLink: PropTypes.string,
    organizer: PropTypes.shape({
      name: PropTypes.string,
    }),
    donations: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

FundraiserScreen.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

export default FundraiserScreen;
