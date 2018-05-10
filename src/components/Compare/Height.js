import React from 'react';
import PropTypes from 'prop-types';

const Height = ({ pokemon1, pokemon2 }) => {
  let relation;
  let ratio;
  if (pokemon1.height > pokemon2.height) {
    ratio = (pokemon1.height / pokemon2.height * 100 - 100).toFixed();
    relation = `${pokemon1.name} is ${ratio}% taller than ${pokemon2.name}`
  } else if (pokemon1.height < pokemon2.height) {
    ratio = (pokemon2.height / pokemon1.height * 100 - 100).toFixed();
    relation = `${pokemon1.name} is ${ratio}% shorter than ${pokemon2.name}`
  } else {
    relation = 'Both pokemons have equial height';
  }
  return <tr>
    <td>{pokemon1.height}</td>
    <td>
      <p><b>Height</b></p>
      {relation}
    </td>
    <td>{pokemon2.height}</td>
  </tr>
};

Height.propTypes = {
  pokemon1: PropTypes.object.isRequired,
  pokemon2: PropTypes.object.isRequired
};

export default Height;
