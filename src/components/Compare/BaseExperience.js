import React from 'react';
import PropTypes from 'prop-types';

const BaseExperience = ({ pokemon1, pokemon2 }) => {
  let relation;
  let ratio;
  if (pokemon1.base_experience > pokemon2.base_experience) {
    ratio = (pokemon1.base_experience / pokemon2.base_experience * 100 - 100).toFixed();
    relation = `${pokemon1.name} has ${ratio}% more base experience than ${pokemon2.name}`
  } else if (pokemon1.base_experience < pokemon2.base_experience) {
    ratio = (pokemon2.base_experience / pokemon1.base_experience * 100 - 100).toFixed();
    relation = `${pokemon1.name} has ${ratio}% less base experience than ${pokemon2.name}`
  } else {
    relation = 'Both pokemons have equial base experience';
  }
  return <tr>
    <td>{pokemon1.base_experience}</td>
    <td>
      <p><b>Base experience</b></p>
      {relation}
    </td>
    <td>{pokemon2.base_experience}</td>
  </tr>
};

BaseExperience.propTypes = {
  pokemon1: PropTypes.object.isRequired,
  pokemon2: PropTypes.object.isRequired
};

export default BaseExperience;
