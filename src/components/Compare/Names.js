import React from 'react';
import PropTypes from 'prop-types';

const Names = ({ pokemon1, pokemon2 }) => (
  <tr>
    <td>{pokemon1.name}</td>
    <td>VS</td>
    <td>{pokemon2.name}</td>
  </tr>
);

Names.propTypes = {
  pokemon1: PropTypes.object.isRequired,
  pokemon2: PropTypes.object.isRequired
};

export default Names;
