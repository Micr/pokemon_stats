import React from 'react';
import PropTypes from 'prop-types';

const Weight = ({ pokemon1, pokemon2 }) => {
  let relation;
  let ratio;
  if (pokemon1.weight > pokemon2.weight) {
    ratio = (pokemon1.weight / pokemon2.weight * 100 - 100).toFixed();
    relation = `${pokemon1.name} is ${ratio}% heavier than ${pokemon2.name}`
  } else if (pokemon1.weight < pokemon2.weight) {
    ratio = (pokemon2.weight / pokemon1.weight * 100 - 100).toFixed();
    relation = `${pokemon1.name} is ${ratio}% lighter than ${pokemon2.name}`
  } else {
    relation = 'Both pokemons have equial height';
  }
  return <tr>
    <td>{pokemon1.weight}</td>
    <td>
      <p><b>Weight</b></p>
      {relation}
    </td>
    <td>{pokemon2.weight}</td>
  </tr>
};

Weight.propTypes = {
  pokemon1: PropTypes.object.isRequired,
  pokemon2: PropTypes.object.isRequired
};

export default Weight;
