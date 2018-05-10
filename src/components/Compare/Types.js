import React from 'react';
import PropTypes from 'prop-types';

const Types = ({ pokemon1, pokemon2, types, single }) => {
    let common = 0;
    pokemon1[types].map(typeObj => typeObj[single].name).forEach(name => {
      if (pokemon2[types].map(typeObj => typeObj[single].name).find(name2 => name2 === name)) {
        common = common + 1;
      }
    });
    let relation;
    if (pokemon1[types].length > pokemon2[types].length) {
      relation = `${pokemon1.name} has ${pokemon1[types].length - pokemon2[types].length} more
      ${types} than ${pokemon2.name}`;
    } else if (pokemon1[types].length < pokemon2[types].length) {
      relation = `${pokemon1.name} has ${pokemon2[types].length - pokemon1[types].length} less
      ${types} than ${pokemon2.name}`;
    } else {
      relation = `Both pokemons have equal amount of ${types}`;
    }
    return <tr>
      <td>
        <ul>{pokemon1[types].map(typeObj => <li key={typeObj[single].name}>{typeObj[single].name}</li>)}</ul>
      </td>
      <td>
        <p><b>{types}</b></p>
        <p>{`${pokemon1.name} and ${pokemon2.name} have ${common} ${types} in common`}</p>
        <p>{relation}</p>
      </td>
      <td>
        <ul>{pokemon2[types].map(typeObj => <li key={typeObj[single].name}>{typeObj[single].name}</li>)}</ul>
      </td>
    </tr>
};

Types.propTypes = {
  pokemon1: PropTypes.object.isRequired,
  pokemon2: PropTypes.object.isRequired,
  types: PropTypes.string.isRequired,
  single: PropTypes.string.isRequired,
};

export default Types;
