import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import Pokemon from '../Pokemon';
import './styles.css';

class PokemonTable extends Component {

  renderTableHeader() {
    return <tr id="pokemon-table-headers">
      <th>Name</th>
      <th>Avatar</th>
      <th>Type</th>
      <th>Abilities</th>
      <th>Height</th>
      <th>Weight</th>
      <th>Base Experience</th>
    </tr>
  }

  render() {
    const {
      filteredPokemons,
      addTypeFilter,
      addToCompare
    } = this.props.store;
    return (
      <table id="pokemon-list">
        <thead>
          {this.renderTableHeader()}
        </thead>
        <tbody>
          {
            filteredPokemons.map(pokemon =>
            <Pokemon
              key={pokemon.id}
              pokemon={pokemon}
              addTypeFilter={addTypeFilter}
              addToCompare={addToCompare}
              className="pokemon-list-item"
            />)
          }
        </tbody>
      </table>
    );
  }

}

PokemonTable.propTypes = {
  store: PropTypes.shape({
    filteredPokemons: PropTypes.object.isRequired,
    addToCompare: PropTypes.func.isRequired,
    addTypeFilter: PropTypes.func.isRequired
  })
};

export default inject('store')(observer(PokemonTable));
