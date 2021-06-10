import React from 'react';
import { Card, Row } from 'react-bootstrap';
import Skeleton from './SkeletonElement';
import Shimmer from './Shimmer';

const SkeletonCard = () => (
  <Card style={{ overflow: 'hidden' }}>
    <Card.Img as="div"><Skeleton type="thumbnail" /></Card.Img>
    <Card.Body>
      <Card.Title>
        <Skeleton type="title" />
      </Card.Title>
      <Card.Text as="div">
        <Skeleton type="text" />
        <Skeleton type="text" />
        <Skeleton type="text" />
        <Shimmer />
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <Row className="py-2">
        <Skeleton type="text" />
      </Row>
      <Row className="py-2">
        <Skeleton type="text" />
      </Row>
    </Card.Footer>
  </Card>
);

export default SkeletonCard;
