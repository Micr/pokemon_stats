import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class PokemonType extends Component {
  constructor() {
    super();
    this.addTypeFilter = this.addTypeFilter.bind(this);
  }

  addTypeFilter() {
    this.props.addTypeFilter(this.props.name);
  }

  render() {
    return (
      <li className="pokemon-type" onClick={this.addTypeFilter}>{this.props.name}</li>
    );
  }

}

PokemonType.propTypes = {
  addTypeFilter: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default PokemonType;
