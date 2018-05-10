import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import CategoryTagClose from '../CategoryTagClose';
import './styles.css';

class PokemonTypes extends Component {
  render() {
    const { removeTypeFilter, typesFilter } = this.props.store;
    return (
      <div id="category-tags-container">
        <ul id="category-tag-filter-list">
          {typesFilter.map((type, idx) =>
            <li className="category-tag-filter" key={type}>
              <span>{type}</span>
              <CategoryTagClose
                type={type}
                removeTypeFilter={removeTypeFilter}
              />
            </li>
          )}
        </ul>
      </div>
    );
  }
}

PokemonTypes.propTypes = {
  store: PropTypes.shape({
    typesFilter: PropTypes.object.isRequired,
    removeTypeFilter: PropTypes.func.isRequired
  }).isRequired
};

export default inject('store')(observer(PokemonTypes));
