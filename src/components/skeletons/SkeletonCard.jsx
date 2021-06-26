import React from 'react';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { Card, Row } from 'react-bootstrap';

const SkeletonCard = () => (
  <Card>
    <Card.Img as="div">
      <Skeleton variant="rect" height={152} width="304" />
    </Card.Img>
    <Card.Body>
      <Card.Title>
        <Typography variant="h5">
          <Skeleton />
        </Typography>
      </Card.Title>
      <Card.Text>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <Row className="py-2">
        <Typography variant="overline">
          <Skeleton />
        </Typography>
      </Row>
      <Row className="py-2">
        <Typography variant="caption">
          <Skeleton />
        </Typography>
      </Row>
    </Card.Footer>
  </Card>
);

export default SkeletonCard;
