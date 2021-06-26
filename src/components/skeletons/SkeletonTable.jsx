import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import { PropTypes } from 'prop-types';
import { Table } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const SkeletonTable = ({ columns }) => (
  <Table striped bordered hover responsive className="table-sm">
    <thead>
      <tr>
        {[...Array(columns).keys()].map(() => (
          <th key={uuidv4()}>
            <Skeleton variant="text" />
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
        <tr key={uuidv4()}>
          {[...Array(columns).keys()].map(() => (
            <td key={uuidv4()}>
              <Skeleton variant="text" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </Table>
);

SkeletonTable.propTypes = {
  columns: PropTypes.number.isRequired,
};

export default SkeletonTable;
