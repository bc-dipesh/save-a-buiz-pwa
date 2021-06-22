import PropTypes from 'prop-types';
import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, keyword = '', url = '' }) =>
  pages > 1 && (
    <Pagination>
      {[...Array(pages).keys()].map((x) => (
        <LinkContainer
          key={x + 1}
          to={keyword ? `/search/${keyword}/fundraisers/${x + 1}` : `${url}/${x + 1}`}
        >
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  );

Paginate.propTypes = {
  keyword: PropTypes.string,
  pages: PropTypes.number,
  page: PropTypes.number,
  url: PropTypes.string,
};

export default Paginate;
