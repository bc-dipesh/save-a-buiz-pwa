import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Card, Row } from 'react-bootstrap';

const SkeletonCard = () => (
  <Card>
    <Card.Img as="div">
      <Skeleton variant="rect" height={118} />
    </Card.Img>
    <Card.Body>
      <Card.Title>
        <Skeleton variant="text" />
      </Card.Title>
      <Card.Text>
        <Skeleton variant="text" height={14} />
        <Skeleton variant="text" height={14} />
        <Skeleton variant="text" height={14} />
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <Row className="py-2">
        <Skeleton variant="text" />
      </Row>
      <Row className="py-2">
        <Skeleton variant="text" height={10} />
      </Row>
    </Card.Footer>
  </Card>
);

export default SkeletonCard;
