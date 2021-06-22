import { Card, CardContent, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const InfoCard = ({ icon, title, value }) => (
  <Card className="my-2">
    <CardContent>
      <Typography variant="h2" component="p">
        {value}
      </Typography>
      <Typography className="mt-2" variant="h5" component="p">
        {icon} {title}
      </Typography>
    </CardContent>
  </Card>
);

InfoCard.propTypes = {
  icon: PropTypes.shape({}),
  title: PropTypes.string,
  value: PropTypes.number,
};

export default InfoCard;
