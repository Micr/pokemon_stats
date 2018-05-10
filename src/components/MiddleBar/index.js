import React from 'react';
import PropTypes from 'prop-types';
import { perPageAmounts } from '../../config';
import './styles.css';

const MiddleBar = ({ pageLimit, handlePageLimitChange }) => {
  return (
    <div id="table-middle-bar">
      <p>
        Pokemon List:
      </p>
      <div id="pagination-amount-select">
        <label id="pagination-amount-label">Select amount per page</label>
        <select
          value={pageLimit}
          onChange={handlePageLimitChange}
        >
          {perPageAmounts.map(amount =>
            <option key={amount} value={amount}>{amount}</option>)}
        </select>
      </div>
    </div>
  );
}

MiddleBar.propTypes = {
  pageLimit: PropTypes.number.isRequired,
  handlePageLimitChange: PropTypes.func.isRequired
}

export default MiddleBar;
