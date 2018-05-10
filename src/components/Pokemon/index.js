import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PokemonType from '../PokemonType';
import './styles.css'

class Pokemon extends Component {
  constructor() {
    super();
    this.addToCompare = this.addToCompare.bind(this);
  }
  addToCompare() {
    this.props.addToCompare(this.props.pokemon);
  }
  render() {
    const { pokemon, addTypeFilter } = this.props;
    return (
      <tr className="pokemon">
        <td>{pokemon.name}</td>
        <td>
          <img
            className="pokemon-avatar"
            onClick={this.addToCompare}
            src={pokemon.sprites.front_default} alt={pokemon.name}
          />
        </td>
        <td>
          <ul className="pokemon-attributes">
            {pokemon.types.map(({ type }, i) =>
              <PokemonType name={type.name} key={i} addTypeFilter={addTypeFilter}/>
            )}
          </ul>
        </td>
        <td>
          <ul className="pokemon-attributes">
            {pokemon.abilities.map(({ ability }, i) => <li key={i}>{ability.name}</li>)}
          </ul>
        </td>
        <td>{pokemon.height}</td>
        <td>{pokemon.weight}</td>
        <td>{pokemon.base_experience}</td>
      </tr>
    );
  }
};

Pokemon.propTypes = {
  pokemon: PropTypes.object.isRequired,
  addTypeFilter: PropTypes.func.isRequired,
  addToCompare: PropTypes.func.isRequired
}

export default Pokemon;
