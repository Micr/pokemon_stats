import React from 'react';
import PropTypes from 'prop-types';

const Avatars = ({ pokemon1, pokemon2 }) => (
  <tr>
    <td><img src={pokemon1.sprites.front_default} alt={pokemon1.name}/></td>
    <td></td>
    <td><img src={pokemon2.sprites.front_default} alt={pokemon1.name}/></td>
  </tr>
)

Avatars.propTypes = {
  pokemon1: PropTypes.object.isRequired,
  pokemon2: PropTypes.object.isRequired
};

export default Avatars;
